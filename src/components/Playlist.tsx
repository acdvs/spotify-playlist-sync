'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { RiLockLine } from '@remixicon/react';
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import cx from 'classnames';

import { useStore, SideType } from '@/store';
import { Context as SideContext } from './providers/SideContext';

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
  const unowned = lockUnowned && data.owner.id !== profileId;

  return (
    <li
      className={cx(
        data.id === selectedPlaylist?.id
          ? 'border-green-500 hover:border-green-600'
          : 'border-transparent hover:border-zinc-600',
        'button p-3 flex justify-between bg-zinc-900 border-2 items-stretch group',
      )}
      onClick={unowned ? undefined : onClick}
    >
      <div className="flex max-w-[80%]">
        <div className="w-10 aspect-square mr-3 bg-zinc-800 flex-shrink-0">
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
        <div className="overflow-hidden">
          <a
            href={data.external_urls.spotify}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="button tertiary plain leading-none mb-1 text-ellipsis whitespace-nowrap overflow-hidden"
              title={data.name}
            >
              {data.name}
            </p>
          </a>
          <p className="text-zinc-400 text-sm">{data.tracks?.total} songs</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <p className="text-sm text-zinc-600 leading-none">
          {data.public || unowned ? 'public' : 'private'}
        </p>
        {unowned && (
          <div title="Not owned">
            <RiLockLine className="w-4 fill-zinc-600 group-hover:fill-red-500" />
          </div>
        )}
      </div>
    </li>
  );
};

export default Playlist;
