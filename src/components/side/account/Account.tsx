'use client';

import { useContext, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useStore, SideType } from '@/store';
import { getPlaylists, getProfile } from '@/utils/spotify';
import { Context as SideContext } from '@/components/providers/SideContext';
import Playlists from './Playlists';
import Profile from './Profile';
import Loading from '../cards/Loading';
import Logout from '../cards/Logout';

const SORT_OPTIONS = ['Z-A', 'None', 'A-Z'];

function Account() {
  const side = useContext(SideContext) as SideType;

  const selectedPlaylist = useStore((state) => state.playlists[side]);
  const loggingOut = useStore((state) => state.loggingOut[side]);
  const [sorting, setSorting] = useState(0);

  const { data: profile, isPending: profilePending } = useQuery({
    queryKey: [side, 'profile'],
    queryFn: () => getProfile(side),
  });

  const playlistQuery = useInfiniteQuery({
    queryKey: [side, 'playlists'],
    queryFn: ({ pageParam }) => getPlaylists(side, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.next ? parseInt(new URL(lastPage.next).searchParams.get('offset')!) : null,
  });

  if (profilePending || playlistQuery.isPending) {
    return <Loading />;
  } else if (loggingOut) {
    return <Logout />;
  }

  const toggleSorting = () => setSorting((state) => (state === 1 ? -1 : state + 1));

  return (
    <div className="flex flex-col flex-1 lg:h-[70vh] lg:max-h-[750px] gap-3">
      <Profile data={profile} playlistCount={playlistQuery.data?.pages[0].total} />
      <div className="flex justify-between gap-5">
        <div className="flex text-sm">
          <p className="text-zinc-500">Sorting:&nbsp;</p>
          <p className="button tertiary plain" onClick={toggleSorting}>
            {SORT_OPTIONS[sorting + 1]}
          </p>
        </div>
        <div className="max-w-[60%] hidden lg:block">
          <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">
            <span className="text-zinc-500">Selected:</span>{' '}
            <span title={selectedPlaylist?.name}>{selectedPlaylist?.name || 'None'}</span>
          </p>
        </div>
      </div>
      <Playlists query={playlistQuery} profileId={profile?.id} sorting={sorting} />
    </div>
  );
}

export default Account;
