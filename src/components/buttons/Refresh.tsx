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
  const isRefreshing = useIsFetching({ queryKey: [side] }) > 0;

  const refetchAccount = () => {
    if (!isRefreshing) {
      queryClient.refetchQueries({ queryKey: [side] });
    }
  };

  return (
    <Tooltip text="Refresh" asChild>
      <Button disabled={isRefreshing} onClick={refetchAccount}>
        <RiRefreshLine className={clsx('size-6', isRefreshing && 'animate-spin')} />
      </Button>
    </Tooltip>
  );
}

export default RefreshButton;
