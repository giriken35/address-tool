"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle2, Key, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get('key');

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      alert('APIキーをコピーしました');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">決済が完了しました！</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Proプランへのアップグレードありがとうございます。以下のAPIキーを使用して、無制限の処理をご利用いただけます。
        </p>

        {apiKey ? (
          <div className="mb-8 rounded-xl border border-brand/20 bg-brand/5 p-4 text-left">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand">
              <Key className="h-4 w-4" /> あなたの専用APIキー
            </div>
            <div className="flex items-center gap-2">
              <code className="block w-full overflow-hidden truncate rounded-lg bg-black/5 px-3 py-2 text-sm font-mono text-foreground">
                {apiKey}
              </code>
              <Button size="icon" variant="outline" onClick={copyToClipboard} className="shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              ※この画面を閉じると二度と表示されません。必ずコピーして安全な場所に保管してください。
            </p>
          </div>
        ) : (
          <div className="mb-8 p-4 text-sm text-amber-600">
            APIキーの取得に失敗しました。サポートにお問い合わせください。
          </div>
        )}

        <Button
          className="w-full bg-brand text-white hover:bg-brand-2"
          onClick={() => window.location.href = '/'}
        >
          ツールに戻る
        </Button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
