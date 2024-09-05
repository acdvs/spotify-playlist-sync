'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { RiQuestionLine } from '@remixicon/react';

import Card from '../Card';
import Tooltip from '../Tooltip';

const ShowHelp = () => {
  const [helpActive, showHelp] = useState(false);

  return (
    <>
      <Tooltip text={`${helpActive ? 'Hide' : 'Show'} help`}>
        <RiQuestionLine
          className="w-6 h-6 button tertiary plain"
          onClick={() => showHelp((x) => !x)}
        />
      </Tooltip>
      <Dialog
        open={helpActive}
        onClose={() => showHelp(false)}
        transition
        className="transition duration-300 ease-out data-[closed]:opacity-0 z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="w-96 max-w-[95vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogPanel>
            <Card filled noAlign className="gap-5 p-5">
              <DialogTitle className="font-bold">Directions</DialogTitle>
              <p>
                Log into two different Spotify accounts, select a playlist from each
                account, and press the sync button.
              </p>
              <p>
                The first playlist will be synced to the second playlist. This can be
                flipped with the button in the top right corner.
              </p>
              <div onClick={() => showHelp(false)} className="button primary self-center">
                Got it
              </div>
            </Card>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ShowHelp;
