'use client';

import { MouseEventHandler, useRef, useState } from 'react';

const Tooltip = ({
  text,
  children,
}: React.PropsWithChildren & {
  text: string;
}) => {
  const [delay, setDelay] = useState<NodeJS.Timeout | null>();

  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    if (tooltipRef.current) {
      setDelay(setTimeout(() => tooltipRef.current?.classList.remove('hidden'), 500));
    }
  };

  const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    if (tooltipRef.current) {
      tooltipRef.current.classList.add('hidden');

      clearTimeout(delay as NodeJS.Timeout);
      setDelay(null);
    }
  };

  return (
    <div className="relative z-50">
      <div ref={contentRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </div>
      <div
        ref={tooltipRef}
        className="px-2 py-1 bg-zinc-800 rounded-lg absolute hidden -translate-x-1/2 left-1/2 drop-shadow-md"
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
