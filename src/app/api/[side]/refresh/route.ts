import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import axios from 'axios';

import type { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  const cookie = cookies().get(`token-${params.side}`);
  const token = cookie && JSON.parse(cookie.value);

  if (!token || !token.expires_at || !token.refresh_token) {
    return Response.json({ status: 401, error: 'Missing token cookie' });
  }

  try {
    const tokenRes = await axios.post<AccessToken>(
      'https://accounts.spotify.com/api/token',
      {
        refresh_token: token.refresh_token,
        grant_type: 'refresh_token',
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

    let expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + tokenRes.data.expires_in);
    tokenRes.data.expires_at = expiresAt.getTime();

    cookies().set(`token-${params.side}`, JSON.stringify(tokenRes.data), {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      secure: true,
    });

    return Response.json(tokenRes);
  } catch (err) {
    return Response.json(err);
  }
}
