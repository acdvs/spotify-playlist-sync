'use client';

import { useContext } from 'react';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { RiRefreshLine } from '@remixicon/react';
import clsx from 'clsx';

import type { SideType } from '@/store';
import { Context as SideContext } from '../providers/SideContext';
import Tooltip from '../Tooltip';

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
    <Tooltip text="Refresh">
      <RiRefreshLine
        className={clsx(
          'w-10 h-10 button tertiary',
          isRefreshing && 'disabled animate-spin',
        )}
        onClick={refetchAccount}
      />
    </Tooltip>
  );
}

export default RefreshButton;
