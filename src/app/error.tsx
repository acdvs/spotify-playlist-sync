'use client';

import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';

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
      <Button variant="primary" onClick={reset}>
        Go back
      </Button>
    </Card>
  );
}
