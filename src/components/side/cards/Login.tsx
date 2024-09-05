import Card from '@/components/Card';
import LoginButton from '@/components/buttons/Login';

const Login = async () => {
  return (
    <Card filled text="Not logged in to a Spotify account.">
      <LoginButton />
    </Card>
  );
};

export default Login;
