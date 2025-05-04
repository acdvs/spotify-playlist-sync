import Image from 'next/image';
import { UserProfile } from '@spotify/web-api-ts-sdk';

import RefreshButton from '@/components/buttons/Refresh';
import LogoutButton from '@/components/buttons/Logout';

function Profile({
  data,
  playlistCount,
}: {
  data?: UserProfile;
  playlistCount?: number;
}) {
  return (
    <div className="flex justify-between gap-8">
      <div className="flex items-center gap-3">
        <div className="w-10 aspect-square flex-shrink-0">
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
          <a href={data?.external_urls?.spotify} target="_blank" className="line-clamp-1">
            <p className="button tertiary plain leading-none mb-1">
              {data?.display_name}
            </p>
          </a>
          <p className="text-sm text-zinc-500">{playlistCount} playlists</p>
        </div>
      </div>
      <div className="flex items-center">
        <RefreshButton />
        <LogoutButton />
      </div>
    </div>
  );
}

export default Profile;
