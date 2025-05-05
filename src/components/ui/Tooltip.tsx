'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={clsx(
        'z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  );
}

function Tooltip({
  text,
  ...props
}: {
  text: string;
} & React.ComponentProps<typeof TooltipTrigger>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root>
        <TooltipTrigger {...props} />
        <TooltipContent>{text}</TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

export default Tooltip;
