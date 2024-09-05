'use client';

import Card from '@/components/Card';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Card
      filled
      text="Oops! Something went wrong..."
      className="mx-auto mt-8 max-w-[400px]"
    >
      <div className="flex gap-3 mb-5">
        <p>Error:</p>
        <p>{error.message}</p>
      </div>
      <div className="button primary" onClick={reset}>
        <p>Go back</p>
      </div>
    </Card>
  );
}
