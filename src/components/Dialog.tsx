'use client';

import {
  Dialog as HUIDialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import Card from './Card';

type Props = React.PropsWithChildren & {
  active: boolean;
  show: (x: boolean) => void;
  title: string;
};

const Dialog = ({ active, show, title, children }: Props) => (
  <HUIDialog
    open={active}
    onClose={() => show(false)}
    transition
    className="transition duration-300 ease-out data-[closed]:opacity-0"
  >
    <DialogBackdrop className="fixed inset-0 bg-black/70" />
    <div className="w-96 max-w-[95vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <DialogPanel>
        <Card filled noAlign className="gap-5 p-5">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          {children}
          <div onClick={() => show(false)} className="button primary self-center">
            Got it
          </div>
        </Card>
      </DialogPanel>
    </div>
  </HUIDialog>
);

export default Dialog;
