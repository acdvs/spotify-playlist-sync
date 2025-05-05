import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

type Query = UseInfiniteQueryResult<InfiniteData<Page<SimplifiedPlaylist>, unknown>>;

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
