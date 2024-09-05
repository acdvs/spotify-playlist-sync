'use client';

import cx from 'classnames';

import { useStore } from '@/store';
import SyncButton from './buttons/Sync';

const SyncBar = ({ className }: { className?: string }) => {
  const activeSide = useStore((state) => state.activeSide);
  const setActiveSide = useStore((state) => state.setActiveSide);

  const playlists = useStore((state) => state.playlists);

  return (
    <div className={cx(className, 'flex lg:hidden gap-3 flex-col')}>
      <div className="flex gap-3">
        <div
          className={cx(activeSide === 'left' && 'active', 'button tab w-full')}
          onClick={() => setActiveSide('left')}
        >
          Account 1
        </div>
        <div
          className={cx(activeSide === 'right' && 'active', 'button tab w-full')}
          onClick={() => setActiveSide('right')}
        >
          Account 2
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <p className="flex-1">{playlists.left?.name || 'No selection'}</p>
        <SyncButton className="h-full" />
        <p className="flex-1 text-right">{playlists.right?.name || 'No selection'}</p>
      </div>
    </div>
  );
};

export default SyncBar;
