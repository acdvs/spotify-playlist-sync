'use client';

import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { SideType, useStore } from '@/store';
import { SideContext } from '@/components/providers/SideContext';
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
  }, [profileQuery.data?.display_name]);

  return profileQuery;
};

export default useProfile;
