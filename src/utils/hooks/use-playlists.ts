'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { SideContext } from '@/components/providers/SideContext';
import type { SideType } from '@/store';
import { getPlaylists } from '../spotify';

const usePlaylists = () => {
  const side = useContext(SideContext) as SideType;

  const playlistQuery = useInfiniteQuery({
    queryKey: [side, 'playlists'],
    queryFn: ({ pageParam }) => getPlaylists(side, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const offset = lastPage.next
        ? new URL(lastPage.next).searchParams.get('offset')
        : '0';
      return lastPage.next ? Number(offset) : null;
    },
  });

  return playlistQuery;
};

export default usePlaylists;
