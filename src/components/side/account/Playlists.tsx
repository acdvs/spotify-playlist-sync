'use client';

import type { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import useSortedPlaylists from '@/utils/hooks/use-sorted-playlists';
import Playlist from './Playlist';

function Playlists({
  query,
  profileId,
  sorting,
}: {
  query: UseInfiniteQueryResult<
    InfiniteData<Page<SimplifiedPlaylist>, unknown>,
    Error
  >;
  profileId?: string;
  sorting: number;
}) {
  const items = useSortedPlaylists(query, sorting);

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      const el = e.currentTarget;
      const atBottom =
        Math.abs(el.scrollHeight - (el.scrollTop + el.clientHeight)) <= 75;

      if (atBottom) {
        query.fetchNextPage();
      }
    }
  };

  return (
    <div className="min-h-25 h-full py-3 border-y-2 border-zinc-700">
      <ul
        className="h-full flex flex-col gap-3 border-zinc-700 scroll-y scrollbar-thin pr-2"
        onScroll={onScroll}
      >
        {items?.map((playlist) => (
          <Playlist key={playlist?.id} data={playlist} profileId={profileId} />
        ))}
      </ul>
    </div>
  );
}

export default Playlists;
