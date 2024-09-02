'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { RiArrowLeftRightLine, RiQuestionLine } from '@remixicon/react';

import Tooltip from './Tooltip';
import Card from './Card';

const Header = () => {
  const [helpActive, showHelp] = useState(false);

  return (
    <div className="mb-10">
      <div className="mb-3 flex gap-5 items-center">
        <h1 className="flex-shrink-0">Spotify Playlist Sync</h1>
        <div className="border-zinc-700 border-b-2 w-full" />
        <Tooltip text="Change sync direction">
          <RiArrowLeftRightLine className="w-6 h-6 button tertiary plain" />
        </Tooltip>
        <Tooltip text={`${helpActive ? 'Hide' : 'Show'} help`}>
          <RiQuestionLine
            className="w-6 h-6 button tertiary plain"
            onClick={() => showHelp((x) => !x)}
          />
        </Tooltip>
      </div>
      <Dialog
        open={helpActive}
        onClose={() => showHelp(false)}
        transition
        className="transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogPanel>
            <Card filled noAlign className="gap-5">
              <DialogTitle className="font-bold">Directions</DialogTitle>
              <p>
                First, log into two different Spotify accounts below. Then, simply select
                a playlist from each account and press the sync button.
              </p>
              <p>
                The playlist on the left will be synced to the playlist on the right. This
                can be flipped with the button in the top right corner.
              </p>
              <div onClick={() => showHelp(false)} className="button primary self-start">
                Got it
              </div>
            </Card>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Header;
