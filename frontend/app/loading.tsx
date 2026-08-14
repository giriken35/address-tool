export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto min-h-screen w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
        {/* ヒーローヘッダー Skeleton */}
        <header className="relative mb-6 overflow-hidden rounded-3xl border border-border/50 bg-card/30 px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-6 w-32 bg-muted rounded-full"></div>
              <div className="h-8 w-40 bg-muted rounded-full"></div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-11 w-11 sm:h-14 sm:w-14 bg-muted rounded-2xl shrink-0"></div>
              <div className="h-8 sm:h-12 w-3/4 max-w-md bg-muted rounded-xl"></div>
            </div>

            <div className="mt-4 max-w-2xl space-y-4">
              <div className="h-4 w-full bg-muted rounded-md"></div>
              <div className="h-4 w-11/12 bg-muted rounded-md"></div>
              <div className="h-4 w-4/5 bg-muted rounded-md"></div>
              <div className="h-4 w-full bg-muted rounded-md"></div>
              <div className="h-4 w-3/4 bg-muted rounded-md"></div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <div className="h-8 w-24 bg-muted rounded-full"></div>
              <div className="h-8 w-32 bg-muted rounded-full"></div>
              <div className="h-8 w-28 bg-muted rounded-full"></div>
            </div>
          </div>
        </header>

        {/* ツールセクション Skeleton */}
        <div className="mx-auto max-w-5xl mt-8">
          <div className="h-[400px] w-full bg-card/30 rounded-3xl border border-border/50"></div>
        </div>
      </main>
    </div>
  )
}
