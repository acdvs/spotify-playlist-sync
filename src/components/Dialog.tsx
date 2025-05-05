'use client';

import {
  Dialog as HUIDialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

import Card from './Card';
import { Button } from './ui/Button';

function Dialog({
  active,
  show,
  title,
  children,
}: {
  active: boolean;
  title: string;
  children: React.ReactNode;
  show: (x: boolean) => void;
}) {
  return (
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
            <Button variant="primary" onClick={() => show(false)} className="self-center">
              Got it
            </Button>
          </Card>
        </DialogPanel>
      </div>
    </HUIDialog>
  );
}

export default Dialog;
