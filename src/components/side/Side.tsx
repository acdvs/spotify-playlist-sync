import dynamic from 'next/dynamic';

import { SideType } from '@/store';
import { getToken } from '@/actions/server';
import SideContext from '../providers/SideContext';
import Login from './Login';

const Account = dynamic(() => import('./account/Account'));

const Side = async ({ side }: { side: SideType }) => {
  const token = await getToken(side);

  return (
    <SideContext side={side}>
      <div className="flex flex-col lg:flex-1 h-full lg:h-auto">
        {token ? <Account /> : <Login />}
      </div>
    </SideContext>
  );
};

export default Side;
