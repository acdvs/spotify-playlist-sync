'use client';

import { RiArrowLeftRightLine, RiQuestionLine, RiQuestionMark } from '@remixicon/react';
import { useState } from 'react';
import Tooltip from './Tooltip';

const Header = () => {
  const [helpShown, showHelp] = useState(false);

  return (
    <div className="mb-10">
      <div className="mb-3 flex gap-5 items-center">
        <h1 className="flex-shrink-0">Spotify Playlist Sync</h1>
        <div className="border-zinc-700 border-b-2 w-full" />
        <Tooltip text="Change sync direction">
          <RiArrowLeftRightLine className="fill-zinc-500 hover:fill-zinc-400 hover:cursor-pointer transition-colors" />
        </Tooltip>
        <Tooltip text={`${helpShown ? 'Hide' : 'Show'} help`}>
          <RiQuestionLine
            className="fill-zinc-500 hover:fill-zinc-400 hover:cursor-pointer transition-colors"
            onClick={() => showHelp((x) => !x)}
          />
        </Tooltip>
      </div>
      {helpShown && (
        <p>
          First, log into two different Spotify accounts below. Then, simply select a
          playlist from each account and press the sync button. The playlist on the left
          will be synced to the playlist on the right.
        </p>
      )}
    </div>
  );
};

export default Header;
