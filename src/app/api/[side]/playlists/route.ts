import { NextRequest } from 'next/server';
import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import axios from 'axios';

import { getToken } from '@/actions/server';
import type { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  const offset = req.nextUrl.searchParams.get('offset');

  try {
    const token = (await getToken(params.side)) as AccessToken;
    const res = await axios.get<Page<SimplifiedPlaylist>>(
      'https://api.spotify.com/v1/me/playlists',
      {
        params: {
          offset: offset || 0,
          limit: 15,
        },
        headers: {
          Authorization: 'Bearer ' + token.access_token,
        },
      },
    );

    return Response.json(res.data);
  } catch (err) {
    return Response.json(err);
  }
}
