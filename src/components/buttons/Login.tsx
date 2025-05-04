'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { Context as SideContext } from '../providers/SideContext';
import type { SideType } from '@/store';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

function LoginButton() {
  const side = useContext(SideContext) as SideType;

  return (
    <Link
      href={`${NEXT_PUBLIC_URL}/api/${side}/auth`}
      className="button primary"
      prefetch={false}
    >
      <p>Login</p>
    </Link>
  );
}

export default LoginButton;
