'use client';

import { useContext, useEffect } from 'react';
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
  const setPlaylist = useStore((state) => state.setPlaylist);
  const syncDirection = useStore((state) => state.syncDirection);

  const receivingSide = side === syncDirection;
  const notSyncable = receivingSide && data.owner.id !== profileId;

  useEffect(() => {
    if (notSyncable) {
      setPlaylist(side);
    }
  }, [notSyncable, syncDirection, side, setPlaylist]);

  const onClick = () => {
    if (!notSyncable) {
      setPlaylist(side, data);
    }
  };

  return (
    <li
      className={cx(
        data.id === selectedPlaylist?.id && 'selected',
        notSyncable && 'locked',
        'playlist button p-3 flex gap-3 bg-zinc-900 border-2 group',
      )}
      onClick={onClick}
    >
      <div className="w-10 aspect-square bg-zinc-800 flex-shrink-0">
        {data.images.length > 0 && (
          <Image
            src={data.images[0].url}
            quality={25}
            width={40}
            height={40}
            className="rounded"
            alt="Playlist cover"
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
          <p className="text-sm text-zinc-500 leading-none">
            {data.public ? 'public' : 'private'}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-zinc-500 text-sm">{data.tracks?.total} songs</p>
          {notSyncable && (
            <div className="flex items-center gap-1 transition-colors">
              <RiLockLine className="w-4 h-4 fill-zinc-500 group-hover:fill-red-600" />
              <p className="text-sm text-zinc-500 group-hover:text-red-600">Not owned</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Playlist;
