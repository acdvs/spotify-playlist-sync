'use client';

import { MouseEventHandler, useRef, useState } from 'react';
import cx from 'classnames';

const Tooltip = ({
  text,
  className,
  children,
}: React.PropsWithChildren & {
  text: string;
  className?: string;
}) => {
  const [delay, setDelay] = useState<NodeJS.Timeout | null>();

  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    if (tooltipRef.current) {
      setDelay(setTimeout(() => tooltipRef.current?.classList.remove('hidden'), 750));
    }
  };

  const onMouseLeave = () => {
    if (tooltipRef.current) {
      tooltipRef.current.classList.add('hidden');

      clearTimeout(delay as NodeJS.Timeout);
      setDelay(null);
    }
  };

  return (
    <div className={cx(className, 'relative')}>
      <div ref={contentRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </div>
      <div
        ref={tooltipRef}
        className="px-3 py-2 whitespace-nowrap bg-zinc-800 rounded-lg hidden absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full drop-shadow-md z-50"
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
