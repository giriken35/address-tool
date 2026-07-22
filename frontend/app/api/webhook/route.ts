import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { kv } from '@vercel/kv';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !endpointSecret) {
    return NextResponse.json({ error: 'Webhook Secret or Signature missing' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // 決済完了イベント
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const apiKey = session.metadata?.apiKey;
    const customerId = session.customer as string;

    if (apiKey) {
      // Vercel KV データベースにAPIキーを保存 (有効化)
      // 値としてカスタマーIDを入れておく（将来の解約処理などのため）
      await kv.set(`apikey:${apiKey}`, customerId);
      console.log(`API Key ${apiKey} activated for customer ${customerId}`);
    }
  }

  // 解約時の処理 (APIキーの無効化)
  if (event.type === 'customer.subscription.deleted') {
    // 実際の運用では、Customerから紐づくAPIキーを探して削除するロジックを入れます。
    // 今回は簡易版として省略。
  }

  return NextResponse.json({ received: true });
}
