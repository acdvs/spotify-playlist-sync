'use server';

import { cookies } from 'next/headers';
import axios from 'axios';

import type { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

export interface PrerequestError {
  code: number;
  error: string;
}

export async function prerequest(side: SideType) {
  const cookie = cookies().get(`token-${side}`);
  const token = cookie && JSON.parse(cookie.value);

  if (!token || !token.expires_at || !token.refresh_token) {
    return Response.json({ status: 401, error: 'Missing token cookie' });
  }

  const expiresAt = new Date(token.expires_at);

  if (expiresAt < new Date()) {
    try {
      const tokenRes = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'refresh_token',
          refresh_token: token.refresh_token,
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

      tokenRes.data.refresh_token = token.refresh_token;
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

      return Response.json(tokenRes);
    } catch (err) {
      return Response.json({ status: 500, error: err });
    }
  }

  return token;
}
