import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-06-20',
});

export default async function CheckoutRedirect() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm text-center">
          <p className="text-foreground font-medium mb-4">Stripeの決済設定がまだ完了していません。</p>
          <a href="/" className="text-brand hover:underline font-bold">トップページへ戻る</a>
        </div>
      </div>
    )
  }

  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const origin = `${protocol}://${host}`

  const apiKey = `ak_${uuidv4().replace(/-/g, '')}`;

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
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&key=${apiKey}`,
    cancel_url: `${origin}/`,
    metadata: {
      apiKey: apiKey,
    },
  });

  if (session.url) {
    redirect(session.url)
  }

  return null
}
