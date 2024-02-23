import { NextRequest } from 'next/server';
import { Page, PlaylistedTrack } from '@spotify/web-api-ts-sdk';
import axios from 'axios';

import { prerequest } from '@/actions/server';
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
    const tokenRes = await prerequest(params.side);
    let playlistRes = await axios.get<Page<PlaylistedTrack>>(
      `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
      {
        params: {
          fields: 'items.track.id',
        },
        headers: {
          Authorization: 'Bearer ' + tokenRes.access_token,
        },
      },
    );

    playlistRes.data.items = playlistRes.data.items.filter((x) => x.track.id);

    return Response.json(playlistRes.data);
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

    const tokenRes = await prerequest(params.side);
    const playlistRes = await axios.put(
      `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
      {
        uris: data.items.map((x) => `spotify:track:${x.track.id}`),
      },
      {
        headers: {
          Authorization: 'Bearer ' + tokenRes.access_token,
        },
      },
    );

    return Response.json(playlistRes.data);
  } catch (err) {
    return Response.json(err);
  }
}
