import { NextResponse, NextRequest } from 'next/server';

import { refreshToken } from './actions/session';

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
