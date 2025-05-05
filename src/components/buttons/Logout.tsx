'use client';

import { useContext } from 'react';
import { RiLogoutBoxRLine } from '@remixicon/react';

import { useStore, SideType } from '@/store';
import { Context } from '../providers/SideContext';
import Tooltip from '../Tooltip';
import { Button } from '../ui/Button';

function LogoutButton() {
  const side = useContext(Context) as SideType;
  const setLoggingOut = useStore((state) => state.setLoggingOut);

  const showConfirm: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLoggingOut(side, true);
  };

  return (
    <Tooltip className="-mr-3" text="Logout" asChild>
      <Button onClick={showConfirm}>
        <RiLogoutBoxRLine className="size-6" />
      </Button>
    </Tooltip>
  );
}

export default LogoutButton;
