'use client';

import clsx from 'clsx';

import { useStore } from '@/store';
import SyncButton from './buttons/Sync';
import { Button } from './ui/Button';

function SyncBar({ className }: { className?: string }) {
  const { left, right, activeSide, setActiveSide } = useStore();

  return (
    <div className={clsx(className, 'flex lg:hidden gap-3 flex-col')}>
      <div className="flex gap-3">
        <Button
          variant="tab"
          className={clsx(activeSide === 'left' && 'active', 'w-full')}
          onClick={() => setActiveSide('left')}
        >
          {left.displayName || 'Account 1'}
        </Button>
        <Button
          variant="tab"
          className={clsx(activeSide === 'right' && 'active', 'w-full')}
          onClick={() => setActiveSide('right')}
        >
          {right.displayName || 'Account 2'}
        </Button>
      </div>
      <div className="flex justify-between items-center gap-1">
        <p className="flex-1 line-clamp-2 break-words">
          {left.playlist?.name || 'No selection'}
        </p>
        <SyncButton className="h-full" />
        <p className="flex-1 text-right line-clamp-2 break-words">
          {right.playlist?.name || 'No selection'}
        </p>
      </div>
    </div>
  );
}

export default SyncBar;
