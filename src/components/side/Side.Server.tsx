import dynamic from 'next/dynamic';

import { SideType } from '@/store';
import { getToken } from '@/actions/session';
import SideContext from '../providers/SideContext';
import ClientSide from './Side.Client';
import Login from './cards/Login';

const Account = dynamic(() => import('./account/Account'));

const ServerSide = async ({ type }: { type: SideType }) => {
  const token = await getToken(type);

  return (
    <SideContext type={type}>
      <ClientSide>{token ? <Account /> : <Login />}</ClientSide>
    </SideContext>
  );
};

export default ServerSide;
