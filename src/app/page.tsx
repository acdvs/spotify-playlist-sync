import { getToken } from '@/actions/server';
import Header from '@/components/Header';
import Side from '@/components/side/Side';
import SyncButton from '@/components/buttons/Sync';

export default async function Index() {
  const tokenLeft = await getToken('left');
  const tokenRight = await getToken('right');

  return (
    <div className="lg:w-[900px] p-6 h-full lg:h-auto">
      <Header />
      <div className="flex flex-row items-center justify-center h-full">
        <Side side="left" />
        <SyncButton className="mx-8" />
        <Side side="right" />
      </div>
    </div>
  );
}
