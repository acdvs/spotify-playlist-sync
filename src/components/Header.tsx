'use client';

import { RiArrowLeftRightLine } from '@remixicon/react';

import Tooltip from './Tooltip';
import ShowHelp from './buttons/ShowHelp';

const Header = () => {

  return (
    <>
      <div className="flex gap-5 items-center">
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
        <ShowHelp />
      </div>
    </>
  );
};

export default Header;
