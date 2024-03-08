import { NextRequest } from 'next/server';
import { UserProfile } from '@spotify/web-api-ts-sdk';
import axios from 'axios';

import { getToken } from '@/actions/server';
import type { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  try {
    const token = (await getToken(params.side)) as AccessToken;
    const res = await axios.get<UserProfile>('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
      },
    });

    return Response.json(res.data);
  } catch (err) {
    return Response.json(err);
  }
}
