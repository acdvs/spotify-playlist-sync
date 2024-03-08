'use client';

import Card from '@/components/Card';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Card text="Oops! Something went wrong..." className="max-w-[400px]">
      <div className="flex self-start mb-5">
        <p className="mr-3">Error:</p>
        <p>{error.message}</p>
      </div>
      <div className="button primary" onClick={reset}>
        <p>Try again</p>
      </div>
    </Card>
  );
}
