import axios from 'axios';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccessToken as BasicToken } from '@spotify/web-api-ts-sdk';

import { AuthState } from '../[side]/auth/route';

const redirectPath = process.env.NEXT_PUBLIC_BASE_PATH || '/';

export interface AccessToken extends BasicToken {
  refresh_token: string;
  expires_at: number;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  let state = req.nextUrl.searchParams.get('state');
  let side: string;

  if (!code || !state) {
    redirect(redirectPath);
  }

  try {
    const parsedState: AuthState = JSON.parse(state);
    side = parsedState.for;

    if (parsedState.secret !== process.env.AUTH_STATE_SECRET) {
      throw Error;
    }
  } catch {
    redirect(redirectPath);
  }

  try {
    const tokenRes = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET,
            ).toString('base64'),
        },
      },
    );

    tokenRes.data.expires_at = new Date();
    tokenRes.data.expires_at.setSeconds(
      tokenRes.data.expires_at.getSeconds() + tokenRes.data.expires_in,
    );

    cookies().set(`token-${side}`, JSON.stringify(tokenRes.data), {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      secure: true,
    });
  } finally {
    redirect(redirectPath);
  }
}
