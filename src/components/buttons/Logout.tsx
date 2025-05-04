'use client';

import { useContext } from 'react';
import { RiLogoutBoxRLine } from '@remixicon/react';

import { useStore, SideType } from '@/store';
import { Context } from '../providers/SideContext';
import Tooltip from '../Tooltip';

function LogoutButton() {
  const side = useContext(Context) as SideType;
  const setLoggingOut = useStore((state) => state.setLoggingOut);

  const showConfirm = () => {
    setLoggingOut(side, true);
  };

  return (
    <Tooltip className="-mr-3" text="Logout">
      <div onClick={showConfirm}>
        <RiLogoutBoxRLine className="w-10 h-10 button tertiary" />
      </div>
    </Tooltip>
  );
}

export default LogoutButton;
