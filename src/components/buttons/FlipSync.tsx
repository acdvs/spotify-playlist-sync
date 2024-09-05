'use client';

import { useState } from 'react';
import { RiArrowLeftRightLine } from '@remixicon/react';

import { useStore } from '@/store';
import Tooltip from '../Tooltip';
import Dialog from '../Dialog';

const FlipSync = () => {
  const [dialogActive, showDialog] = useState(false);
  const syncDirection = useStore((state) => state.syncDirection);
  const flipSyncDirection = useStore((state) => state.flipSyncDirection);

  const side1 = syncDirection === 'right' ? 'left' : 'right';
  const side2 = syncDirection === 'right' ? 'right' : 'left';

  const onClick = () => {
    flipSyncDirection();
    showDialog(true);
  };

  return (
    <>
      <Tooltip text="Change sync direction">
        <RiArrowLeftRightLine
          className="w-6 h-6 button tertiary plain"
          onClick={onClick}
        />
      </Tooltip>
      <Dialog active={dialogActive} show={showDialog} title="Sync flipped">
        <p>
          Sync direction changed to{' '}
          <strong>
            {side1} to {side2}
          </strong>
          .
        </p>
      </Dialog>
    </>
  );
};

export default FlipSync;
