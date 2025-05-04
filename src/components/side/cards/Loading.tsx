import { RiLoader4Line } from '@remixicon/react';
import Card from '@/components/Card';

function Loading() {
  return (
    <Card>
      <RiLoader4Line className="w-16 h-auto fill-zinc-700 animate-spin" />
    </Card>
  );
}

export default Loading;
