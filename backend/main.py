import io
import re
import unicodedata
from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.responses import JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="Address Normalizer API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


class NormalizeRequest(BaseModel):
    data: List[Dict[str, Any]]
    address_cols: List[str]
    do_prefecture: bool = True
    do_width: bool = True
    do_hyphen: bool = True

@app.post("/api/normalize")
def normalize_endpoint(req: NormalizeRequest):
    try:
        if not req.data:
            return JSONResponse({"status": "error", "message": "No data provided."})
            
        df = pd.DataFrame(req.data)
        
        change_count = 0
        for col in req.address_cols:
            if col not in df.columns:
                continue
                
            original_series = df[col].copy()
            
            # Apply normalization
            normalized_series = original_series.apply(
                lambda x: normalize_address(str(x), req.do_prefecture, req.do_width, req.do_hyphen) if pd.notnull(x) else x
            )
            
            normalized_col_name = f"{col}_正規化済"
            df[normalized_col_name] = normalized_series
            
            # Count changes
            change_count += int((original_series.astype(str) != normalized_series.astype(str)).sum())
        
        # Replace NaN with empty string for JSON serialization
        df = df.fillna("")
        
        return {
            "status": "success",
            "data": df.to_dict(orient="records"),
            "change_count": change_count,
            "total_rows": len(df)
        }
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
