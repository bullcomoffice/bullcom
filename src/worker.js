/**
 * bullcom.jp Cloudflare Worker
 *
 * - POST /api/contact-submit : お問い合わせフォームの受信 → Resend でメール送信
 * - それ以外                  : 静的アセット（env.ASSETS、Next.js の output:"export" 出力）
 *
 * 必要な Worker Secret: RESEND_API_KEY
 * 送信ドメイン: send.bullcom.jp（root の MX は既存メール運用のため触らない）
 *
 * 2026-07-27 Web3Forms から移行。フォームは AJAX 送信のため JSON を返す
 * （リダイレクトではなく画面内で完了表示 + GA4 generate_lead 発火を維持するため）
 */

/* ---------- 汎用ヘルパー ---------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

/* ---------- サイト固有設定 ---------- */
const CONTACT_TO = ['contact@bullcom.jp'];
// CC の Gmail は GAS(contact-line-notify) 経由で LINE / Slack へ即時通知される導線
const CONTACT_CC = ['bullcom.contact@gmail.com'];
const CONTACT_FROM = 'BULLCOM お問い合わせ <noreply@send.bullcom.jp>';
const CONTACT_SUBJECT = '【BULLCOM】お問い合わせが届きました';

// スパム対策の対象フィールド（フォームの name 属性と一致させる）
const PHONE_FIELD = '電話番号';
const MESSAGE_FIELD = 'お問い合わせ内容';
const EMAIL_FIELD = 'メールアドレス';

// URLらしき文字列の検出（http(s)://・www.・裸ドメイン+主要TLD）
const URL_PATTERN = /https?:\/\/|www\.\S|\b[a-z0-9][a-z0-9-]{1,61}\.(com|net|org|jp|io|co|info|biz|xyz|shop|site|online|club|top|vip|link|click|live|store|me|tv|cc|ru|cn)\b/i;

// お客様宛の自動確認メール
function customerConfirmationHtml(name) {
  const nameLine = name ? `${esc(name)} 様` : 'お客様';
  return (
    '<div style="font-family:sans-serif;font-size:15px;line-height:1.9;color:#1a2332">' +
    `<p>${nameLine}</p>` +
    '<p>この度はBULLCOM（ブルコム）へお問い合わせいただき、誠にありがとうございます。<br>' +
    '下記の内容でお問い合わせを受け付けいたしました。</p>' +
    '<p>内容を確認のうえ、営業時間内に担当者より順次ご返信いたします。<br>' +
    'お急ぎの場合は、お電話（078-912-2656／9:00〜19:00）でもご相談を承っております。</p>' +
    '<hr style="border:none;border-top:1px solid #dde6f1;margin:24px 0">' +
    '<p style="font-size:13px;line-height:1.8">' +
    '<strong>パソコン修理・設定 BULLCOM（ブルコム）</strong><br>' +
    '〒651-2113 兵庫県神戸市西区伊川谷町有瀬846-10 ギャラリエ1F<br>' +
    'TEL: 078-912-2656／持ち込み診断料 無料<br>' +
    'https://bullcom.jp</p>' +
    '<p style="margin-top:20px;font-size:12px;color:#768193">' +
    '※本メールは自動送信されています。お心当たりがない場合はお手数ですが破棄してください。</p>' +
    '</div>'
  );
}

/* ---------- 汎用ロジック ---------- */
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function handleContactSubmit(request, env) {
  const form = await request.formData();

  // ハニーポット: bot は隠しフィールドも埋めるため、値があれば成功を装って送信しない
  if ((form.get('_honey') || '').toString()) {
    return json({ success: true });
  }

  const rows = [];
  const arrays = {};
  const attachments = [];
  let hasValue = false;

  for (const [key, value] of form.entries()) {
    if (key.startsWith('_')) continue; // 制御フィールドはメール本文に出さない
    if (value && typeof value === 'object' && typeof value.arrayBuffer === 'function') {
      if (!value.size || value.size > 8 * 1024 * 1024) continue;
      attachments.push({ filename: value.name || 'file', content: arrayBufferToBase64(await value.arrayBuffer()) });
      continue;
    }
    const v = value.toString().trim();
    if (!v) continue; // 空欄の任意項目は行として出さない
    hasValue = true;
    if (key.endsWith('[]')) {
      const base = key.slice(0, -2);
      (arrays[base] = arrays[base] || []).push(v);
    } else {
      rows.push([key, v]);
    }
  }
  for (const [k, vals] of Object.entries(arrays)) rows.push([k, vals.join('、')]);

  if (!hasValue) return json({ success: false, message: '入力内容が空です。もう一度お試しください。' }, 400);

  // スパム対策1: 電話番号は入力があれば「0」始まりのみ許可（日本の番号は必ず0始まり）
  if (PHONE_FIELD) {
    const phoneDigits = (form.get(PHONE_FIELD) || '').toString().replace(/[^0-9]/g, '');
    if (phoneDigits && !phoneDigits.startsWith('0')) {
      return json({ success: false, message: '電話番号は「0」から始まる形式でご入力ください。' }, 400);
    }
  }

  // スパム対策2: 本文へのURL混入を拒否（SEOスパム・フィッシングの典型パターン）
  if (MESSAGE_FIELD) {
    const message = (form.get(MESSAGE_FIELD) || '').toString();
    if (URL_PATTERN.test(message)) {
      return json({ success: false, message: 'お問い合わせ内容にURLは含めないでください。' }, 400);
    }
  }

  const replyTo = EMAIL_FIELD ? (form.get(EMAIL_FIELD) || '').toString().trim() : '';
  const customerName = (form.get('お名前') || '').toString().trim();

  const tableHtml =
    '<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">' +
    rows.map(([k, v]) =>
      `<tr><td style="border:1px solid #ccc;background:#f5f8fc;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
      `<td style="border:1px solid #ccc;white-space:pre-wrap">${esc(v)}</td></tr>`
    ).join('') +
    '</table>';

  const payload = { from: CONTACT_FROM, to: CONTACT_TO, subject: CONTACT_SUBJECT, html: tableHtml };
  if (CONTACT_CC.length) payload.cc = CONTACT_CC;
  if (replyTo) payload.reply_to = replyTo;
  if (attachments.length) payload.attachments = attachments;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text());
    return json({ success: false, message: '送信に失敗しました。お手数ですがお電話またはLINEでご連絡ください。' }, 502);
  }

  // お客様宛の確認メール。失敗しても内部通知は成功済みなのでお客様の体験には影響させない
  if (replyTo) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: CONTACT_FROM,
          to: [replyTo],
          reply_to: CONTACT_TO[0],
          subject: '【BULLCOM】お問い合わせありがとうございます',
          html: customerConfirmationHtml(customerName),
        }),
      });
    } catch (_) { /* ignore */ }
  }

  return json({ success: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';
    const method = request.method;

    try {
      if (path === '/api/contact-submit' && method === 'POST') return await handleContactSubmit(request, env);
    } catch (e) {
      console.error('worker error:', e && e.message);
      return json({ success: false, message: '送信に失敗しました。' }, 500);
    }

    return env.ASSETS.fetch(request);
  },
};
