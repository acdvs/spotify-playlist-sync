'use client';

import { useState } from 'react';
import { RiQuestionLine } from '@remixicon/react';

import Tooltip from '../Tooltip';
import Dialog from '../Dialog';

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
      <Dialog active={helpActive} show={showHelp} title="Directions">
        <p>
          Log into two different Spotify accounts, select a playlist from each account,
          and press the sync button.
        </p>
        <p>
          The first playlist will be synced to the second playlist. This can be flipped
          with the button in the top right corner.
        </p>
      </Dialog>
    </>
  );
};

export default ShowHelp;
