'use client';

import clsx from 'clsx';

import { useStore } from '@/store';
import SyncButton from './buttons/Sync';

const SyncBar = ({ className }: { className?: string }) => {
  const activeSide = useStore((state) => state.activeSide);
  const setActiveSide = useStore((state) => state.setActiveSide);

  const playlists = useStore((state) => state.playlists);

  return (
    <div className={clsx(className, 'flex lg:hidden gap-3 flex-col')}>
      <div className="flex gap-3">
        <div
          className={clsx(activeSide === 'left' && 'active', 'button tab w-full')}
          onClick={() => setActiveSide('left')}
        >
          Account 1
        </div>
        <div
          className={clsx(activeSide === 'right' && 'active', 'button tab w-full')}
          onClick={() => setActiveSide('right')}
        >
          Account 2
        </div>
      </div>
      <div className="flex justify-between items-center gap-1">
        <p className="flex-1 line-clamp-2 break-words">
          {playlists.left?.name || 'No selection'}
        </p>
        <SyncButton className="h-full" />
        <p className="flex-1 text-right line-clamp-2 break-words">
          {playlists.right?.name || 'No selection'}
        </p>
      </div>
    </div>
  );
};

export default SyncBar;
