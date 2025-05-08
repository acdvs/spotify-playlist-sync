'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

type Query = ReturnType<typeof useInfiniteQuery<Page<SimplifiedPlaylist>>>;

const useSortedPlaylists = (query: Query, sorting: number) => {
  return useMemo(() => {
    let items = query.data?.pages.flatMap((x) => x.items);

    if (sorting !== 0) {
      items?.sort((a, b) => (a.name > b.name ? 0 + sorting : 0 - sorting));
    }

    return items;
  }, [query.data, sorting]);
};

export default useSortedPlaylists;
