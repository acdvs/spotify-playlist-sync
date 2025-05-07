'use server';

import qs from 'querystring';
import { type AccessToken as BasicToken } from '@spotify/web-api-ts-sdk';

import { type SideType } from '@/store';
import { AccessToken, getToken, refreshToken } from './session';

type FetchOptions = RequestInit & {
  params?: Record<string, any>;
  side?: SideType;
};

export const sfetch = async <T>(
  endpoint: string,
  side: SideType | null,
  options?: FetchOptions,
): Promise<T> => {
  options = options || {};

  if (options?.params) {
    endpoint += '?' + qs.stringify(options.params);
    delete options.params;
  }

  if (!side) {
    options.headers = Object.assign({}, options.headers, {
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET,
        ).toString('base64'),
    });
  } else {
    const token = (await getToken(side)) as AccessToken;

    options.headers = Object.assign(options.headers || {}, {
      Authorization: 'Bearer ' + token.access_token,
    });
  }

  const res = await fetch(endpoint, options);

  if (res.ok) {
    const data: T = await res.json();
    return data;
  } else if (res.status === 401 && side) {
    const token = (await getToken(side)) as AccessToken;

    if (new Date() > new Date(token.expires_at)) {
      await refreshToken(token, side);
    }
  }

  throw res;
};
