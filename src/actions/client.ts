import axios from '@/axios';
import { Playlist } from '@/app/api/[side]/playlist/[id]/route';

export async function getData<T>(endpoint: string) {
  const res = await axios.get<T>(endpoint, { withCredentials: true });
  return res.data;
}

export async function getDiff(idLeft?: string, idRight?: string) {
  if (!idLeft || !idRight) {
    return { tracksToAdd: [], tracksToRemove: [] };
  }

  const [resLeft, resRight] = await Promise.all([
    getData<Playlist>(`/api/left/playlist/${idLeft}`),
    getData<Playlist>(`/api/right/playlist/${idRight}`),
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
  const playlist = await getData<Playlist>(`/api/left/playlist/${idLeft}`);
  await axios.put(`/api/right/playlist/${idRight}`, playlist);
}
