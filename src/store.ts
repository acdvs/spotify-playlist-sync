import { create } from 'zustand';
import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

export type SideType = 'left' | 'right';

type Side = {
  loggingOut: boolean;
  displayName?: string;
  playlist?: SimplifiedPlaylist;
};

type Values = {
  syncDir: SideType;
  activeSide: SideType;
  left: Side;
  right: Side;
};

type Actions = {
  flipSyncDirection: () => void;
  setActiveSide: (side: SideType) => void;
  setLoggingOut: (side: SideType, x: boolean) => void;
  setDisplayName: (side: SideType, name?: string) => void;
  setPlaylist: (side: SideType, playlist?: SimplifiedPlaylist) => void;
};

export const defaultSideValues: Side = {
  loggingOut: false,
};

export const useStore = create<Values & Actions>((set) => ({
  syncDir: 'right',
  activeSide: 'left',
  left: defaultSideValues,
  right: defaultSideValues,
  flipSyncDirection: () =>
    set((state) => ({
      syncDir: state.syncDir === 'right' ? 'left' : 'right',
    })),
  setActiveSide: (side: SideType) => set(() => ({ activeSide: side })),
  setLoggingOut(side, x) {
    set((state) => ({ [side]: { ...state[side], loggingOut: x } }));
  },
  setDisplayName(side, x) {
    set((state) => ({ [side]: { ...state[side], displayName: x } }));
  },
  setPlaylist(side, x) {
    set((state) => ({ [side]: { ...state[side], playlist: x } }));
  },
}));
