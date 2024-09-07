'use server';

import qs from 'querystring';

import type { SideType } from '@/store';
import { AccessToken } from '@/app/api/token/route';
import { getToken } from './session';

type FetchOptions = RequestInit & {
  params?: Record<string, any>;
  auth?: 'basic' | SideType;
};

const apiFetch = async <T>(endpoint: string, options?: FetchOptions): Promise<T> => {
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

  const res = await fetch(newEndpoint, options);

  if (res.ok) {
    const data: T = await res.json();
    return data;
  }

  throw res;
};

export default apiFetch;
