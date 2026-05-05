@echo off
REM BULLCOMブログ公開ラッパー
REM 使い方: publish-blog.bat articles\記事名.md [--dry-run] [--update]

set NODE_PATH=C:\Users\Owner\AppData\Local\nvm\v24.15.0\node.exe
set SCRIPT_DIR=%~dp0

if "%1"=="" (
  echo 使い方: publish-blog.bat ^<mdファイル^> [--dry-run] [--update]
  echo.
  echo 例: publish-blog.bat articles\new-article.md --dry-run
  exit /b 1
)

"%NODE_PATH%" "%SCRIPT_DIR%publish-blog.js" "%SCRIPT_DIR%%1" %2 %3 %4
