'use client';

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Transition } from '@headlessui/react';
import { RiLoader4Line } from '@remixicon/react';
import type { Page, SimplifiedPlaylist, UserProfile } from '@spotify/web-api-ts-sdk';

import { useStore, SideType } from '@/store';
import { getData } from '@/actions/client';
import Card from './Card';
import LogoutCard from './LogoutCard';
import Account from './Account';

const SideTransition = ({
  show,
  afterLeave,
  children,
}: React.PropsWithChildren & {
  show: boolean;
  afterLeave: (...args: any[]) => void;
}) => (
  <Transition
    show={show}
    enter="transition-opacity duration-200"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    afterLeave={afterLeave}
  >
    {children}
  </Transition>
);

const Side = ({ side }: { side: SideType }) => {
  const loggingOut = useStore((state) => state.loggingOut[side]);

  const [accountDelayGate, setAccountGate] = useState(false);
  const [logoutDelayGate, setLogoutGate] = useState(false);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: [side, 'profile'],
    queryFn: () => getData<UserProfile>(`/api/${side}/profile`),
  });

  const playlistQuery = useInfiniteQuery({
    queryKey: [side, 'playlists'],
    queryFn: ({ pageParam }) =>
      getData<Page<SimplifiedPlaylist>>(`/api/${side}/playlists?offset=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.next ? parseInt(new URL(lastPage.next).searchParams.get('offset')!) : null,
  });

  const triggerLogoutDelay = () => {
    setLogoutGate(true);
    setAccountGate(false);
  };

  const triggerAccountDelay = () => {
    setLogoutGate(false);
    setAccountGate(true);
  };

  const loadingShown = profileLoading || playlistQuery.isLoading;
  const accountShown = !loadingShown && !loggingOut && accountDelayGate;
  const logoutShown = loggingOut && !loadingShown && logoutDelayGate;

  return (
    <>
      <SideTransition show={loadingShown} afterLeave={triggerAccountDelay}>
        <Card>
          <RiLoader4Line className="w-16 h-auto fill-zinc-700 animate-spin" />
        </Card>
      </SideTransition>
      <SideTransition show={accountShown} afterLeave={triggerLogoutDelay}>
        <Account side={side} profile={profile} playlistQuery={playlistQuery} />
      </SideTransition>
      <SideTransition show={logoutShown} afterLeave={triggerAccountDelay}>
        <LogoutCard side={side} />
      </SideTransition>
    </>
  );
};

export default Side;
