import Image from 'next/image';
import { UserProfile } from '@spotify/web-api-ts-sdk';

import RefreshButton from './buttons/Refresh';
import LogoutButton from './buttons/Logout';

const Profile = ({
  data,
  playlistCount,
}: {
  data?: UserProfile;
  playlistCount?: number;
}) => (
  <div className="flex justify-between mb-3 ml-3">
    <div className="flex items-center">
      <div className="w-10 aspect-square mr-3">
        <Image
          src={data?.images?.[0].url || ''}
          quality={25}
          width={40}
          height={40}
          className="rounded-full"
          alt="Profile image"
        />
      </div>
      <div>
        <a href={data?.external_urls?.spotify} target="_blank">
          <p className="button tertiary plain leading-none mb-1">{data?.display_name}</p>
        </a>
        <p className="text-sm text-zinc-400">{playlistCount} playlists</p>
      </div>
    </div>
    <div className="flex items-center">
      <RefreshButton />
      <LogoutButton />
    </div>
  </div>
);

export default Profile;
