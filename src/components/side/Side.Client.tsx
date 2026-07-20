'use client';

import clsx from 'clsx';
import { useContext } from 'react';

import { type SideType, useStore } from '@/store';
import { SideContext } from '../providers/SideContext';

function ClientSide({ children }: { children: React.ReactNode }) {
  const side = useContext(SideContext) as SideType;
  const activeSide = useStore((state) => state.activeSide);

  return (
    <div
      className={clsx('flex flex-1 lg:block', activeSide !== side && 'hidden')}
    >
      {children}
    </div>
  );
}

export default ClientSide;
