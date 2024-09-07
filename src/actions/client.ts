import { Playlist } from '@/app/api/[side]/playlist/[id]/route';

export async function _fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(endpoint, options);

  if (res.ok) {
    const data: T = await res.json();
    return data;
  }

  throw res;
}

export async function getDiff(idLeft?: string, idRight?: string) {
  if (!idLeft || !idRight) {
    return { tracksToAdd: [], tracksToRemove: [] };
  }

  const [resLeft, resRight] = await Promise.all([
    _fetch<Playlist>(`/api/left/playlist/${idLeft}`),
    _fetch<Playlist>(`/api/right/playlist/${idRight}`),
  ]);

  const trackIdsLeft = resLeft.items.map((x) => x.track.id);
  let trackIdsRight = resRight.items.map((x) => x.track.id);

  let tracksToAdd: string[] = [];

  for (const trackIdLeft of trackIdsLeft) {
    const trackIdx = trackIdsRight.indexOf(trackIdLeft);

    if (trackIdx > -1) {
      trackIdsRight.splice(trackIdx, 1);
    } else {
      tracksToAdd.push(trackIdLeft);
    }
  }

  return { tracksToAdd, tracksToRemove: trackIdsRight };
}

export async function sync(idLeft?: string, idRight?: string) {
  const playlist = await _fetch<Playlist>(`/api/left/playlist/${idLeft}`);
  await _fetch(`/api/right/playlist/${idRight}`, {
    method: 'PUT',
    body: JSON.stringify(playlist),
  });
}
