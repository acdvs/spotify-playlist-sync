'use client';

import { useQuery } from '@tanstack/react-query';

import { getData } from '@/actions/client';
import SideContext from './providers/SideContext';
import Side from './Side';
import Card from './Card';
import LoginButton from './buttons/Login';
import type { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

const SideWrap = ({ side }: { side: SideType }) => {
  const token = useQuery({
    queryKey: [side, 'token'],
    queryFn: () => getData<AccessToken>(`/api/${side}/token`),
  });

  return (
    <SideContext side={side}>
      <div className="w-[350px]">
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
