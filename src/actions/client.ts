import { Playlist } from '@/app/api/[side]/playlist/[id]/route';
import { SideType } from '@/store';

export async function selfFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(endpoint, options);

  if (res.ok) {
    const data: T = await res.json();
    return data;
  }

  throw res;
}

export async function getDiff(direction: SideType, idFrom?: string, idTo?: string) {
  if (!idFrom || !idTo) {
    return { tracksToAdd: [], tracksToRemove: [] };
  }

  const fromSide = direction === 'right' ? 'left' : 'right';
  const toSide = direction === 'right' ? 'right' : 'left';

  const [fromData, toData] = await Promise.all([
    selfFetch<Playlist>(`/api/${fromSide}/playlist/${idFrom}`),
    selfFetch<Playlist>(`/api/${toSide}/playlist/${idTo}`),
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

export async function sync(idLeft?: string, idRight?: string) {
  const playlist = await selfFetch<Playlist>(`/api/left/playlist/${idLeft}`);
  await selfFetch(`/api/right/playlist/${idRight}`, {
    method: 'PUT',
    body: JSON.stringify(playlist),
  });
}
