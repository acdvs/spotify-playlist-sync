'use client';

import Card from '@/components/Card';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Card
      text="Oops! Something went wrong..."
      className="w-[400px] max-w-[95vw] self-center"
    >
      <div className="flex self-start mb-5">
        <p className="mr-3">Error:</p>
        <p>{error.message}</p>
      </div>
      <div className="button primary" onClick={reset}>
        <p>Go back</p>
      </div>
    </Card>
  );
}
