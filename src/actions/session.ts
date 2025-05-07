'use server';

import qs from 'querystring';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { type AccessToken as BasicToken } from '@spotify/web-api-ts-sdk';

import { SideType } from '@/store';
import { sfetch } from './fetch';

export type AccessToken = {
  expires_at: Date;
} & BasicToken;

export async function getToken(side: SideType): Promise<AccessToken | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(`token-${side}`);
  const token = cookie && JSON.parse(cookie.value);

  return token;
}

export async function setToken(token: BasicToken, side: SideType) {
  const cookieStore = await cookies();
  const newToken: AccessToken = {
    ...token,
    expires_at: new Date(new Date().getTime() + token.expires_in * 1000),
  };

  cookieStore.set(`token-${side}`, JSON.stringify(newToken), {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: process.env.NEXT_PUBLIC_BASE_PATH || '/',
    secure: true,
  });
}

export async function refreshToken(oldToken: AccessToken, side: SideType) {
  const newToken = await sfetch<BasicToken>(
    'https://accounts.spotify.com/api/token',
    null,
    {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: oldToken.refresh_token,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  setToken(newToken, side);
}

export async function login(side: SideType) {
  redirect(
    'https://accounts.spotify.com/authorize?' +
      qs.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: [
          'user-read-email',
          'user-read-private',
          'playlist-read-private',
          'playlist-modify-public',
          'playlist-modify-private',
        ].join(' '),
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: JSON.stringify({
          for: side,
          secret: process.env.AUTH_STATE_SECRET,
        }),
        show_dialog: true,
      }),
  );
}

export async function logout(side: SideType) {
  const cookieStore = await cookies();
  cookieStore.delete(`token-${side}`);

  redirect('/');
}
