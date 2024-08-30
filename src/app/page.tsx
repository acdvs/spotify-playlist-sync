import Header from '@/components/Header';
import SideWrap from '@/components/SideWrap';
import SyncButton from '@/components/buttons/Sync';

export default function Index() {
  return (
    <div className="w-[900px] p-6">
      <Header />
      <div className="flex flex-col lg:flex-row items-center justify-center h-full">
        <SideWrap side="left" />
        <SyncButton className="mx-8" />
        <SideWrap side="right" />
      </div>
    </div>
  );
}
