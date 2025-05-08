'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { useIsFetching } from '@tanstack/react-query';
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { RiLockLine, RiMusic2Line } from '@remixicon/react';
import clsx from 'clsx';

import { useStore, SideType } from '@/store';
import { SideContext } from '@/components/providers/SideContext';
import { Button } from '@/components/ui/Button';

function Playlist({ data, profileId }: { data: SimplifiedPlaylist; profileId?: string }) {
  const side = useContext(SideContext) as SideType;

  const selectedPlaylist = useStore((state) => state[side].playlist);
  const { setPlaylist, syncDir } = useStore();

  const playlistsFetching = useIsFetching({ queryKey: [side, 'playlists'] }) > 0;

  const receivingSide = side === syncDir;
  const notSyncable = receivingSide && data.owner.id !== profileId;

  useEffect(() => {
    if (notSyncable) {
      setPlaylist(side);
    }
  }, [notSyncable, syncDir, side, setPlaylist]);

  const onClick = () => {
    setPlaylist(side, selectedPlaylist?.id !== data.id ? data : undefined);
  };

  const image =
    data.images?.length > 0 ? (
      <Image
        src={data.images[0].url}
        quality={25}
        width={40}
        height={40}
        className="rounded"
        alt="Playlist cover"
      />
    ) : (
      <RiMusic2Line className="fill-zinc-500" />
    );

  return (
    <li>
      <Button
        className={clsx(
          data.id === selectedPlaylist?.id
            ? 'border-green-500 hover:border-green-600'
            : ' border-transparent hover:border-zinc-600',
          notSyncable && 'hover:border-red-600',
          'p-3 w-full rounded-lg flex gap-3 bg-zinc-900 border-2 cursor-pointer group',
        )}
        onClick={onClick}
        disabled={notSyncable || playlistsFetching}
      >
        <div className="flex justify-center items-center w-10 aspect-square bg-zinc-800 flex-shrink-0">
          {image}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center gap-3">
            <Button variant="text" asChild>
              <a
                href={data.external_urls.spotify}
                target="_blank"
                className="h-5 max-w-[200px] leading-none text-ellipsis whitespace-nowrap overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                title={data.name}
              >
                {data.name}
              </a>
            </Button>
            <p className="text-sm text-zinc-500 leading-none">
              {data.public ? 'public' : 'private'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-zinc-500 text-sm">{data.tracks?.total} songs</p>
            {notSyncable && (
              <div className="flex items-center gap-1 transition-colors">
                <RiLockLine className="w-4 h-4 fill-zinc-500 group-hover:fill-red-600" />
                <p className="text-sm text-zinc-500 group-hover:text-red-600">
                  Not owned
                </p>
              </div>
            )}
          </div>
        </div>
      </Button>
    </li>
  );
}

export default Playlist;
