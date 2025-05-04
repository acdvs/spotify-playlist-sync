'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RiArrowRightCircleLine, RiRefreshLine } from '@remixicon/react';
import clsx from 'clsx';

import { useStore } from '@/store';
import { getDiff, sync } from '@/actions/client';
import Diff from '../Diff';

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
    queryFn: () => getDiff(syncRight, idFrom, idTo),
    enabled: bothSelected,
  });

  const onClick = async () => {
    if (!syncEnabled) {
      return;
    }

    setSyncing(true);
    await sync(syncRight, idFrom, idTo);
    setSyncing(false);

    queryClient.refetchQueries({ queryKey: [syncRight, 'playlists'] });
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
      <div
        className={clsx(
          !syncEnabled && 'disabled',
          direction === 'column' && 'my-3',
          'button tertiary plain flex flex-col items-center',
        )}
        onClick={onClick}
      >
        <p className="text-sm font-bold">sync</p>
        {!syncing ? (
          <RiArrowRightCircleLine
            className={clsx(!syncRight && 'rotate-180', 'w-10 h-10')}
          />
        ) : (
          <RiRefreshLine className="w-10 h-10 animate-spin" />
        )}
      </div>
      <Diff value={diff?.tracksToRemove.length} sign="-" visible={diffsFound} />
    </div>
  );
}

export default SyncButton;
