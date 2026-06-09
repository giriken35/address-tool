# 🗾 住所表記揺れ 一括正規化ツール

**CSVをアップロードするだけで、日本の住所データの表記揺れを瞬時に一括正規化する Streamlit Webアプリです。**

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.28+-red.svg)](https://streamlit.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ 機能

| 機能 | 説明 |
|---|---|
| 🏙️ **都道府県の統一** | 「東京」→「東京都」など省略形を全47都道府県に対応して正式表記へ補完 |
| 🔤 **全角→半角の統一** | 「Ａ棟１０１号」→「A棟101号」英数字・記号を半角に統一 |
| 🔢 **番地ハイフンの統一** | 「1丁目2番地3号」→「1-2-3」各種ダッシュ・区切り文字を統一 |
| 📊 **差分プレビュー** | 変更箇所のみ / 全件を切り替えて確認できる |
| 📥 **CSVダウンロード** | 正規化列追加版 / 住所列置換版の2形式でダウンロード |
| 🔒 **データ安全** | サーバーへのデータ保存なし・メモリ上のみで処理 |

## 🚀 使い方

### 1. インストール

```bash
git clone https://github.com/giriken35/address-tool.git
cd address-tool
pip install -r requirements.txt
```

### 2. 起動

```bash
streamlit run app.py
```

ブラウザで `http://localhost:8501` を開いてください。

### 3. 操作手順

1. **CSVをアップロード** — UTF-8 / Shift-JIS 自動判別対応
2. **住所カラムを選択** — ドロップダウンから正規化したい列を指定
3. **処理内容にチェック** — 3種類の正規化を個別にオン/オフ可能
4. **「一括正規化を実行する」ボタン** — 処理後に差分プレビューが表示
5. **CSVダウンロード** — 2種類の形式から選択してダウンロード

## 📋 対応CSV形式

- **文字コード**: UTF-8, UTF-8 BOM, Shift-JIS (CP932), EUC-JP
- **列数**: 制限なし（住所列を1つ指定）
- **行数**: 制限なし（プログレスバーで進捗表示）

## 🎨 デザイン

- ダークモード対応のモダンUI
- 左右に Google AdSense 広告スペース（160px）を確保
- Noto Sans JP + Inter フォント
- バイオレット×ティール のグラデーションアクセント

## 📦 依存パッケージ

```
streamlit>=1.28.0
pandas>=2.0.0
```
（`unicodedata`, `re`, `io` は Python 標準ライブラリ）

## 📄 ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
