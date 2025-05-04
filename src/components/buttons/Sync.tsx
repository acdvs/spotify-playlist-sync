'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RiArrowRightCircleLine, RiRefreshLine } from '@remixicon/react';
import clsx from 'clsx';

import { useStore } from '@/store';
import { getDiff, sync } from '@/actions/client';
import Diff from '../Diff';

const SyncButton = ({
  direction,
  className,
}: {
  direction?: 'row' | 'column';
  className?: string;
}) => {
  const queryClient = useQueryClient();
  const playlists = useStore((state) => state.playlists);
  const syncDirection = useStore((state) => state.syncDirection);
  const [syncing, setSyncing] = useState(false);

  const idFrom = syncDirection === 'right' ? playlists.left?.id : playlists.right?.id;
  const idTo = syncDirection === 'right' ? playlists.right?.id : playlists.left?.id;
  const bothSelected = !!playlists.left && !!playlists.right;

  const {
    data: diff,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['diff', idFrom, idTo],
    queryFn: () => getDiff(syncDirection, idFrom, idTo),
    enabled: bothSelected,
  });

  const onClick = async () => {
    setSyncing(true);
    await sync(syncDirection, idFrom, idTo);
    setSyncing(false);

    queryClient.refetchQueries({ queryKey: [syncDirection, 'playlists'] });
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
        onClick={syncEnabled ? onClick : undefined}
      >
        <p className="text-sm font-bold">sync</p>
        {!syncing ? (
          <RiArrowRightCircleLine
            className={clsx(syncDirection === 'left' && 'rotate-180', 'w-10 h-10')}
          />
        ) : (
          <RiRefreshLine className="w-10 h-10 animate-spin" />
        )}
      </div>
      <Diff value={diff?.tracksToRemove.length} sign="-" visible={diffsFound} />
    </div>
  );
};

export default SyncButton;
