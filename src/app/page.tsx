import Header from '@/components/Header';
import Side from '@/components/side/Side';
import SyncButton from '@/components/buttons/Sync';

export default async function Index() {
  return (
    <div className="lg:w-[900px] p-6 h-full lg:h-auto">
      <Header />
      <div className="flex flex-row items-center justify-center h-full">
        <SyncButton className="mx-8" />
        <Side type="left" />
        <Side type="right" />
      </div>
    </div>
  );
}
