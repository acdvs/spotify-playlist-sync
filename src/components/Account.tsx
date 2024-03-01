import { Fragment, useState } from 'react';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Page, SimplifiedPlaylist, UserProfile } from '@spotify/web-api-ts-sdk';
import { Transition } from '@headlessui/react';
import { RiLoader4Line } from '@remixicon/react';

import { useStore, SideType } from '@/store';
import Playlists from './Playlists';
import Profile from './Profile';

const SORT_OPTS = ['Z-A', 'None', 'A-Z'];

const Account = ({
  side,
  profile,
  playlistQuery,
}: {
  side: SideType;
  profile?: UserProfile;
  playlistQuery: UseInfiniteQueryResult<
    InfiniteData<Page<SimplifiedPlaylist>, unknown>,
    Error
  >;
}) => {
  const [sorting, setSorting] = useState(0);
  const selectedPlaylist = useStore((state) => state.playlists[side]);

  const toggleSorting = () => setSorting((state) => (state === 1 ? -1 : state + 1));

  return (
    <>
      <Profile data={profile} playlistCount={playlistQuery.data?.pages[0].total} />
      <div className="flex text-sm">
        <p className="text-zinc-500">Sorting:&nbsp;</p>
        <p className="button tertiary plain" onClick={toggleSorting}>
          {SORT_OPTS[sorting + 1]}
        </p>
      </div>
      <Playlists query={playlistQuery} profileId={profile?.id} sorting={sorting} />
      <div className="h-5 mt-2 flex justify-between">
        <div className="max-w-[80%]">
          <Transition
            show={!!selectedPlaylist}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            enter="transition-opacity"
            as={Fragment}
          >
            <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">
              <span className="text-zinc-500">Selected:</span> {selectedPlaylist?.name}
            </p>
          </Transition>
        </div>
        {playlistQuery.isFetchingNextPage && (
          <RiLoader4Line className="w-5 animate-spin" />
        )}
      </div>
    </>
  );
};

export default Account;
