'use client';

import clsx from 'clsx';

import { useStore } from '@/store';
import SyncButton from './buttons/Sync';
import { Button } from './ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { UserProfile } from '@spotify/web-api-ts-sdk';

function SyncBar({ className }: { className?: string }) {
  const { playlists, activeSide, setActiveSide } = useStore();

  const queryClient = useQueryClient();
  const profileLeft = queryClient.getQueryData<UserProfile>(['left', 'profile']);
  const profileRight = queryClient.getQueryData<UserProfile>(['right', 'profile']);

  return (
    <div className={clsx(className, 'flex lg:hidden gap-3 flex-col')}>
      <div className="flex gap-3">
        <Button
          variant="tab"
          className={clsx(activeSide === 'left' && 'active', 'w-full')}
          onClick={() => setActiveSide('left')}
        >
          {profileLeft?.display_name || 'Account 1'}
        </Button>
        <Button
          variant="tab"
          className={clsx(activeSide === 'right' && 'active', 'w-full')}
          onClick={() => setActiveSide('right')}
        >
          {profileRight?.display_name || 'Account 2'}
        </Button>
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
}

export default SyncBar;
