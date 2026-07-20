import type { AccessToken as BasicToken } from '@spotify/web-api-ts-sdk';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

import { sfetch } from '@/actions/fetch';
import { setToken } from '@/actions/session';
import type { SideType } from '@/store';

type AuthState = {
  for: SideType;
  secret: string;
};

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');

  if (!code || !state) {
    redirect('/');
  }

  const parsedState: AuthState = JSON.parse(state);
  const side: SideType = parsedState.for;

  if (parsedState.secret !== process.env.AUTH_STATE_SECRET) {
    redirect('/');
  }

  const newToken = await sfetch<BasicToken>(
    'https://accounts.spotify.com/api/token',
    null,
    {
      method: 'POST',
      params: {
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI || '',
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  await setToken(newToken, side);
  redirect('/');
}
