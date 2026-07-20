'use client';

import { RiLogoutBoxRLine } from '@remixicon/react';
import { useContext } from 'react';

import { type SideType, useStore } from '@/store';
import { SideContext } from '../providers/SideContext';
import { Button } from '../ui/Button';
import Tooltip from '../ui/Tooltip';

function LogoutButton() {
  const side = useContext(SideContext) as SideType;
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
