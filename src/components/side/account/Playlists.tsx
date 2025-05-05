'use client';

import { useRef } from 'react';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

import Playlist from './Playlist';
import useSortedPlaylists from '@/utils/hooks/use-sorted-playlists';

function Playlists({
  query,
  profileId,
  sorting,
}: {
  query: UseInfiniteQueryResult<InfiniteData<Page<SimplifiedPlaylist>, unknown>, Error>;
  profileId?: string;
  sorting: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useSortedPlaylists(query, sorting);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      const el = e.currentTarget;
      const atBottom = Math.abs(el.scrollHeight - (el.scrollTop + el.clientHeight)) <= 75;

      if (atBottom) {
        query.fetchNextPage();
      }
    }
  };

  return (
    <div className="min-h-[100px] h-full py-3 border-y-2 border-zinc-700">
      <div
        className="h-full -mr-4 scroll-y gutter-stable"
        ref={wrapRef}
        onScroll={onScroll}
      >
        <ul role="list" className="flex flex-col gap-3 border-zinc-700" ref={listRef}>
          {items?.map((playlist) => (
            <Playlist key={playlist?.id} data={playlist} profileId={profileId} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Playlists;
