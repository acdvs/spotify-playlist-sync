import querystring from 'querystring';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { SideType } from '@/store';

export interface AuthState {
  for: SideType;
  secret: string;
}

export async function GET(req: NextRequest, { params }: { params: { side: SideType } }) {
  redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
        scope:
          params.side === 'left'
            ? 'user-read-email user-read-private playlist-read-private'
            : 'user-read-email user-read-private playlist-modify-public playlist-modify-private',
        redirect_uri: 'http://localhost:3000/api/token',
        state: JSON.stringify({
          for: params.side,
          secret: process.env.AUTH_STATE_SECRET,
        }),
        show_dialog: true,
      }),
  );
}
