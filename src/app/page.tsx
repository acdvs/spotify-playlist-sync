import SideWrap from '@/components/SideWrap';
import SyncButton from '@/components/buttons/Sync';

export default function Index() {
  return (
    <div className="flex items-center">
      <SideWrap side="left" />
      <SyncButton className="mx-8" />
      <SideWrap side="right" />
    </div>
  );
}
