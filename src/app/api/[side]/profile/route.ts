import { NextRequest } from 'next/server';
import { UserProfile } from '@spotify/web-api-ts-sdk';

import { _fetch } from '@/actions/server';
import type { SideType } from '@/store';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  try {
    const profile = await _fetch<UserProfile>('https://api.spotify.com/v1/me', {
      auth: params.side,
    });

    return Response.json(profile);
  } catch (err) {
    return Response.json(err);
  }
}
