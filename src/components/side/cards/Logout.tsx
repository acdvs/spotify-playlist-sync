'use client';

import { useContext } from 'react';

import { logout } from '@/actions/session';
import { useStore, SideType } from '@/store';
import { SideContext } from '@/components/providers/SideContext';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';

function LogoutCard() {
  const side = useContext(SideContext) as SideType;
  const { setPlaylist, setLoggingOut } = useStore();

  const onClick = async () => {
    setPlaylist(side);
    logout(side);
  };

  return (
    <Card text="Are you sure you want to logout of this account?">
      <div className="flex gap-3">
        <Button variant="primary" onClick={onClick}>
          Logout
        </Button>
        <Button variant="secondary" onClick={() => setLoggingOut(side, false)}>
          Go back
        </Button>
      </div>
    </Card>
  );
}

export default LogoutCard;
