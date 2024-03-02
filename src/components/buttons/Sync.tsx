'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RiArrowRightCircleLine, RiRefreshLine } from '@remixicon/react';
import cx from 'classnames';

import { useStore } from '@/store';
import { getDiff, sync } from '@/actions/client';
import Diff from '../Diff';

const SyncButton = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();
  const playlists = useStore((state) => state.playlists);
  const [syncing, setSyncing] = useState(false);

  const bothSelected = !!playlists.left && !!playlists.right;

  const {
    data: diff,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['diff', playlists.left?.id, playlists.right?.id],
    queryFn: () => getDiff(playlists.left?.id, playlists.right?.id),
    enabled: bothSelected,
  });

  const onClick = async () => {
    setSyncing(true);
    await sync(playlists.left?.id, playlists.right?.id);
    setSyncing(false);

    queryClient.refetchQueries({ queryKey: ['right', 'playlists'] });
    refetch();
  };

  const hasDiff =
    !!diff && (diff.tracksToAdd.length > 0 || diff.tracksToRemove.length > 0);
  const diffsVisible = bothSelected && !isFetching;
  const syncEnabled = !syncing && diffsVisible && hasDiff;

  return (
    <div
      className={cx(className, 'flex flex-row lg:flex-col justify-center items-center')}
    >
      <Diff value={diff?.tracksToAdd.length} sign="+" visible={diffsVisible} />
      <div
        className={cx(
          !syncEnabled && 'disabled',
          'button tertiary flex flex-col items-center w-16 p-2 mx-5 my-2 lg:my-5',
        )}
        onClick={syncEnabled ? onClick : undefined}
      >
        <p className="text-sm font-bold">sync</p>
        {!syncing ? (
          <RiArrowRightCircleLine className="w-10 h-10 rotate-90 lg:rotate-0" />
        ) : (
          <RiRefreshLine className="w-10 h-10 animate-spin" />
        )}
      </div>
      <Diff value={diff?.tracksToRemove.length} sign="-" visible={diffsVisible} />
    </div>
  );
};

export default SyncButton;
