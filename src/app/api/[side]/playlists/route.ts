import { NextRequest } from 'next/server';
import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

import spotifyFetch from '@/actions/server';
import type { SideType } from '@/store';

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  const offset = req.nextUrl.searchParams.get('offset');

  try {
    const playlists = await spotifyFetch<Page<SimplifiedPlaylist>>(
      'https://api.spotify.com/v1/me/playlists',
      {
        params: {
          offset: offset || 0,
          limit: 15,
        },
        auth: params.side,
      },
    );

    return Response.json(playlists);
  } catch (err) {
    return Response.json(err);
  }
}
