'use client';

import { useContext } from 'react';

import { type SideType } from '@/store';
import { login } from '@/actions/session';
import { SideContext } from '../providers/SideContext';
import { Button } from '../ui/Button';

function LoginButton() {
  const side = useContext(SideContext) as SideType;

  return (
    <Button variant="primary" onClick={() => login(side)}>
      Login
    </Button>
  );
}

export default LoginButton;
