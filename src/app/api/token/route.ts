import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccessToken as BasicToken } from '@spotify/web-api-ts-sdk';

import { AuthState } from '../[side]/auth/route';
import { sfetch } from '@/actions/fetch';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/';

export interface AccessToken extends BasicToken {
  refresh_token: string;
  expires_at: Date;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  let state = req.nextUrl.searchParams.get('state');
  let side: string;

  if (!code || !state) {
    redirect(BASE_PATH);
  }

  const parsedState: AuthState = JSON.parse(state);
  side = parsedState.for;

  if (parsedState.secret !== process.env.AUTH_STATE_SECRET) {
    redirect(BASE_PATH);
  }

  const cookieStore = await cookies();

  const token = await sfetch<AccessToken>('https://accounts.spotify.com/api/token', {
    method: 'POST',
    params: {
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    auth: 'basic',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const newToken = {
    ...token,
    expires_at: new Date().setSeconds(new Date().getSeconds() + token.expires_in),
  };

  cookieStore.set(`token-${side}`, JSON.stringify(newToken), {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: BASE_PATH,
    secure: true,
  });

  redirect(BASE_PATH);
}
