import type {
  Page,
  PlaylistedTrack,
  SimplifiedPlaylist,
  UserProfile,
} from '@spotify/web-api-ts-sdk';

import { SideType } from '@/store';
import { sfetch } from '../actions/fetch';

interface Playlist {
  items: {
    track: {
      id: string;
    };
  }[];
}

export function getProfile(side: SideType) {
  return sfetch<UserProfile>('https://api.spotify.com/v1/me', {
    auth: side,
  });
}

export function getPlaylists(side: SideType, offset: number) {
  return sfetch<Page<SimplifiedPlaylist>>('https://api.spotify.com/v1/me/playlists', {
    params: {
      offset: offset || 0,
      limit: 15,
    },
    auth: side,
  });
}

export async function getPlaylist(side: SideType, id: string) {
  const playlist = await sfetch<Page<PlaylistedTrack>>(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    {
      params: {
        fields: 'items.track.id',
      },
      auth: side,
    },
  );

  playlist.items = playlist.items.filter((x) => x.track.id);
  return playlist;
}

export function updatePlaylist(side: SideType, id: string, data: Playlist) {
  const uris = data.items.map((x) => `spotify:track:${x.track.id}`);

  return sfetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    method: 'PUT',
    body: JSON.stringify({ uris }),
    auth: side,
  });
}

export async function getDiff(syncRight: boolean, fromId: string, toId: string) {
  const fromSide = syncRight ? 'left' : 'right';
  const toSide = syncRight ? 'right' : 'left';

  const [fromData, toData] = await Promise.all([
    getPlaylist(fromSide, fromId),
    getPlaylist(toSide, toId),
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

export async function sync(syncRight: boolean, fromId: string, toId: string) {
  const fromSide = syncRight ? 'left' : 'right';
  const toSide = syncRight ? 'right' : 'left';

  const playlist = await getPlaylist(fromSide, fromId);
  await updatePlaylist(toSide, toId, playlist);
}
