'use client';

import { RiQuestionLine, RiQuestionMark } from '@remixicon/react';
import { useState } from 'react';

const Header = () => {
  const [helpShown, showHelp] = useState(false);

  return (
    <div className="mb-10">
      <div className="mb-3 flex gap-5 items-center">
        <h1 className="flex-shrink-0">Spotify Playlist Sync</h1>
        <div className="border-zinc-700 border-b-2 w-full" />
        <div className="w-10" title={`${helpShown ? 'Hide' : 'Show'} help`}>
          <RiQuestionLine
            className="fill-zinc-500 hover:fill-zinc-400 hover:cursor-pointer transition-colors"
            onClick={() => showHelp((x) => !x)}
          />
        </div>
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
