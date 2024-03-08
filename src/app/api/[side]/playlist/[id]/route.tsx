import { NextRequest } from 'next/server';
import { Page, PlaylistedTrack } from '@spotify/web-api-ts-sdk';
import axios from 'axios';

import { getToken } from '@/actions/server';
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
    const token = (await getToken(params.side)) as AccessToken;
    let playlistRes = await axios.get<Page<PlaylistedTrack>>(
      `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
      {
        params: {
          fields: 'items.track.id',
        },
        headers: {
          Authorization: 'Bearer ' + token.access_token,
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

    const token = (await getToken(params.side)) as AccessToken;
    const playlistRes = await axios.put(
      `https://api.spotify.com/v1/playlists/${params.id}/tracks`,
      {
        uris: data.items.map((x) => `spotify:track:${x.track.id}`),
      },
      {
        headers: {
          Authorization: 'Bearer ' + token.access_token,
        },
      },
    );

    return Response.json(playlistRes.data);
  } catch (err) {
    return Response.json(err);
  }
}
