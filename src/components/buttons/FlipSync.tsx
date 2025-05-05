'use client';

import { RiContractLeftLine, RiContractRightLine } from '@remixicon/react';

import { useStore } from '@/store';
import Tooltip from '../Tooltip';
import { Button } from '../ui/Button';

function FlipSync() {
  const syncRight = useStore((state) => state.syncRight);
  const flipSyncDirection = useStore((state) => state.flipSyncDirection);

  const Icon = syncRight ? RiContractRightLine : RiContractLeftLine;

  return (
    <Tooltip text="Flip sync direction" asChild>
      <Button>
        <Icon className="size-7" onClick={flipSyncDirection} />
      </Button>
    </Tooltip>
  );
}

export default FlipSync;
