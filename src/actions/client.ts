import { Playlist } from '@/app/api/[side]/playlist/[id]/route';

export async function selfFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  endpoint = `${process.env.NEXT_PUBLIC_BASE_PATH}${endpoint}`;

  const res = await fetch(endpoint, options);

  if (res.ok) {
    const data: T = await res.json();
    return data;
  }

  throw res;
}

export async function getDiff(syncRight: boolean, idFrom?: string, idTo?: string) {
  if (!idFrom || !idTo) {
    return { tracksToAdd: [], tracksToRemove: [] };
  }

  const fromSide = syncRight ? 'left' : 'right';
  const toSide = syncRight ? 'right' : 'left';

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

export async function sync(syncRight: boolean, idFrom?: string, idTo?: string) {
  const fromSide = syncRight ? 'left' : 'right';
  const toSide = syncRight ? 'right' : 'left';

  const playlist = await selfFetch<Playlist>(`/api/${fromSide}/playlist/${idFrom}`);
  await selfFetch(`/api/${toSide}/playlist/${idTo}`, {
    method: 'PUT',
    body: JSON.stringify(playlist),
  });
}
