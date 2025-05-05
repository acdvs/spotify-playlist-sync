'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { Context as SideContext } from '../providers/SideContext';
import { Button } from '../ui/Button';
import type { SideType } from '@/store';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

function LoginButton() {
  const side = useContext(SideContext) as SideType;

  return (
    <Button variant="primary" asChild>
      <Link href={`${NEXT_PUBLIC_URL}/api/${side}/auth`} prefetch={false}>
        Login
      </Link>
    </Button>
  );
}

export default LoginButton;
