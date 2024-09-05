import FlipSync from './buttons/FlipSync';
import ShowHelp from './buttons/ShowHelp';

const Header = () => {
  return (
    <>
      <div className="flex gap-5 items-center">
        <h1 className="flex-shrink-0">Spotify Playlist Sync</h1>
        <div className="border-zinc-700 border-b-2 w-full" />
        <FlipSync />
        <ShowHelp />
      </div>
    </>
  );
};

export default Header;
