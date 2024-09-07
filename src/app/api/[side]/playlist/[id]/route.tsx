import { NextRequest } from 'next/server';
import { Page, PlaylistedTrack } from '@spotify/web-api-ts-sdk';

import { _fetch, getToken } from '@/actions/server';
import type { SideType } from '@/store';
import type { AccessToken } from '@/app/api/token/route';

export interface Playlist {
  items: {
    track: {
      id: string;
    };
  }[];
}

export async function GET(
  req: NextRequest,
  { params }: { params: { side: SideType; id: string } },
) {
  try {
    let playlist = await _fetch<Page<PlaylistedTrack>>(
      `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
      {
        body: JSON.stringify({
          fields: 'items.track.id',
        }),
        auth: params.side,
      },
    );

    playlist.items = playlist.items.filter((x) => x.track.id);

    return Response.json(playlist);
  } catch (err) {
    return Response.json(err);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { side: SideType; id: string } },
) {
  try {
    const data: Playlist = await req.json();

    const token = (await getToken(params.side)) as AccessToken;
    const playlist = await _fetch(
      `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
      {
        method: 'PUT',
        body: JSON.stringify({
          uris: data.items.map((x) => `spotify:track:${x.track.id}`),
        }),
        headers: {
          Authorization: 'Bearer ' + token.access_token,
        },
      },
    );

    return Response.json(playlist);
  } catch (err) {
    return Response.json(err);
  }
}
