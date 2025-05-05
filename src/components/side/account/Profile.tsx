import Image from 'next/image';
import { UserProfile } from '@spotify/web-api-ts-sdk';

import RefreshButton from '@/components/buttons/Refresh';
import LogoutButton from '@/components/buttons/Logout';
import { Button } from '@/components/ui/Button';

function Profile({
  display_name,
  external_urls,
  images,
  playlistCount,
}: {
  playlistCount?: number;
} & UserProfile) {
  return (
    <div className="flex justify-between gap-8">
      <div className="flex items-center gap-3">
        <div className="w-10 aspect-square flex-shrink-0">
          <Image
            src={images?.[0].url || ''}
            quality={25}
            width={40}
            height={40}
            className="rounded-full"
            alt="Profile image"
          />
        </div>
        <div>
          <a href={external_urls?.spotify} target="_blank" className="line-clamp-1">
            <Button variant="text" className="leading-none mb-1">
              {display_name}
            </Button>
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
