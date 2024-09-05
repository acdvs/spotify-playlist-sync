'use client';

import { useContext } from 'react';
import cx from 'classnames';

import { SideType, useStore } from '@/store';
import { Context as SideContext } from '../providers/SideContext';

const ClientSide = ({ children }: React.PropsWithChildren) => {
  const side = useContext(SideContext) as SideType;
  const activeSide = useStore((state) => state.activeSide);

  return (
    <div className={cx('flex flex-1 lg:block', activeSide !== side && 'hidden')}>
      {children}
    </div>
  );
};

export default ClientSide;
