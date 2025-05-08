'use client';

import { useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { SideType } from '@/store';
import { SideContext } from '@/components/providers/SideContext';
import { getPlaylists } from '../spotify';

const usePlaylists = () => {
  const side = useContext(SideContext) as SideType;

  const playlistQuery = useInfiniteQuery({
    queryKey: [side, 'playlists'],
    queryFn: ({ pageParam }) => getPlaylists(side, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.next ? parseInt(new URL(lastPage.next).searchParams.get('offset')!) : null,
  });

  return playlistQuery;
};

export default usePlaylists;
