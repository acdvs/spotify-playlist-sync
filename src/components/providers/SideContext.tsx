'use client';

import { createContext } from 'react';
import type { SideType } from '@/store';

export const Context = createContext<SideType | null>(null);

function SideContext({ type, children }: { type: SideType; children: React.ReactNode }) {
  return <Context.Provider value={type}>{children}</Context.Provider>;
}

export default SideContext;
