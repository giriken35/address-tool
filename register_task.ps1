# Windowsのタスクスケジューラに「毎日指定の時間に keep_alive_windows.bat を実行する」タスクを登録するスクリプト

# 管理者権限チェック
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Warning "タスクの登録には管理者権限が必要です。このPowerShellウィンドウを管理者として実行し直してください。"
    Exit
}

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$batPath = Join-Path $scriptPath "keep_alive_windows.bat"

# タスク名
$taskName = "Streamlit_KeepAlive_AddressTool"

# 実行するアクションの設定 (/silent を渡して、処理完了後に pause しないようにする)
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$batPath`" silent"

# トリガーの設定（デフォルト: 毎日午前8時に実行）
$trigger = New-ScheduledTaskTrigger -Daily -At 8:00AM

# タスク設定（バッテリー駆動時でも実行、電源接続時に遅延起動など）
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# タスクの登録（現在のサインインユーザーの権限で実行）
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Streamlitアプリのスリープ回避のため、毎日午前8時に自動アクセスを実行します。" -Force

Write-Host "タスク '$taskName' を正常に登録しました。" -ForegroundColor Green
Write-Host "実行ファイル: $batPath"
Write-Host "実行スケジュール: 毎日 08:00 AM (日本時間)"
Write-Host "※ 実行時間を変更したい場合は、タスクスケジューラを開いて該当タスクのトリガーを編集してください。"
