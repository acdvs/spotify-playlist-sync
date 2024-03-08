'use server';

import { cookies } from 'next/headers';

import type { SideType } from '@/store';
import { AccessToken } from '@/app/api/token/route';

export async function getToken(side: SideType) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(`token-${side}`);
  const token = cookie && (JSON.parse(cookie.value) as AccessToken);

  return token;
}
