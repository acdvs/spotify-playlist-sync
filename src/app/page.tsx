import Header from '@/components/Header';
import Side from '@/components/side/Side.Server';
import SyncButton from '@/components/buttons/Sync';

export default async function Index() {
  return (
    <div className="flex flex-col w-full lg:w-[900px] h-full lg:h-auto mx-auto gap-6 p-6">
      <Header />
        <SyncButton className="mx-8" />
      <div className="flex lg:items-center h-full lg:h-auto min-h-0">
        <Side type="left" />
        <Side type="right" />
      </div>
    </div>
  );
}
