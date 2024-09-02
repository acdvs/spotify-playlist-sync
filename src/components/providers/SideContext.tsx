'use client';

import { createContext } from 'react';
import type { SideType } from '@/store';

export const Context = createContext<SideType | null>(null);

const SideContext = ({
  side,
  children,
}: React.PropsWithChildren & {
  side: SideType;
}) => <Context.Provider value={side}>{children}</Context.Provider>;

export default SideContext;
