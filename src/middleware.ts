import { NextResponse, NextRequest } from 'next/server';
import { refreshToken } from './actions/session';
import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/server/web/spec-extension/cookies';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/';

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
        path: BASE_PATH,
        secure: true,
      });

      applySetCookie(request, response);
    }

    return response;
  } catch (err) {
    return Response.json({ status: 500, message: err });
  }
}

// Apply Set-Cookie headers to SSR-readable cookies
// https://github.com/vercel/next.js/discussions/50374
function applySetCookie(req: NextRequest, res: NextResponse) {
  const setCookies = new ResponseCookies(res.headers);

  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

  dummyRes.headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}
