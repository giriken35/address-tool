@echo off
cd /d %~dp0
echo ===================================================
echo  Streamlit Keep-Alive Access Tool
echo ===================================================
echo Target URL: %TARGET_URL%
echo.

:: もし環境変数が設定されていない場合のデフォルトURL
if "%TARGET_URL%"=="" (
    set TARGET_URL=https://share.streamlit.io/
)

:: PythonとPlaywrightのチェック
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python がシステムにインストールされていないか、PATHが通っていません。
    echo Pythonをインストールし、PATHに追加してください。
    pause
    exit /b 1
)

:: スクリプトの実行
echo Running keep_alive.py...
python keep_alive.py

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] スクリプトの実行中にエラーが発生しました。
) else (
    echo.
    echo [SUCCESS] アクセスに成功しました。
)

:: タスクスケジューラから非表示で実行される際は一時停止しないように
:: コマンドライン引数に /silent がない場合のみ一時停止する
echo %* | findstr /i "silent" >nul
if %errorlevel% neq 0 (
    pause
)
