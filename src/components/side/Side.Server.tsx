import dynamic from 'next/dynamic';

import { SideType } from '@/store';
import { getToken } from '@/actions/session';
import SideContext from '../providers/SideContext';
import ClientSide from './Side.Client';
import LoginCard from './cards/Login';

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
