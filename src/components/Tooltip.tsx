'use client';

import { useRef } from 'react';

const SPACING = 5;

const Tooltip = ({
  text,
  className,
  children,
}: React.PropsWithChildren & {
  text: string;
  className?: string;
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      if (tooltipRef.current && contentRef.current) {
        tooltipRef.current.classList.remove('hidden');
        const c = contentRef.current.getBoundingClientRect();
        const tt = tooltipRef.current.getBoundingClientRect();

        let top = c.top - SPACING - tt.height;
        let left = c.left + c.width / 2;

        if (top < 0) {
          top = c.bottom + SPACING;
        }

        if (left - tt.width / 2 < 0) {
          left = 0;
        } else if (left + tt.width / 2 > window.innerWidth) {
          left = window.innerWidth - tt.width / 2;
        }

        tooltipRef.current.style.top = `${top}px`;
        tooltipRef.current.style.left = `${left}px`;
      }
    }, 750);
  };

  const onMouseLeave = () => {
    if (tooltipRef.current) {
      tooltipRef.current.classList.add('hidden');
      clearTimerRef(timerRef);
    }
  };

  return (
    <>
      <div
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={contentRef}
      >
        {children}
      </div>
      <div
        className="absolute hidden px-3 py-2 whitespace-nowrap bg-zinc-800 border-2 border-zinc-700 rounded-lg drop-shadow-md -translate-x-1/2 z-50"
        ref={tooltipRef}
        role="tooltip"
      >
        {text}
      </div>
    </>
  );
};

const clearTimerRef = (timeout: React.MutableRefObject<NodeJS.Timeout | null>) => {
  if (timeout.current) {
    clearTimeout(timeout.current);
  }

  timeout.current = null;
};

export default Tooltip;
