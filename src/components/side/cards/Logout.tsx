'use client';

import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useStore, SideType } from '@/store';
import { _fetch } from '@/actions/client';
import { Context as SideContext } from '@/components/providers/SideContext';
import Card from '@/components/Card';

const Logout = () => {
  const side = useContext(SideContext) as SideType;
  const setLoggingOut = useStore((store) => store.setLoggingOut);
  const queryClient = useQueryClient();

  const logout = async () => {
    await _fetch(`/api/${side}/logout`);
    queryClient.refetchQueries({ queryKey: [side, 'token'] });
  };

  return (
    <Card text="Are you sure you want to logout of this account?">
      <div className="flex gap-3">
        <div className="button primary" onClick={logout}>
          <p>Logout</p>
        </div>
        <div className="button secondary" onClick={() => setLoggingOut(side, false)}>
          <p>Go back</p>
        </div>
      </div>
    </Card>
  );
};

export default Logout;
