'use client';

import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useStore, SideType } from '@/store';
import { getData } from '@/actions/client';
import { Context as SideContext } from '../providers/SideContext';
import Card from '../Card';

const Logout = () => {
  const side = useContext(SideContext) as SideType;
  const showLogout = useStore((store) => store.showLogout);
  const queryClient = useQueryClient();

  const logout = async () => {
    await getData(`/api/${side}/logout`);
    queryClient.refetchQueries({ queryKey: [side, 'token'] });
  };

  return (
    <Card text="Are you sure you want to logout of this account?">
      <div className="flex gap-3">
        <div className="button primary" onClick={logout}>
          <p>Logout</p>
        </div>
        <div className="button secondary" onClick={() => showLogout(side, false)}>
          <p>Go back</p>
        </div>
      </div>
    </Card>
  );
};

export default Logout;
