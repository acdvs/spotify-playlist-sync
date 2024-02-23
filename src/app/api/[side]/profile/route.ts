import { NextRequest } from 'next/server';
import { UserProfile } from '@spotify/web-api-ts-sdk';
import axios from 'axios';

import { prerequest } from '@/actions/server';
import type { SideType } from '@/store';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  try {
    const tokenRes = await prerequest(params.side);
    const res = await axios.get<UserProfile>('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + tokenRes.access_token,
      },
    });

    return Response.json(res.data);
  } catch (err) {
    return Response.json(err);
  }
}
