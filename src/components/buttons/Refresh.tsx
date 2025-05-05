'use client';

import { useContext } from 'react';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { RiRefreshLine } from '@remixicon/react';
import clsx from 'clsx';

import type { SideType } from '@/store';
import { Context as SideContext } from '../providers/SideContext';
import Tooltip from '../ui/Tooltip';
import { Button } from '../ui/Button';

function RefreshButton() {
  const side = useContext(SideContext) as SideType;

  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: [side, 'playlists'] }) > 0;

  const refetch = () => {
    queryClient.refetchQueries({ queryKey: [side, 'playlists'] });
  };

  return (
    <Tooltip text="Refresh" asChild>
      <Button disabled={isFetching} onClick={refetch}>
        <RiRefreshLine className={clsx('size-6', isFetching && 'animate-spin')} />
      </Button>
    </Tooltip>
  );
}

export default RefreshButton;
