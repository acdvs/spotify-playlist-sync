'use server';

import { cookies } from 'next/headers';

import { SideType } from '@/store';
import { AccessToken } from '@/app/api/token/route';
import spotifyFetch from './server';

export async function getToken(side: SideType): Promise<AccessToken | undefined> {
  const cookieStore = cookies();
  const cookie = cookieStore.get(`token-${side}`);
  const token = cookie && JSON.parse(cookie.value);

  return token;
}

export async function refreshToken(accessToken: AccessToken) {
  if (new Date() > accessToken.expires_at) {
    try {
      const token = await spotifyFetch<AccessToken>(
        'https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: accessToken.refresh_token,
          }),
          auth: 'basic',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const newToken = {
        ...token,
        refresh_token: accessToken.refresh_token,
        expires_at: new Date().setSeconds(new Date().getSeconds() + token.expires_in),
      };

      return newToken;
    } catch (err) {
      throw err;
    }
  }

  return null;
}
