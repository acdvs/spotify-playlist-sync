'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { RiLockLine } from '@remixicon/react';
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import cx from 'classnames';

import { useStore, SideType } from '@/store';
import { Context as SideContext } from '@/components/providers/SideContext';

const Playlist = ({
  data,
  profileId,
}: {
  data: SimplifiedPlaylist;
  profileId?: string;
}) => {
  const side = useContext(SideContext) as SideType;

  const selectedPlaylist = useStore((state) => state.playlists[side]);
  const setSelectedPlaylist = useStore((state) => state.setPlaylist);

  const onClick = () => {
    setSelectedPlaylist(side, data);
  };

  const lockUnowned = side === 'right';
  const notOwned = lockUnowned && data.owner.id !== profileId;

  return (
    <li
      className={cx(
        data.id === selectedPlaylist?.id
          ? 'border-green-500 hover:border-green-600'
          : 'border-transparent hover:border-zinc-600',
        'button p-3 flex gap-3 bg-zinc-900 border-2 group',
      )}
      onClick={notOwned ? undefined : onClick}
    >
      <div className="w-10 aspect-square bg-zinc-800 flex-shrink-0">
        {data.images.length > 0 && (
          <Image
            src={data.images[0].url}
            quality={25}
            width={40}
            height={40}
            className="rounded"
            alt="Playlist collage"
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between gap-3">
          <a
            href={data.external_urls.spotify}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="h-5 max-w-[200px] button tertiary plain leading-none text-ellipsis whitespace-nowrap overflow-x-hidden"
              title={data.name}
            >
              {data.name}
            </p>
          </a>
          <p className="text-sm text-zinc-600 leading-none">
            {data.public || notOwned ? 'public' : 'private'}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-zinc-400 text-sm">{data.tracks?.total} songs</p>
            <div className="flex items-center gap-1">
              <RiLockLine className="w-4 fill-zinc-600 group-hover:fill-red-500" />
              <p className="text-sm hidden group-hover:inline-block group-hover:text-red-500">
                Not owned
              </p>
          {notOwned && (
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Playlist;
