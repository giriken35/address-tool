import { NextResponse } from 'next/server';
import { normalize } from '@geolonia/normalize-japanese-addresses';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, address_cols, do_prefecture, do_width, do_hyphen } = body;

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        { status: 'error', message: 'No data provided.' },
        { status: 400 }
      );
    }

    // APIキーの確認
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

    // プロプランでない場合、サーバー側でも強制的に100件でカット
    const limit = isPro ? data.length : Math.min(data.length, 100);
    const targetData = data.slice(0, limit);

    let change_count = 0;
    const processedData = await Promise.all(
      targetData.map(async (row) => {
        const newRow = { ...row };

        for (const col of address_cols) {
          if (row[col]) {
            const originalValue = String(row[col]);
            
            // Geoloniaのエンジンで正規化
            try {
              const result = await normalize(originalValue);
              
              // 復元した住所を結合
              // 例: pref: '東京都', city: '千代田区', town: '丸の内一丁目', addr: '9-1'
              let normalizedValue = '';
              if (result.pref) normalizedValue += result.pref;
              if (result.city) normalizedValue += result.city;
              if (result.town) normalizedValue += result.town;
              if (result.addr) normalizedValue += result.addr;

              // 古いコードのオプション(do_prefecture等)はGeoloniaが全て完璧にやってくれるため、
              // 基本的に統合された最高精度の結果をそのまま使う
              
              if (!normalizedValue) {
                normalizedValue = originalValue;
              }

              newRow[`${col}_正規化済`] = normalizedValue;

              if (originalValue !== normalizedValue) {
                change_count++;
              }
            } catch (err) {
              // エラーが起きた場合は元の値をそのまま返す
              newRow[`${col}_正規化済`] = originalValue;
            }
          } else {
            newRow[`${col}_正規化済`] = '';
          }
        }
        return newRow;
      })
    );

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
