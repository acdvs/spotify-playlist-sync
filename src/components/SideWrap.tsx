'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';

import { getData } from '@/actions/client';
import SideContext from './providers/SideContext';
import Card from './Card';
import LoginButton from './buttons/Login';
import type { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

const Side = dynamic(() => import('./Side'));

const SideWrap = ({ side }: { side: SideType }) => {
  const token = useQuery({
    queryKey: [side, 'token'],
    queryFn: () => getData<AccessToken>(`/api/${side}/token`),
  });

  return (
    <SideContext side={side}>
      <div className="flex flex-col w-full lg:w-[350px] h-2/3 lg:h-auto justify-center">
        {token.data ? (
          <Side side={side} />
        ) : (
          <Card filled text="Not logged in to a Spotify account.">
            <LoginButton />
          </Card>
        )}
      </div>
    </SideContext>
  );
};

export default SideWrap;
