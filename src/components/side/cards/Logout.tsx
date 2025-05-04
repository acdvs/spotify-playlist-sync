'use client';

import { useContext } from 'react';

import { logout } from '@/actions/session';
import { useStore, SideType } from '@/store';
import { Context as SideContext } from '@/components/providers/SideContext';
import Card from '@/components/Card';

function Logout() {
  const side = useContext(SideContext) as SideType;
  const setLoggingOut = useStore((store) => store.setLoggingOut);

  const onClick = async () => {
    logout(side);
  };

  return (
    <Card text="Are you sure you want to logout of this account?">
      <div className="flex gap-3">
        <div className="button primary" onClick={onClick}>
          <p>Logout</p>
        </div>
        <div className="button secondary" onClick={() => setLoggingOut(side, false)}>
          <p>Go back</p>
        </div>
      </div>
    </Card>
  );
}

export default Logout;
