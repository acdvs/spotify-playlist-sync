'use client';

import { RiContractLeftLine, RiContractRightLine } from '@remixicon/react';

import { useStore } from '@/store';
import Tooltip from '../Tooltip';

function FlipSync() {
  const syncRight = useStore((state) => state.syncRight);
  const flipSyncDirection = useStore((state) => state.flipSyncDirection);

  const Icon = syncRight ? RiContractRightLine : RiContractLeftLine;

  return (
    <Tooltip text="Flip sync direction">
      <Icon className="w-6 h-6 button tertiary plain" onClick={flipSyncDirection} />
    </Tooltip>
  );
}

export default FlipSync;
