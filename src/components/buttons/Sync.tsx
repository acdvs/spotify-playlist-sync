'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RiArrowRightCircleLine, RiRefreshLine } from '@remixicon/react';
import clsx from 'clsx';

import { useStore } from '@/store';
import { getDiff, sync } from '@/utils/spotify';
import { Button } from '../ui/Button';
import Diff from '../Diff';

function SyncButton({
  direction,
  className,
}: {
  direction?: 'row' | 'column';
  className?: string;
}) {
  const queryClient = useQueryClient();
  const { left, right, syncDir } = useStore();
  const store = useStore();

  const fromDir = syncDir === 'right' ? 'left' : 'right';
  const idFrom = store[fromDir].playlist?.id;
  const idTo = store[syncDir].playlist?.id;
  const bothSelected = !!left.playlist && !!right.playlist;

  const {
    data: diff,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['diff', idFrom, idTo],
    queryFn: () => getDiff(syncDir, idFrom, idTo),
    enabled: bothSelected,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => sync(syncDir, idFrom, idTo),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [syncDir, 'playlists'],
      });
      refetch();
    },
  });

  const hasDiff =
    !!diff && (diff.tracksToAdd.length > 0 || diff.tracksToRemove.length > 0);
  const diffsFound = bothSelected && !isFetching;
  const syncEnabled = !isPending && diffsFound && hasDiff;

  return (
    <div
      className={clsx(
        className,
        direction === 'column' && 'flex-col',
        'flex justify-center items-center',
      )}
    >
      {syncEnabled && <Diff value={diff?.tracksToAdd.length} sign="+" />}
      <Button className="flex-col" onClick={() => mutate()} disabled={!syncEnabled}>
        <p className="text-sm font-bold">sync</p>
        {isFetching || isPending ? (
          <RiRefreshLine className="size-10 animate-spin" />
        ) : (
          <RiArrowRightCircleLine
            className={clsx(syncDir === 'left' && 'rotate-180', 'size-10')}
          />
        )}
      </Button>
      {syncEnabled && <Diff value={diff?.tracksToRemove.length} sign="-" />}
    </div>
  );
}

export default SyncButton;
