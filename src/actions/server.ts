'use server';

import { cookies } from 'next/headers';
import qs from 'querystring';

import type { SideType } from '@/store';
import { AccessToken } from '@/app/api/token/route';

type FetchOptions = RequestInit & {
  params?: Record<string, any>;
  auth?: 'basic' | SideType;
};

export async function _fetch<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  let newEndpoint = endpoint.startsWith('/')
    ? `${process.env.NEXT_PUBLIC_URL}${endpoint}`
    : endpoint;

  if (options?.params) {
    newEndpoint += '?' + qs.stringify(options.params);
    delete options.params;
  }

  if (options?.auth) {
    if (options.auth === 'basic') {
      options.headers = Object.assign(options.headers || {}, {
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      });
    }

    if (options.auth === 'left' || options.auth === 'right') {
      const token = (await getToken(options.auth)) as AccessToken;
      options.headers = Object.assign(options.headers || {}, {
        Authorization: 'Bearer ' + token.access_token,
      });
    }
  }

  console.log(newEndpoint);

  const res = await fetch(newEndpoint, options);

  if (res.ok) {
    const data: T = await res.json();
    return data;
  }

  throw res;
}

export async function getToken(side: SideType): Promise<AccessToken | undefined> {
  const cookieStore = cookies();
  const cookie = cookieStore.get(`token-${side}`);
  const token = cookie && JSON.parse(cookie.value);

  return token;
}
