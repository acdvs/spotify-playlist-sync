'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import querystring from 'querystring';

import { SideType } from '@/store';
import { AccessToken } from '@/app/api/token/route';
import { sfetch } from './fetch';

export async function getToken(side: SideType): Promise<AccessToken | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(`token-${side}`);
  const token = cookie && JSON.parse(cookie.value);

  return token;
}

export async function refreshToken(accessToken: AccessToken) {
  if (new Date() > accessToken.expires_at) {
    try {
      const token = await sfetch<AccessToken>('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: accessToken.refresh_token,
        }),
        auth: 'basic',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

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

export async function login(side: SideType) {
  redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
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
