'use client';

import { RiContractLeftLine, RiContractRightLine } from '@remixicon/react';

import { useStore } from '@/store';
import Tooltip from '../Tooltip';

function FlipSync() {
  const syncDirection = useStore((state) => state.syncDirection);
  const flipSyncDirection = useStore((state) => state.flipSyncDirection);

  const Icon = syncDirection === 'right' ? RiContractRightLine : RiContractLeftLine;

  return (
    <Tooltip text="Flip sync direction">
      <Icon className="w-6 h-6 button tertiary plain" onClick={flipSyncDirection} />
    </Tooltip>
  );
}

export default FlipSync;
