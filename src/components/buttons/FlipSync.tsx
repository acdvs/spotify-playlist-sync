'use client';

import { RiContractLeftLine, RiContractRightLine } from '@remixicon/react';

import { useStore } from '@/store';
import Tooltip from '../ui/Tooltip';
import { Button } from '../ui/Button';

function FlipSync() {
  const { syncDir, flipSyncDirection } = useStore();

  const Icon = syncDir === 'right' ? RiContractRightLine : RiContractLeftLine;

  return (
    <Tooltip text="Flip sync direction" asChild>
      <Button>
        <Icon className="size-7" onClick={flipSyncDirection} />
      </Button>
    </Tooltip>
  );
}

export default FlipSync;
