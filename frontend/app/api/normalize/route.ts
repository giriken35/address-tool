import { NextResponse } from 'next/server';
import { normalize } from '@geolonia/normalize-japanese-addresses';
import { normalizeWidth, normalizeHyphen } from '@/lib/address-normalizer';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, address_cols = [], zip_cols = [], do_prefecture, do_width, do_hyphen } = body;

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        { status: 'error', message: 'No data provided.' },
        { status: 400 }
      );
    }

    // APIキーの確認 (API経由の場合)
    const authHeader = req.headers.get('authorization');
    let isPro = false;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const apiKey = authHeader.substring(7);
      // Upstash RedisからAPIキーの有効性を確認
      const isValid = await redis.get(`apikey:${apiKey}`);
      if (isValid) {
        isPro = true;
      } else {
        return NextResponse.json(
          { status: 'error', message: '無効なAPIキーです。' },
          { status: 401 }
        );
      }
    }

    // ブラウザからのアクセス判定 (Supabase Session)
    let user = null;
    let currentUsage = 0;
    if (!isPro) {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      user = supabaseUser;

      if (user) {
        // 今月の利用履歴を取得
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { data: usageData, error } = await supabase
          .from('usage_logs')
          .select('rows_processed')
          .gte('created_at', startOfMonth.toISOString());
        
        if (!error && usageData) {
          currentUsage = usageData.reduce((acc, log) => acc + log.rows_processed, 0);
        }
      }
    }

    // リミットの計算
    let targetData = data;
    let allowedRows = data.length;

    if (!isPro) {
      if (!user) {
        // 未ログインの場合は1回につき30件まで
        allowedRows = Math.min(data.length, 30);
      } else {
        // ログイン済みの場合は今月の残り枠 (最大100件)
        const remaining = Math.max(0, 100 - currentUsage);
        allowedRows = Math.min(data.length, remaining);
        
        if (allowedRows === 0 && data.length > 0) {
          return NextResponse.json(
            { status: 'limit_exceeded', message: '今月の無料枠(100件)を使い切りました。' },
            { status: 403 }
          );
        }
      }
      targetData = data.slice(0, allowedRows);
    }

    let change_count = 0;
    const processedData = await Promise.all(
      targetData.map(async (row) => {
        const newRow = { ...row };

        for (const col of address_cols) {
          if (row[col]) {
            const originalValue = String(row[col]);
            // ユーザー設定による事前クレンジング
            let targetStr = originalValue;
            if (do_width) targetStr = normalizeWidth(targetStr);
            if (do_hyphen) targetStr = normalizeHyphen(targetStr);

            // Geoloniaのエンジンで正規化
            try {
              const result = await normalize(targetStr);
              
              // 復元した住所を結合
              // 例: pref: '東京都', city: '千代田区', town: '丸の内一丁目', addr: '9-1'
              let normalizedValue = '';
              if (result.pref) normalizedValue += result.pref;
              if (result.city) normalizedValue += result.city;
              if (result.town) normalizedValue += result.town;
              if (result.addr) normalizedValue += result.addr;
              if (result.other) normalizedValue += result.other; // 残りの番地や建物名を結合
              
              if (!normalizedValue) {
                normalizedValue = originalValue;
              }

              newRow[`${col}_正規化済`] = normalizedValue;
              newRow[`${col}_緯度`] = result.point?.lat ? String(result.point.lat) : '';
              newRow[`${col}_経度`] = result.point?.lng ? String(result.point.lng) : '';
              newRow[`${col}_精度レベル`] = String(result.level);

              if (originalValue !== normalizedValue) {
                change_count++;
              }
            } catch (err) {
              // エラーが起きた場合は元の値をそのまま返す
              newRow[`${col}_正規化済`] = originalValue;
              newRow[`${col}_緯度`] = '';
              newRow[`${col}_経度`] = '';
              newRow[`${col}_精度レベル`] = '0';
            }
          } else {
            newRow[`${col}_正規化済`] = '';
            newRow[`${col}_緯度`] = '';
            newRow[`${col}_経度`] = '';
            newRow[`${col}_精度レベル`] = '';
          }
        }

        // 郵便番号の整形処理
        for (const col of zip_cols) {
          if (row[col]) {
            const originalValue = String(row[col]);
            // 全角数字を半角に変換
            let half = originalValue.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
            // 数字以外を削除
            half = half.replace(/\D/g, '');
            // 7桁ならハイフンを入れる
            if (half.length === 7) {
              const formatted = `${half.slice(0, 3)}-${half.slice(3)}`;
              newRow[`${col}_整形済`] = formatted;
              if (originalValue !== formatted) {
                change_count++;
              }
            } else if (half.length > 0) {
              // 7桁以外でもとりあえず半角数字にしておく
              newRow[`${col}_整形済`] = half;
              if (originalValue !== half) change_count++;
            } else {
              newRow[`${col}_整形済`] = originalValue;
            }
          } else {
            newRow[`${col}_整形済`] = '';
          }
        }
        
        return newRow;
      })
    );

    // 処理ログの記録 (ログイン済みの無料会員のみ)
    if (user && !isPro && processedData.length > 0) {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      await supabase.from('usage_logs').insert([
        {
          user_id: user.id,
          rows_processed: processedData.length,
        }
      ]);
    }

    return NextResponse.json({
      status: 'success',
      data: processedData,
      change_count: change_count,
      total_rows: processedData.length,
    });
  } catch (error: any) {
    console.error('Normalization error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
