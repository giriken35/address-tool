import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe is not configured yet.' }, { status: 500 });
    }

    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const origin = `${protocol}://${host}`;

    // APIキーとして使うランダム文字列を事前に生成
    const apiKey = `ak_${uuidv4().replace(/-/g, '')}`;

    // Checkout セッションの作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: '住所表記揺れ一括正規化ツール (Pro API)',
              description: '無制限の一括処理機能と、自社システムに組み込める開発者向けAPIへのアクセス権',
            },
            unit_amount: 5000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // 成功ページにAPIキーを渡す
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&key=${apiKey}`,
      cancel_url: `${origin}/`,
      // メタデータにAPIキーを入れておき、WebhookでDBに保存する
      metadata: {
        apiKey: apiKey,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
