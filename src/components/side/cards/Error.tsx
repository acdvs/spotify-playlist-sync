'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { logout } from '@/actions/session';
import { SideContext } from '@/components/providers/SideContext';
import { Button } from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import type { SideType } from '@/store';

function ErrorCard() {
  const side = useContext(SideContext) as SideType;
  const queryClient = useQueryClient();

  const retry = () => {
    queryClient.refetchQueries({ queryKey: [side] });
  };

  return (
    <Card text="Unable to get profile data.">
      <div className="flex gap-3">
        <Button variant="primary" onClick={retry}>
          Retry
        </Button>
        <Button variant="secondary" onClick={() => logout(side)}>
          Logout
        </Button>
      </div>
    </Card>
  );
}

export default ErrorCard;
