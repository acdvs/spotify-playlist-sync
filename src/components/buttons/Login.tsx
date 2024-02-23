'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { Context as SideContext } from '../providers/SideContext';
import type { SideType } from '@/store';

const LoginButton = () => {
  const side = useContext(SideContext) as SideType;

  return (
    <Link href={`/api/${side}/auth`} className="button primary">
      <p>Login</p>
    </Link>
  );
};

export default LoginButton;
