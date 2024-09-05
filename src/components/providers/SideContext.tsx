'use client';

import { createContext } from 'react';
import type { SideType } from '@/store';

export const Context = createContext<SideType | null>(null);

const SideContext = ({
  type,
  children,
}: React.PropsWithChildren & {
  type: SideType;
}) => <Context.Provider value={type}>{children}</Context.Provider>;

export default SideContext;
