import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccessToken as BasicToken } from '@spotify/web-api-ts-sdk';

import { AuthState } from '../[side]/auth/route';
import { _fetch } from '@/actions/server';

const redirectPath = process.env.NEXT_PUBLIC_BASE_PATH || '/';

export interface AccessToken extends BasicToken {
  refresh_token: string;
  expires_at: Date;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  let state = req.nextUrl.searchParams.get('state');
  let side: string;

  if (!code || !state) {
    redirect(redirectPath);
  }

  const parsedState: AuthState = JSON.parse(state);
  side = parsedState.for;

  if (parsedState.secret !== process.env.AUTH_STATE_SECRET) {
    redirect(redirectPath);
  }

  try {
    const token = await _fetch<AccessToken>('https://accounts.spotify.com/api/token', {
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
      ...tokenRes.data,
      expires_at: new Date(),
    };

    newToken.expires_at.setSeconds(
      newToken.expires_at.getSeconds() + newToken.expires_in,
    );

    cookies().set(`token-${side}`, JSON.stringify(newToken), {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      secure: true,
    });
  } finally {
    redirect(redirectPath);
  }
}
