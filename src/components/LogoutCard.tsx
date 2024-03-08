import { useStore } from '@/store';

import { getData } from '@/actions/client';
import Card from './Card';
import type { SideType } from '@/store';
import { useQueryClient } from '@tanstack/react-query';

const LogoutCard = ({ side }: { side: SideType }) => {
  const setLoggingOut = useStore((state) => state.setLoggingOut);
  const queryClient = useQueryClient();

  const logout = async () => {
    await getData(`/api/${side}/logout`);
    queryClient.refetchQueries({ queryKey: [side, 'token'] });
  };

  return (
    <Card text="Are you sure you want to logout of this account?">
      <div className="flex gap-3">
        <div className="button primary" onClick={logout}>
          <p>Logout</p>
        </div>
        <div className="button secondary" onClick={() => setLoggingOut(side, false)}>
          <p>Go back</p>
        </div>
      </div>
    </Card>
  );
};

export default LogoutCard;
