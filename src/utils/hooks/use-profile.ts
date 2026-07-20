'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { SideContext } from '@/components/providers/SideContext';
import { type SideType, useStore } from '@/store';
import { getProfile } from '../spotify';

const useProfile = () => {
  const side = useContext(SideContext) as SideType;
  const { setDisplayName } = useStore();

  const profileQuery = useQuery({
    queryKey: [side, 'profile'],
    queryFn: () => getProfile(side),
  });

  useEffect(() => {
    setDisplayName(side, profileQuery.data?.display_name);
  }, [side, profileQuery.data?.display_name, setDisplayName]);

  return profileQuery;
};

export default useProfile;
