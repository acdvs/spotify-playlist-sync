'use client';

import { useRef, useState } from 'react';
import { RiArrowLeftRightLine, RiQuestionLine } from '@remixicon/react';

import Tooltip from './Tooltip';

const Header = () => {
  const [helpActive, showHelp] = useState(false);
  const helpRef = useRef<HTMLParagraphElement>(null);

  const helpStyles = {
    marginTop: helpActive ? '0px' : `-${helpRef.current?.clientHeight}px`,
    opacity: helpActive ? 1 : 0,
  };

  return (
    <div className="mb-10">
      <div className="mb-3 flex gap-5 items-center">
        <h1 className="flex-shrink-0">Spotify Playlist Sync</h1>
        <div className="border-zinc-700 border-b-2 w-full" />
        <Tooltip text="Change sync direction">
          <RiArrowLeftRightLine className="w-10 h-10 button tertiary" />
        </Tooltip>
        <Tooltip text={`${helpActive ? 'Hide' : 'Show'} help`}>
          <RiQuestionLine
            className="w-10 h-10 button tertiary"
            onClick={() => showHelp((x) => !x)}
          />
        </Tooltip>
      </div>
      {/* <Transition
        show={helpShown}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        enter="transition-opacity"
        as={Fragment}
      > */}
      <p className="transition-all" style={helpStyles} ref={helpRef}>
        First, log into two different Spotify accounts below. Then, simply select a
        playlist from each account and press the sync button. The playlist on the left
        will be synced to the playlist on the right.
      </p>
      {/* </Transition> */}
    </div>
  );
};

export default Header;
