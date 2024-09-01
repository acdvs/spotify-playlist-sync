'use client';

import { useRef, useState } from 'react';
import { RiArrowLeftRightLine, RiQuestionLine } from '@remixicon/react';

import Tooltip from './Tooltip';

const Header = () => {
  const [helpActive, showHelp] = useState(false);
  const helpRef = useRef<HTMLParagraphElement>(null);

  const helpStyles = {
    marginTop: helpActive ? '0px' : `calc(-${helpRef.current?.clientHeight}px - 0.75rem)`,
    opacity: helpActive ? 1 : 0,
  };

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
      <p className="transition-all" style={helpStyles} ref={helpRef}>
        First, log into two different Spotify accounts below. Then, simply select a
        playlist from each account and press the sync button. The playlist on the left
        will be synced to the playlist on the right.
      </p>
    </div>
  );
};

export default Header;
