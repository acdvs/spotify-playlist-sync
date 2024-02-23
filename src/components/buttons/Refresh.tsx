'use client';

import { useContext } from 'react';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { RiRefreshLine } from '@remixicon/react';
import cx from 'classnames';

import { Context as SideContext } from '../providers/SideContext';
import Tooltip from '../Tooltip';
import type { SideType } from '@/store';

const RefreshButton = () => {
  const side = useContext(SideContext) as SideType;
  const queryClient = useQueryClient();
  const isRefreshing = useIsFetching({ queryKey: [side] }) > 0;

  const refetchAccount = () => {
    queryClient.refetchQueries({ queryKey: [side] });
  };

  return (
    <Tooltip text="Refresh">
      <RiRefreshLine
        className={cx(
          'w-10 h-10 button tertiary',
          isRefreshing && 'disabled animate-spin',
        )}
        onClick={!isRefreshing ? refetchAccount : undefined}
      />
    </Tooltip>
  );
};

export default RefreshButton;
