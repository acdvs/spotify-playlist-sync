import { create } from 'zustand';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

export type SideType = 'left' | 'right';

export interface State {
  loggingOut: {
    left: boolean;
    right: boolean;
  };
  playlists: {
    left: SimplifiedPlaylist | undefined;
    right: SimplifiedPlaylist | undefined;
  };
  setLoggingOut: (side: SideType, x: boolean) => void;
  setPlaylist: (side: SideType, playlist: SimplifiedPlaylist) => void;
}

type Exists<T, U> = { [K in keyof T]: U };
export type Playlists = Exists<State['playlists'], SimplifiedPlaylist>;

export const useStore = create<State>((set) => ({
  loggingOut: {
    left: false,
    right: false,
  },
  playlists: {
    left: undefined,
    right: undefined,
  },
  setLoggingOut(side, x) {
    set((state) => ({ loggingOut: { ...state.loggingOut, [side]: x } }));
  },
  setPlaylist(side, playlist) {
    set((state) => ({ playlists: { ...state.playlists, [side]: playlist } }));
  },
}));
