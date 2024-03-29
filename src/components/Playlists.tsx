'use client';

import { useEffect, useRef } from 'react';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

import Playlist from './Playlist';

const Playlists = ({
  query,
  profileId,
  sorting,
}: {
  query: UseInfiniteQueryResult<InfiniteData<Page<SimplifiedPlaylist>, unknown>, Error>;
  profileId?: string;
  sorting: number;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (wrapRef.current && listRef.current) {
      if (listRef.current.clientHeight > wrapRef.current.clientHeight) {
        wrapRef.current.classList.add('pr-2');
        wrapRef.current.classList.add('-mr-4');
      }
    }
  }, [query.data?.pages.length]);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      const el = event.currentTarget;
      const atBottom = Math.abs(el.scrollHeight - (el.scrollTop + el.clientHeight)) <= 75;

      if (atBottom) {
        query.fetchNextPage();
      }
    }
  };

  let items = query.data?.pages.flatMap((x) => x.items);

  if (sorting !== 0) {
    items?.sort((a, b) => (a.name > b.name ? 0 + sorting : 0 - sorting));
  }

  return (
    <div className="py-3 mt-2 border-y-2 border-zinc-700">
      <div className="h-[25vh] lg:h-[45vh] scroll-y" ref={wrapRef} onScroll={onScroll}>
        <ul role="list" className="flex flex-col gap-3 border-zinc-700" ref={listRef}>
          {items?.map((playlist) => (
            <Playlist key={playlist.id} data={playlist} profileId={profileId} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playlists;
