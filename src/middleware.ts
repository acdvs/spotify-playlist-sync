import { NextResponse, NextRequest } from 'next/server';

import { AccessToken } from './app/api/token/route';
import { _fetch } from './actions/server';
import { SideType } from './store';

export const config = {
  matcher: '/api/:side/(playlists?|profile)',
};

export async function middleware(request: NextRequest) {
  const side = request.nextUrl.pathname.split('/')[2];
  const tokenCookie = request.cookies.get(`token-${side}`);

  const response = NextResponse.next();

  if (!tokenCookie) {
    console.log('No token found');
    return response;
  }

  try {
    const parsedCookie = JSON.parse(tokenCookie.value);
    const newAccessToken = await checkAccessToken(parsedCookie);

    if (newAccessToken) {
      response.cookies.set(`token-${side}`, JSON.stringify(newAccessToken), {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        secure: true,
      });
    }

    return response;
  } catch {
    return response;
  }
}

async function checkAccessToken(accessToken: AccessToken) {
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

      console.log('newToken', newToken);

      return newToken;
    } catch (err) {
      throw err;
    }
  }

  return null;
}
