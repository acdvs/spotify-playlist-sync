'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RiArrowRightCircleLine, RiRefreshLine } from '@remixicon/react';
import clsx from 'clsx';

import { useStore } from '@/store';
import { getDiff, sync } from '@/utils/spotify';
import Diff from '../Diff';
import { Button } from '../ui/Button';

function SyncButton({
  direction,
  className,
}: {
  direction?: 'row' | 'column';
  className?: string;
}) {
  const queryClient = useQueryClient();
  const playlists = useStore((state) => state.playlists);
  const syncRight = useStore((state) => state.syncRight);
  const [syncing, setSyncing] = useState(false);

  const idFrom = syncRight ? playlists.left?.id : playlists.right?.id;
  const idTo = syncRight ? playlists.right?.id : playlists.left?.id;
  const bothSelected = !!playlists.left && !!playlists.right;

  const {
    data: diff,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['diff', idFrom, idTo],
    queryFn: () => getDiff(syncRight, idFrom as string, idTo as string),
    enabled: bothSelected,
  });

  const onClick = async () => {
    setSyncing(true);
    await sync(syncRight, idFrom as string, idTo as string);
    setSyncing(false);

    queryClient.refetchQueries({ queryKey: [syncRight ? 'right' : 'left', 'playlists'] });
    refetch();
  };

  const hasDiff =
    !!diff && (diff.tracksToAdd.length > 0 || diff.tracksToRemove.length > 0);
  const diffsFound = bothSelected && !isFetching;
  const syncEnabled = !syncing && diffsFound && hasDiff;

  return (
    <div
      className={clsx(
        className,
        direction === 'column' && 'flex-col',
        'flex justify-center items-center',
      )}
    >
      <Diff value={diff?.tracksToAdd.length} sign="+" visible={diffsFound} />
      <Button
        className="flex-col"
        onClick={onClick}
        disabled={!syncEnabled || !idFrom || !idTo}
      >
        <p className="text-sm font-bold">sync</p>
        {!syncing ? (
          <RiArrowRightCircleLine
            className={clsx(!syncRight && 'rotate-180', 'size-10')}
          />
        ) : (
          <RiRefreshLine className="size-10 animate-spin" />
        )}
      </Button>
      <Diff value={diff?.tracksToRemove.length} sign="-" visible={diffsFound} />
    </div>
  );
}

export default SyncButton;
