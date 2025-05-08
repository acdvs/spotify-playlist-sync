'use client';

import { RiArrowRightCircleLine, RiRefreshLine } from '@remixicon/react';
import clsx from 'clsx';

import { useStore } from '@/store';
import useSync from '@/utils/hooks/use-sync';
import { Button } from '../ui/Button';
import Diff from '../Diff';

function SyncButton({
  direction,
  className,
}: {
  direction?: 'row' | 'column';
  className?: string;
}) {
  const { syncDir } = useStore();
  const { enabled, diff, isPending, isFetching, mutate } = useSync();

  return (
    <div
      className={clsx(
        className,
        direction === 'column' && 'flex-col',
        'flex justify-center items-center',
      )}
    >
      {enabled && <Diff value={diff?.tracksToAdd.length} sign="+" />}
      <Button className="flex-col" onClick={() => mutate()} disabled={!enabled}>
        <p className="text-sm font-bold">sync</p>
        {isFetching || isPending ? (
          <RiRefreshLine className="size-10 animate-spin" />
        ) : (
          <RiArrowRightCircleLine
            className={clsx(syncDir === 'left' && 'rotate-180', 'size-10')}
          />
        )}
      </Button>
      {enabled && <Diff value={diff?.tracksToRemove.length} sign="-" />}
    </div>
  );
}

export default SyncButton;
