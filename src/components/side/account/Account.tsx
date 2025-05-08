'use client';

import { useContext, useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useStore, SideType } from '@/store';
import { getPlaylists, getProfile } from '@/utils/spotify';
import { SideContext } from '@/components/providers/SideContext';
import { Button } from '@/components/ui/Button';
import Playlists from './Playlists';
import Profile from './Profile';
import LoadingCard from '../cards/Loading';
import LogoutCard from '../cards/Logout';
import ErrorCard from '../cards/Error';

const SORT_OPTIONS = ['Z-A', 'Default', 'A-Z'];

function Account() {
  const side = useContext(SideContext) as SideType;

  const { playlist, loggingOut } = useStore((state) => state[side]);
  const setDisplayName = useStore((state) => state.setDisplayName);

  const [sorting, setSorting] = useState(0);

  const profileQuery = useQuery({
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

  useEffect(() => {
    setDisplayName(side, profileQuery.data?.display_name);
  }, [profileQuery.data?.display_name]);

  if (profileQuery.isPending || playlistQuery.isPending) {
    return <LoadingCard />;
  } else if (profileQuery.isError || playlistQuery.isError) {
    return <ErrorCard />;
  } else if (loggingOut) {
    return <LogoutCard />;
  }

  const toggleSorting = () => setSorting((state) => (state === 1 ? -1 : state + 1));

  return (
    <div className="flex flex-col flex-1 lg:h-[70vh] lg:max-h-[750px] gap-3">
      <Profile
        {...profileQuery.data}
        playlistCount={playlistQuery.data?.pages[0].total}
      />
      <div className="flex justify-between gap-5">
        <div className="flex text-sm">
          <p className="mr-1 text-zinc-500">Sorting:</p>
          <Button
            variant="text"
            onClick={toggleSorting}
            disabled={playlistQuery.isFetching}
          >
            {SORT_OPTIONS[sorting + 1]}
          </Button>
        </div>
        <div className="max-w-[60%] hidden lg:block">
          <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">
            <span className="text-zinc-500">Selected:</span>{' '}
            <span title={playlist?.name}>{playlist?.name || 'None'}</span>
          </p>
        </div>
      </div>
      <Playlists
        query={playlistQuery}
        profileId={profileQuery.data?.id}
        sorting={sorting}
      />
    </div>
  );
}

export default Account;
