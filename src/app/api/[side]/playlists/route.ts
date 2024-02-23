import { NextRequest } from 'next/server';
import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import axios from 'axios';

import { prerequest } from '@/actions/server';
import type { SideType } from '@/store';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  const offset = req.nextUrl.searchParams.get('offset');

  try {
    const tokenRes = await prerequest(params.side);
    const res = await axios.get<Page<SimplifiedPlaylist>>(
      'https://api.spotify.com/v1/me/playlists',
      {
        params: {
          offset: offset || 0,
          limit: 15,
        },
        headers: {
          Authorization: 'Bearer ' + tokenRes.access_token,
        },
      },
    );

    return Response.json(res.data);
  } catch (err) {
    return Response.json(err);
  }
}
