import type {
  Page,
  PlaylistedTrack,
  SimplifiedPlaylist,
  UserProfile,
} from '@spotify/web-api-ts-sdk';

import { SideType } from '@/store';
import { sfetch } from '../actions/fetch';

export function getProfile(side: SideType) {
  return sfetch<UserProfile>('https://api.spotify.com/v1/me', side);
}

export function getPlaylists(side: SideType, offset: number) {
  return sfetch<Page<SimplifiedPlaylist>>(
    'https://api.spotify.com/v1/me/playlists',
    side,
    {
      params: {
        offset: offset || 0,
        limit: 15,
      },
    },
  );
}

export async function getPlaylist(side: SideType, id: string) {
  const playlist = await sfetch<Page<PlaylistedTrack>>(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    side,
    {
      params: {
        fields: 'items.track.id',
      },
    },
  );

  playlist.items = playlist.items.filter((x) => x.track.id);
  return playlist;
}

export function updatePlaylist(side: SideType, id: string, data: Page<PlaylistedTrack>) {
  const uris = data.items.map((x) => `spotify:track:${x.track.id}`);

  return sfetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, side, {
    method: 'PUT',
    body: JSON.stringify({ uris }),
  });
}

export async function getDiff(syncDir: SideType, fromId?: string, toId?: string) {
  const fromSide = syncDir === 'right' ? 'left' : 'right';

  const [fromData, toData] = await Promise.all([
    getPlaylist(fromSide, fromId as string),
    getPlaylist(syncDir, toId as string),
  ]);

  const trackIdsFrom = fromData.items.map((x) => x.track.id);
  let trackIdsTo = toData.items.map((x) => x.track.id);

  let tracksToAdd: string[] = [];

  for (const trackIdFrom of trackIdsFrom) {
    const trackIdx = trackIdsTo.indexOf(trackIdFrom);

    if (trackIdx > -1) {
      trackIdsTo.splice(trackIdx, 1);
    } else {
      tracksToAdd.push(trackIdFrom);
    }
  }

  return { tracksToAdd, tracksToRemove: trackIdsTo };
}

export async function sync(syncDir: SideType, fromId?: string, toId?: string) {
  const fromSide = syncDir === 'right' ? 'left' : 'right';
  const playlist = await getPlaylist(fromSide, fromId as string);
  await updatePlaylist(syncDir, toId as string, playlist);
}
