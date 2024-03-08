import { NextResponse, NextRequest } from 'next/server';
import { AccessToken } from './app/api/token/route';

export const config = {
  matcher: '/api/:side/(playlists?|profile)',
};

export async function middleware(request: NextRequest) {
  const side = request.nextUrl.pathname.split('/')[2];
  const tokenCookie = request.cookies.get(`token-${side}`);

  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const parsedCookie = JSON.parse(tokenCookie.value);
    const newAccessToken = await checkAccessToken(parsedCookie);

    const response = NextResponse.next();

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
    return NextResponse.redirect(new URL('/', request.url));
  }
}

async function checkAccessToken(accessToken: AccessToken) {
  if (new Date() > new Date(accessToken.expires_at)) {
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', accessToken.refresh_token);

    try {
      const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'post',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET,
            ).toString('base64'),
        },
      });
      const token = await tokenRes.json();

      const newToken = {
        ...token,
        refresh_token: accessToken.refresh_token,
        expires_at: new Date(),
      };

      newToken.expires_at.setSeconds(
        newToken.expires_at.getSeconds() + newToken.expires_in,
      );

      return newToken;
    } catch (err) {
      console.log(err);
    }
  }

  return null;
}
