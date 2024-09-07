import { NextResponse, NextRequest } from 'next/server';

import { _fetch } from './actions/server';
import { AccessToken } from './app/api/token/route';

export const config = {
  matcher: '/api/:side/(playlists?|profile)',
};

export async function middleware(request: NextRequest) {
  const side = request.nextUrl.pathname.split('/')[2];
  const tokenCookie = request.cookies.get(`token-${side}`);

  if (!tokenCookie) {
    return Response.json({ status: 403, message: 'Not logged in' });
  }

  try {
    const response = NextResponse.next();
    const parsedCookie = JSON.parse(tokenCookie.value);
    const newToken = await refreshToken(parsedCookie);

    if (newToken) {
      response.cookies.set(`token-${side}`, JSON.stringify(newToken), {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        secure: true,
      });
    }

    return response;
  } catch (err) {
    return Response.json({ status: 500, message: err });
  }
}

async function refreshToken(accessToken: AccessToken) {
  if (new Date() > accessToken.expires_at) {

    try {
      const token = await _fetch<AccessToken>('https://accounts.spotify.com/api/token', {
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
