'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useStore } from '@/store';
import { getDiff, sync } from '../spotify';

const useSync = () => {
  const store = useStore();
  const { left, right, syncDir } = useStore();

  const queryClient = useQueryClient();

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

  return {
    enabled: syncEnabled,
    diff,
    isPending,
    isFetching,
    mutate,
  };
};

export default useSync;
