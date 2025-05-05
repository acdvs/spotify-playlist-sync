'use client';

import { useState } from 'react';
import { RiGithubFill, RiQuestionLine } from '@remixicon/react';

import Tooltip from '../ui/Tooltip';
import Dialog from '../ui/Dialog';
import { Button } from '../ui/Button';

function ShowHelp() {
  const [helpActive, showHelp] = useState(false);

  return (
    <>
      <Tooltip text="Show help" asChild>
        <Button>
          <RiQuestionLine className="size-6" onClick={() => showHelp((x) => !x)} />
        </Button>
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
        <Button asChild>
          <a
            href="https://github.com/acdvs/spotify-playlist-sync"
            target="_blank"
            className="mx-auto"
            title="View on GitHub"
          >
            <RiGithubFill />
          </a>
        </Button>
      </Dialog>
    </>
  );
}

export default ShowHelp;
