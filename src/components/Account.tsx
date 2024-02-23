import { Fragment } from 'react';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { Page, SimplifiedPlaylist, UserProfile } from '@spotify/web-api-ts-sdk';
import { Transition } from '@headlessui/react';
import { RiLoader4Line } from '@remixicon/react';

import { useStore, SideType } from '@/store';
import Playlists from './Playlists';
import Profile from './Profile';

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
  const selectedPlaylist = useStore((state) => state.playlists[side]);

  return (
    <>
      <Profile data={profile} playlistCount={playlistQuery.data?.pages[0].total} />
      <Playlists query={playlistQuery} profileId={profile?.id} />
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
