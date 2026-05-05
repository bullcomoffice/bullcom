export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">記事: {params.slug}</h1>
      <p className="mt-4 text-gray-600">準備中</p>
    </div>
  );
}
