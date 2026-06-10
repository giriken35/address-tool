import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
import re
import io
import unicodedata

# ─────────────────────────────────────────────
#  ページ設定（最初に呼ぶ必要あり）
# ─────────────────────────────────────────────
st.set_page_config(
    page_title="住所表記揺れ一括正規化ツール | CSV・Excelの住所統一を無料変換",
    page_icon="🗺️",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown(
    """
    <meta name="description" content="CSVやExcelの住所データの表記揺れを一括で正規化・統一する無料ツールです。発送業務や顧客管理を効率化します。">
    <meta name="keywords" content="住所,表記揺れ,一括変換,正規化,CSV,無料,Excel,統一,発送業務,効率化">
    <meta name="google-site-verification" content="0oIGdE-k6VZaVRX2lmAUGfTyJY2vohq0Q2uljOGmLT4" />
    """,
    unsafe_allow_html=True
)

# ─────────────────────────────────────────────
#  カスタム CSS（ダークモード対応・モダンデザイン）
# ─────────────────────────────────────────────
st.markdown("""
<style>
/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap');

/* ── CSS 変数 ── */
:root {
    --bg-primary:   #0f1117;
    --bg-secondary: #1a1d27;
    --bg-card:      #1e2130;
    --bg-ad:        #161824;
    --accent:       #6c63ff;
    --accent-glow:  rgba(108,99,255,0.35);
    --accent2:      #00d4aa;
    --text-primary: #e8eaf0;
    --text-secondary:#9399b2;
    --border:       rgba(108,99,255,0.25);
    --success:      #00d4aa;
    --warning:      #f5a623;
    --danger:       #ff6b6b;
    --shadow:       0 8px 32px rgba(0,0,0,0.45);
}

/* ── ベース ── */
html, body, [class*="css"] {
    font-family: 'Noto Sans JP', 'Inter', sans-serif !important;
    background-color: var(--bg-primary) !important;
    color: var(--text-primary) !important;
}

/* ── メインコンテナ ── */
.main .block-container {
    padding: 0 1rem !important;
    max-width: 100% !important;
}

/* ── 3カラムレイアウト ── */
.layout-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    width: 100%;
    padding: 1rem 0;
}

/* ── 広告スペース（左右） ── */
.ad-column {
    flex: 0 0 160px;
    min-width: 140px;
    max-width: 160px;
    position: sticky;
    top: 1rem;
}

.ad-block {
    background: var(--bg-ad);
    border: 1px dashed var(--border);
    border-radius: 12px;
    padding: 1rem 0.5rem;
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.72rem;
    margin-bottom: 1rem;
    transition: border-color 0.3s;
}
.ad-block:hover { border-color: var(--accent); }
.ad-block .ad-label {
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 0.4rem;
}
.ad-block .ad-size {
    font-size: 0.68rem;
    font-weight: 500;
    color: var(--accent);
}
.ad-placeholder-icon { font-size: 1.8rem; margin-bottom: 0.4rem; }

/* ── 中央コンテンツ ── */
.center-column {
    flex: 1;
    min-width: 0;
}

/* ── ヒーローヘッダー ── */
.hero-header {
    background: linear-gradient(135deg, #1a1d27 0%, #1e2130 50%, #1a2040 100%);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2rem 2.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow);
}
.hero-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
    pointer-events: none;
}
.hero-title {
    font-size: 1.9rem;
    font-weight: 700;
    background: linear-gradient(90deg, #fff 0%, var(--accent) 60%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 0.4rem 0;
    line-height: 1.2;
}
.hero-subtitle {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
}
.hero-badges {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}
.badge {
    background: rgba(108,99,255,0.15);
    border: 1px solid var(--border);
    color: var(--accent);
    border-radius: 20px;
    padding: 0.2rem 0.75rem;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.03em;
}
.badge.green { background: rgba(0,212,170,0.12); border-color: rgba(0,212,170,0.3); color: var(--accent2); }

/* ── カード ── */
.card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.2rem;
    box-shadow: var(--shadow);
    transition: border-color 0.3s, box-shadow 0.3s;
}
.card:hover { border-color: rgba(108,99,255,0.5); box-shadow: 0 8px 40px rgba(108,99,255,0.15); }
.card-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.card-desc {
    font-size: 0.78rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

/* ── ステップ番号 ── */
.step-num {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    width: 24px; height: 24px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
}

/* ── セクション区切り ── */
.section-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 1.5rem 0;
}

/* ── 処理オプション グリッド ── */
.options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    margin: 0.8rem 0;
}
.option-item {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.9rem 1rem;
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    transition: border-color 0.25s, background 0.25s;
}
.option-item:hover { border-color: var(--accent); background: rgba(108,99,255,0.07); }
.option-icon { font-size: 1.2rem; flex-shrink: 0; }
.option-text .opt-title { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.option-text .opt-desc  { font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.15rem; }

/* ── 統計バー ── */
.stats-row {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}
.stat-card {
    flex: 1;
    min-width: 100px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    text-align: center;
}
.stat-num { font-size: 1.6rem; font-weight: 700; color: var(--accent); }
.stat-label { font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem; }

/* ── フッター ── */
.footer {
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.72rem;
    padding: 1.5rem 0;
    border-top: 1px solid var(--border);
    margin-top: 2rem;
}

/* ── Streamlit 要素のオーバーライド ── */
.stFileUploader > div {
    background: var(--bg-secondary) !important;
    border: 2px dashed var(--border) !important;
    border-radius: 12px !important;
    transition: border-color 0.3s !important;
}
.stFileUploader > div:hover { border-color: var(--accent) !important; }

div[data-testid="stSelectbox"] > div > div {
    background: var(--bg-secondary) !important;
    border: 1px solid var(--border) !important;
    border-radius: 8px !important;
    color: var(--text-primary) !important;
}

.stButton > button {
    background: linear-gradient(135deg, var(--accent) 0%, #8b85ff 100%) !important;
    color: #fff !important;
    border: none !important;
    border-radius: 10px !important;
    font-weight: 600 !important;
    font-size: 0.95rem !important;
    padding: 0.6rem 1.5rem !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
    box-shadow: 0 4px 20px var(--accent-glow) !important;
    width: 100% !important;
}
.stButton > button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 30px var(--accent-glow) !important;
}
.stButton > button:active { transform: translateY(0) !important; }

/* ダウンロードボタン */
.stDownloadButton > button {
    background: linear-gradient(135deg, var(--accent2) 0%, #00b890 100%) !important;
    color: #0f1117 !important;
    border: none !important;
    border-radius: 10px !important;
    font-weight: 700 !important;
    padding: 0.6rem 1.5rem !important;
    box-shadow: 0 4px 20px rgba(0,212,170,0.3) !important;
    width: 100% !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
}
.stDownloadButton > button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 30px rgba(0,212,170,0.4) !important;
}

/* データフレーム */
.stDataFrame { border-radius: 10px !important; overflow: hidden !important; }
iframe[title="st_aggrid"] { border-radius: 10px !important; }

/* チェックボックス */
.stCheckbox > label { color: var(--text-primary) !important; font-size: 0.88rem !important; }

/* セレクトボックスラベル */
.stSelectbox label { color: var(--text-secondary) !important; font-size: 0.82rem !important; }

/* success / info メッセージ */
.stSuccess, .stInfo, .stWarning, .stError {
    border-radius: 10px !important;
}

/* プログレスバー */
.stProgress > div > div { background: linear-gradient(90deg, var(--accent), var(--accent2)) !important; }

/* スクロールバー */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

/* Streamlit ヘッダーを非表示 */
#MainMenu { visibility: hidden; }
header { visibility: hidden; }
footer { visibility: hidden; }
</style>
""", unsafe_allow_html=True)

# ─────────────────────────────────────────────
#  住所正規化ロジック
# ─────────────────────────────────────────────

PREFECTURE_MAP = {
    # 都道府県の省略形 → 正式表記
    "東京": "東京都", "大阪": "大阪府", "京都": "京都府",
    "北海": "北海道",
    "神奈川": "神奈川県", "愛知": "愛知県", "埼玉": "埼玉県",
    "千葉": "千葉県", "兵庫": "兵庫県", "福岡": "福岡県",
    "静岡": "静岡県", "茨城": "茨城県", "広島": "広島県",
    "京都": "京都府",
    # 読み間違えやすい旧表記
    "東京都都": "東京都", "大阪府府": "大阪府", "京都府府": "京都府",
}

PREFECTURE_SUFFIXES = [
    ("東京都", ["東京都", "東京"]),
    ("大阪府", ["大阪府", "大阪"]),
    ("京都府", ["京都府", "京都"]),
    ("北海道", ["北海道", "北海"]),
    ("神奈川県", ["神奈川県", "神奈川"]),
    ("愛知県", ["愛知県", "愛知"]),
    ("埼玉県", ["埼玉県", "埼玉"]),
    ("千葉県", ["千葉県", "千葉"]),
    ("兵庫県", ["兵庫県", "兵庫"]),
    ("福岡県", ["福岡県", "福岡"]),
    ("静岡県", ["静岡県", "静岡"]),
    ("茨城県", ["茨城県", "茨城"]),
    ("広島県", ["広島県", "広島"]),
    ("宮城県", ["宮城県", "宮城"]),
    ("長野県", ["長野県", "長野"]),
    ("新潟県", ["新潟県", "新潟"]),
    ("岐阜県", ["岐阜県", "岐阜"]),
    ("栃木県", ["栃木県", "栃木"]),
    ("群馬県", ["群馬県", "群馬"]),
    ("岡山県", ["岡山県", "岡山"]),
    ("福島県", ["福島県", "福島"]),
    ("三重県", ["三重県", "三重"]),
    ("熊本県", ["熊本県", "熊本"]),
    ("鹿児島県", ["鹿児島県", "鹿児島"]),
    ("沖縄県", ["沖縄県", "沖縄"]),
    ("滋賀県", ["滋賀県", "滋賀"]),
    ("山口県", ["山口県", "山口"]),
    ("愛媛県", ["愛媛県", "愛媛"]),
    ("長崎県", ["長崎県", "長崎"]),
    ("奈良県", ["奈良県", "奈良"]),
    ("青森県", ["青森県", "青森"]),
    ("岩手県", ["岩手県", "岩手"]),
    ("大分県", ["大分県", "大分"]),
    ("石川県", ["石川県", "石川"]),
    ("山形県", ["山形県", "山形"]),
    ("宮崎県", ["宮崎県", "宮崎"]),
    ("富山県", ["富山県", "富山"]),
    ("秋田県", ["秋田県", "秋田"]),
    ("和歌山県", ["和歌山県", "和歌山"]),
    ("山梨県", ["山梨県", "山梨"]),
    ("香川県", ["香川県", "香川"]),
    ("佐賀県", ["佐賀県", "佐賀"]),
    ("福井県", ["福井県", "福井"]),
    ("徳島県", ["徳島県", "徳島"]),
    ("高知県", ["高知県", "高知"]),
    ("島根県", ["島根県", "島根"]),
    ("鳥取県", ["鳥取県", "鳥取"]),
]

def normalize_prefecture(address: str) -> str:
    """都道府県名を正規化する"""
    if not isinstance(address, str):
        return address
    address = address.strip()
    # 二重サフィックスを除去
    for correct, _ in PREFECTURE_SUFFIXES:
        suffix = correct[-1]  # 都/府/道/県
        doubled = correct + suffix
        if doubled in address:
            address = address.replace(doubled, correct)
    # 省略形を補完（先頭一致）
    for correct, variants in PREFECTURE_SUFFIXES:
        for variant in variants:
            if address.startswith(variant) and not address.startswith(correct):
                address = correct + address[len(variant):]
                break
    return address


def zen_to_han(text: str) -> str:
    """全角英数字・記号を半角に変換"""
    if not isinstance(text, str):
        return text
    return unicodedata.normalize('NFKC', text)


def normalize_width(address: str) -> str:
    """全角→半角の統一（英数字・スペース）、全角カナは維持"""
    if not isinstance(address, str):
        return address
    result = []
    for ch in address:
        code = ord(ch)
        # 全角英字 Ａ-Ｚ, ａ-ｚ → 半角
        if 0xFF01 <= code <= 0xFF5E:
            result.append(chr(code - 0xFEE0))
        # 全角スペース → 半角スペース
        elif ch == '\u3000':
            result.append(' ')
        else:
            result.append(ch)
    # 数字は unicodedata で処理済み（Ｎ→N等）
    normalized = ''.join(result)
    # 連続スペースを1つに
    normalized = re.sub(r'[ 　]+', ' ', normalized).strip()
    return normalized


def normalize_hyphen(address: str) -> str:
    """番地・号のハイフン表記を統一する"""
    if not isinstance(address, str):
        return address
    # 各種ダッシュ類を半角ハイフンに統一
    address = re.sub(r'[‐‑‒–—―ー－−〜～]', '-', address)
    # 全角ハイフン
    address = address.replace('－', '-').replace('ｰ', '-')
    # 番地表記: 「1丁目2番地3号」→「1-2-3」
    address = re.sub(r'(\d+)\s*丁目\s*(\d+)\s*番地?\s*(\d+)\s*号?', r'\1-\2-\3', address)
    address = re.sub(r'(\d+)\s*丁目\s*(\d+)\s*番地?', r'\1-\2', address)
    address = re.sub(r'(\d+)\s*番地?\s*(\d+)\s*号?', r'\1-\2', address)
    address = re.sub(r'(\d+)\s*番地', r'\1', address)
    # ハイフン前後のスペースを除去
    address = re.sub(r'\s*-\s*', '-', address)
    # 連続ハイフンを1つに
    address = re.sub(r'-{2,}', '-', address)
    return address


def normalize_address(address: str,
                       do_prefecture: bool,
                       do_width: bool,
                       do_hyphen: bool) -> str:
    """全正規化を適用する"""
    if not isinstance(address, str) or address.strip() == '':
        return address
    if do_width:
        address = normalize_width(address)
    if do_prefecture:
        address = normalize_prefecture(address)
    if do_hyphen:
        address = normalize_hyphen(address)
    return address


def count_changes(original: pd.Series, normalized: pd.Series) -> int:
    return (original != normalized).sum()


# ─────────────────────────────────────────────
#  セッション状態
# ─────────────────────────────────────────────
if "df_original" not in st.session_state:
    st.session_state.df_original = None
if "df_result" not in st.session_state:
    st.session_state.df_result = None
if "normalized_col" not in st.session_state:
    st.session_state.normalized_col = None
if "change_count" not in st.session_state:
    st.session_state.change_count = 0


# ─────────────────────────────────────────────
#  レイアウト構築
# ─────────────────────────────────────────────

# ヒーローヘッダー（フル幅）
st.markdown("""
<div class="hero-header">
  <div class="hero-title">🗾 住所表記揺れ 一括正規化ツール</div>
  <div class="hero-subtitle">CSVをアップロードするだけ — 都道府県・全角半角・番地ハイフンを瞬時に統一します</div>
  <div class="hero-badges">
    <span class="badge">🔒 データはメモリのみ・サーバー保存なし</span>
    <span class="badge green">⚡ ワンクリック処理</span>
    <span class="badge">📊 差分プレビュー付き</span>
    <span class="badge green">🌙 ダークモード対応</span>
  </div>
</div>
""", unsafe_allow_html=True)

# 3カラムレイアウト
col_left, col_center, col_right = st.columns([1, 5, 1])

# ── 左広告 ──
with col_left:
    st.markdown('<div class="ad-column" style="padding-top:0.5rem">', unsafe_allow_html=True)
    components.html("""
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <style>
      body { margin:0; padding:0; background:transparent; display:flex; justify-content:center; }
    </style>
    </head>
    <body>
    <!-- admax -->
    <script src="https://adm.shinobi.jp/s/cac2809c006d7b949922df562a16638e"></script>
    <!-- admax -->
    </body>
    </html>
    """, height=620, scrolling=False)
    st.markdown('</div>', unsafe_allow_html=True)

# ── 右広告 ──
with col_right:
    st.markdown('<div class="ad-column" style="padding-top:0.5rem">', unsafe_allow_html=True)
    components.html("""
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <style>
      body { margin:0; padding:0; background:transparent; display:flex; justify-content:center; }
    </style>
    </head>
    <body>
    <!-- admax -->
    <script src="https://adm.shinobi.jp/s/cac2809c006d7b949922df562a16638e"></script>
    <!-- admax -->
    </body>
    </html>
    """, height=620, scrolling=False)
    st.markdown('</div>', unsafe_allow_html=True)

# ── 中央コンテンツ ──
with col_center:

    # ────────────────
    # STEP 1: ファイルアップロード
    # ────────────────
    st.markdown("""
    <div class="card">
      <div class="card-title"><span class="step-num">1</span> CSVファイルをアップロード</div>
      <div class="card-desc">UTF-8 / Shift-JIS の CSV に対応しています</div>
    </div>
    """, unsafe_allow_html=True)

    uploaded_file = st.file_uploader(
        "CSVファイルを選択またはドラッグ＆ドロップ",
        type=["csv"],
        label_visibility="collapsed",
    )

    if uploaded_file is not None:
        # エンコーディング自動検出
        raw = uploaded_file.read()
        for enc in ("utf-8", "utf-8-sig", "shift_jis", "cp932", "euc_jp"):
            try:
                df = pd.read_csv(io.BytesIO(raw), encoding=enc, dtype=str)
                used_enc = enc
                break
            except Exception:
                continue
        else:
            st.error("❌ エンコーディングを判別できませんでした。UTF-8 または Shift-JIS の CSV をご利用ください。")
            st.stop()

        st.session_state.df_original = df.copy()
        st.session_state.df_result = None
        st.session_state.normalized_col = None

        st.markdown(f"""
        <div style="background:rgba(0,212,170,0.08);border:1px solid rgba(0,212,170,0.3);border-radius:10px;
                    padding:0.75rem 1rem;margin:0.8rem 0;display:flex;gap:1rem;flex-wrap:wrap;align-items:center">
          <span style="color:#00d4aa;font-weight:600">✅ 読み込み完了</span>
          <span style="color:#9399b2;font-size:0.8rem">行数: <b style="color:#e8eaf0">{len(df):,}</b></span>
          <span style="color:#9399b2;font-size:0.8rem">列数: <b style="color:#e8eaf0">{len(df.columns)}</b></span>
          <span style="color:#9399b2;font-size:0.8rem">文字コード: <b style="color:#e8eaf0">{used_enc.upper()}</b></span>
          <span style="color:#9399b2;font-size:0.8rem">ファイル: <b style="color:#e8eaf0">{uploaded_file.name}</b></span>
        </div>
        """, unsafe_allow_html=True)

    # ────────────────
    # STEP 2: 設定
    # ────────────────
    if st.session_state.df_original is not None:
        df = st.session_state.df_original
        st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)
        st.markdown("""
        <div class="card-title" style="margin-bottom:0.5rem"><span class="step-num">2</span> 住所カラムと処理内容を選択</div>
        """, unsafe_allow_html=True)

        # カラム選択
        address_col = st.selectbox(
            "住所が入っているカラムを選択してください",
            options=df.columns.tolist(),
            help="正規化対象の列を選んでください"
        )

        # 処理オプション
        st.markdown("""
        <div class="options-grid">
          <div class="option-item">
            <div class="option-icon">🏙️</div>
            <div class="option-text">
              <div class="opt-title">都道府県の統一</div>
              <div class="opt-desc">「東京」→「東京都」など<br>省略形を正式表記に補完</div>
            </div>
          </div>
          <div class="option-item">
            <div class="option-icon">🔤</div>
            <div class="option-text">
              <div class="opt-title">全角→半角の統一</div>
              <div class="opt-desc">「Ａ棟１０１号」→「A棟101号」<br>英数字・記号を半角に変換</div>
            </div>
          </div>
          <div class="option-item">
            <div class="option-icon">🔢</div>
            <div class="option-text">
              <div class="opt-title">番地ハイフンの統一</div>
              <div class="opt-desc">「1丁目2番地3号」→「1-2-3」<br>各種ダッシュ・区切りを統一</div>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

        c1, c2, c3 = st.columns(3)
        with c1:
            do_pref = st.checkbox("都道府県の統一", value=True)
        with c2:
            do_width = st.checkbox("全角→半角の統一", value=True)
        with c3:
            do_hyphen = st.checkbox("番地ハイフンの統一", value=True)

        # ────────────────
        # STEP 3: 実行
        # ────────────────
        st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)
        st.markdown("""
        <div class="card-title" style="margin-bottom:0.8rem"><span class="step-num">3</span> 一括正規化を実行</div>
        """, unsafe_allow_html=True)

        if st.button("🚀 一括正規化を実行する", use_container_width=True):
            with st.spinner("正規化処理中..."):
                progress = st.progress(0)
                df_result = df.copy()
                original_series = df_result[address_col].copy()

                # バッチ処理（プログレスバー付き）
                total = len(df_result)
                result_values = []
                batch = max(1, total // 100)
                for i, val in enumerate(original_series):
                    result_values.append(
                        normalize_address(val, do_pref, do_width, do_hyphen)
                    )
                    if i % batch == 0:
                        progress.progress(min(i / total, 1.0))

                progress.progress(1.0)
                normalized_col_name = f"{address_col}_正規化済"
                df_result[normalized_col_name] = result_values
                change_count = count_changes(original_series, df_result[normalized_col_name])

                st.session_state.df_result = df_result
                st.session_state.normalized_col = normalized_col_name
                st.session_state.change_count = change_count

            st.success(f"✅ 正規化完了！ **{change_count:,}件** のデータが変更されました。")

        # ────────────────
        # STEP 4: 結果プレビュー & ダウンロード
        # ────────────────
        if st.session_state.df_result is not None:
            df_result = st.session_state.df_result
            normalized_col = st.session_state.normalized_col
            change_count = st.session_state.change_count
            original_col = address_col

            st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)
            st.markdown("""
            <div class="card-title" style="margin-bottom:0.8rem"><span class="step-num">4</span> 結果プレビュー</div>
            """, unsafe_allow_html=True)

            # 統計
            total_rows = len(df_result)
            unchanged = total_rows - change_count
            change_rate = (change_count / total_rows * 100) if total_rows > 0 else 0

            st.markdown(f"""
            <div class="stats-row">
              <div class="stat-card">
                <div class="stat-num">{total_rows:,}</div>
                <div class="stat-label">総レコード数</div>
              </div>
              <div class="stat-card">
                <div class="stat-num" style="color:var(--accent2)">{change_count:,}</div>
                <div class="stat-label">変更件数</div>
              </div>
              <div class="stat-card">
                <div class="stat-num" style="color:var(--text-secondary)">{unchanged:,}</div>
                <div class="stat-label">変更なし</div>
              </div>
              <div class="stat-card">
                <div class="stat-num" style="color:var(--warning)">{change_rate:.1f}%</div>
                <div class="stat-label">変更率</div>
              </div>
            </div>
            """, unsafe_allow_html=True)

            # 差分のみ / 全件 切り替え
            view_mode = st.radio(
                "表示モード",
                ["変更があった行のみ", "全データ"],
                horizontal=True,
            )

            if view_mode == "変更があった行のみ":
                mask = df_result[original_col] != df_result[normalized_col]
                display_df = df_result[mask][[original_col, normalized_col]].reset_index(drop=True)
                st.caption(f"変更行: {len(display_df):,} 件を表示")
            else:
                display_df = df_result[[original_col, normalized_col]].reset_index(drop=True)
                st.caption(f"全 {len(display_df):,} 件を表示（上位1000件）")
                display_df = display_df.head(1000)

            # カラム名に色付け（HTMLテーブル）
            if len(display_df) > 0:
                st.dataframe(
                    display_df,
                    use_container_width=True,
                    height=min(400, (len(display_df) + 1) * 35 + 40),
                    column_config={
                        original_col: st.column_config.TextColumn("📍 元の住所", width="medium"),
                        normalized_col: st.column_config.TextColumn("✅ 正規化後", width="medium"),
                    }
                )
            else:
                st.info("ℹ️ 変更対象となった住所がありませんでした。")

            # ダウンロード
            st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)
            st.markdown("""
            <div class="card-title" style="margin-bottom:0.8rem"><span class="step-num">5</span> CSVダウンロード</div>
            """, unsafe_allow_html=True)

            dl_col1, dl_col2 = st.columns(2)

            with dl_col1:
                # 全列 + 正規化列
                csv_full = df_result.to_csv(index=False, encoding="utf-8-sig")
                st.download_button(
                    label="📥 全列 + 正規化列をダウンロード",
                    data=csv_full.encode("utf-8-sig"),
                    file_name="addresses_normalized_full.csv",
                    mime="text/csv",
                    width="stretch",
                )
                st.caption("元のすべての列＋正規化列を追加したCSV")

            with dl_col2:
                # 正規化列で元の列を置き換え
                df_replaced = df_result.copy()
                df_replaced[original_col] = df_replaced[normalized_col]
                df_replaced = df_replaced.drop(columns=[normalized_col])
                csv_replaced = df_replaced.to_csv(index=False, encoding="utf-8-sig")
                st.download_button(
                    label="📥 住所列を置き換えてダウンロード",
                    data=csv_replaced.encode("utf-8-sig"),
                    file_name="addresses_normalized_replaced.csv",
                    mime="text/csv",
                    width="stretch",
                )
                st.caption("住所列を正規化済みで上書きしたCSV")

    elif uploaded_file is None:
        # 使い方ガイド
        st.markdown("""
        <div class="card" style="margin-top:1rem">
          <div class="card-title">📖 使い方</div>
          <div class="card-desc">3ステップで住所の表記揺れを一括解消</div>
          <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:0.5rem">
            <div style="display:flex;gap:0.75rem;align-items:flex-start">
              <span class="step-num">1</span>
              <div><b>CSVをアップロード</b><br><span style="color:#9399b2;font-size:0.82rem">住所データが入ったCSVファイル（UTF-8/Shift-JIS）をドラッグ＆ドロップ</span></div>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:flex-start">
              <span class="step-num">2</span>
              <div><b>カラムと処理を選択</b><br><span style="color:#9399b2;font-size:0.82rem">住所が入った列と、適用する正規化処理にチェック</span></div>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:flex-start">
              <span class="step-num">3</span>
              <div><b>実行してダウンロード</b><br><span style="color:#9399b2;font-size:0.82rem">ボタン一つで処理し、差分プレビューの後にCSVをダウンロード</span></div>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

        # サンプルCSV
        sample_data = """住所
東京1-2-3
大阪府大阪市北区１－２－３
神奈川横浜市港北区新横浜２丁目５番地３号
東京都渋谷区代々木１番地２号
北海道札幌市中央区大通西１０丁目
愛知名古屋市中区栄３丁目１５番地１号
Ａ社東京都港区六本木１－１－１
京都府京都市左京区吉田本町"""

        st.download_button(
            label="📄 サンプルCSVをダウンロードして試す",
            data=sample_data.encode("utf-8-sig"),
            file_name="sample_addresses.csv",
            mime="text/csv",
            width="content",
        )

    # ── 下部広告（A8.net） ──
    st.markdown('<div style="display:flex; justify-content:center; margin-top:2rem;">', unsafe_allow_html=True)
    components.html(
        """
        <a href="https://px.a8.net/svt/ejp?a8mat=4B5SK9+7OUL2Q+2DS2+BZGEP" rel="nofollow" target="_blank">
        <img border="0" width="300" height="250" alt="" src="https://www21.a8.net/svt/bgt?aid=260610777465&wid=001&eno=01&mid=s00000011117002013000&mc=1"></a>
        <img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4B5SK9+7OUL2Q+2DS2+BZGEP" alt="">
        """,
        width=300,
        height=250,
        scrolling=False
    )
    st.markdown('</div>', unsafe_allow_html=True)

    # フッター
    st.markdown("""
    <div class="footer">
      🗾 住所表記揺れ 一括正規化ツール &nbsp;|&nbsp;
      データはブラウザのメモリ上のみで処理され、一切サーバーに送信・保存されません &nbsp;|&nbsp;
      Powered by Streamlit &amp; Python
    </div>
    """, unsafe_allow_html=True)
