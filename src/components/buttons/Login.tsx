'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { Context as SideContext } from '../providers/SideContext';
import type { SideType } from '@/store';

const HOST = process.env.NEXT_PUBLIC_HOST;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

const LoginButton = () => {
  const side = useContext(SideContext) as SideType;

  return (
    <Link
      href={`${HOST}${BASE_PATH}/api/${side}/auth`}
      className="button primary"
      prefetch={false}
    >
      <p>Login</p>
    </Link>
  );
};

export default LoginButton;
