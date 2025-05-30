import FlipSync from './buttons/FlipSync';
import ShowHelp from './buttons/ShowHelp';

function Header() {
  return (
    <div className="flex gap-5 items-center">
      <h1 className="flex-shrink-0">Spotify Playlist Sync</h1>
      <div className="border-zinc-700 border-b-2 w-full" />
      <div className="flex -mx-2">
        <FlipSync />
        <ShowHelp />
      </div>
    </div>
  );
}

export default Header;
