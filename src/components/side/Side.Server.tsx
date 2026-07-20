import dynamic from 'next/dynamic';
import { getToken } from '@/actions/session';
import type { SideType } from '@/store';
import SideContext from '../providers/SideContext';
import LoginCard from './cards/Login';
import ClientSide from './Side.Client';

const Account = dynamic(() => import('./account/Account'));

async function ServerSide({ type }: { type: SideType }) {
  const token = await getToken(type);

  return (
    <SideContext type={type}>
      <ClientSide>{token ? <Account /> : <LoginCard />}</ClientSide>
    </SideContext>
  );
}

export default ServerSide;
