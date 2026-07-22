import os
import sys
from playwright.sync_api import sync_playwright

# Windowsでのエンコーディングエラー回避のため、標準出力をUTF-8に再設定
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass

def main():
    # 環境変数からURLを取得。設定されていない場合はデフォルト値
    url = os.environ.get("TARGET_URL")
    if not url:
        print("Error: TARGET_URL environment variable is not set.")
        print("Please set TARGET_URL or pass it in the script.")
        # デフォルト値（デモ用、実際にはご自身のStreamlitアプリのURLを設定してください）
        url = "https://share.streamlit.io/"
    
    print(f"Starting browser to access: {url}")
    
    with sync_playwright() as p:
        # ヘッドレスブラウザを起動
        browser = p.chromium.launch(headless=True)
        # 日本語環境に近いロケールとタイムゾーンを設定
        context = browser.new_context(
            locale="ja-JP",
            timezone_id="Asia/Tokyo"
        )
        page = context.new_page()
        
        try:
            print("Navigating to target URL...")
            # 読み込みタイムアウトを60秒に設定（スリープからの復帰に対応するため長めにする）
            page.goto(url, wait_until="load", timeout=60000)
            print(f"Loaded page title: {page.title()}")
            
            # Streamlit Community Cloud の「Wake up this app」ボタン対策
            # ボタンの文言: "Wake up this app" または "Yes, get this app back up and running!"
            wake_up_selectors = [
                "button:has-text('Wake up')",
                "button:has-text('Yes, get this app')",
                "button:has-text('Wake up this app')",
                "//button[contains(text(), 'Wake up')]",
                "//button[contains(text(), 'Yes, get')]"
            ]
            
            button_clicked = False
            for selector in wake_up_selectors:
                try:
                    button = page.locator(selector)
                    if button.is_visible(timeout=5000):
                        print(f"Found Wake up button with selector '{selector}'. Clicking it...")
                        button.click()
                        button_clicked = True
                        break
                except Exception:
                    continue
            
            if button_clicked:
                print("Clicked Wake up button. Waiting 30 seconds for app to wake up...")
                page.wait_for_timeout(30000)
            
            # アプリが正常にロードされたか確認（Streamlitのメイン要素である .stApp など）
            try:
                page.wait_for_selector(".stApp", timeout=30000)
                print("Success: Streamlit app loaded successfully!")
            except Exception as e:
                print("Warning: Could not confirm Streamlit container (.stApp). App might still be loading or has a different structure.")
                # デバッグ用にスクリーンショットを保存
                screenshot_path = "screenshot.png"
                page.screenshot(path=screenshot_path)
                print(f"Screenshot saved to {screenshot_path} for debugging.")
                
        except Exception as e:
            print(f"An error occurred during execution: {e}")
            # エラー時もスクリーンショットを撮る
            try:
                page.screenshot(path="error_screenshot.png")
                print("Error screenshot saved to error_screenshot.png")
            except Exception:
                pass
            sys.exit(1)
        finally:
            browser.close()
            print("Browser closed.")

if __name__ == "__main__":
    main()
