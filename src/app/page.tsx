import SideWrap from '@/components/SideWrap';
import SyncButton from '@/components/buttons/Sync';

export default function Index() {
  return (
    <div className="flex flex-col lg:flex-row items-center h-full">
      <SideWrap side="left" />
      <SyncButton className="mx-8" />
      <SideWrap side="right" />
    </div>
  );
}
