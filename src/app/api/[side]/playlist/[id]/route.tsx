import { NextRequest } from 'next/server';
import { Page, PlaylistedTrack } from '@spotify/web-api-ts-sdk';

import spotifyFetch from '@/actions/server';
import type { SideType } from '@/store';

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
    let playlist = await spotifyFetch<Page<PlaylistedTrack>>(
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
    const uris = data.items.map((x) => `spotify:track:${x.track.id}`);
    const playlist = await spotifyFetch(
      `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
      {
        method: 'PUT',
        body: JSON.stringify({ uris }),
        auth: params.side,
      },
    );

    return Response.json(playlist);
  } catch (err) {
    return Response.json(err);
  }
}
