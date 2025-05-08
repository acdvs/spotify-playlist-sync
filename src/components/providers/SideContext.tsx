'use client';

import { createContext } from 'react';
import type { SideType } from '@/store';

export const SideContext = createContext<SideType | null>(null);

function SideContextProvider({
  type,
  children,
}: {
  type: SideType;
  children: React.ReactNode;
}) {
  return <SideContext value={type}>{children}</SideContext>;
}

export default SideContextProvider;
