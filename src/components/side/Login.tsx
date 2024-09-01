import Card from '../Card';
import LoginButton from '../buttons/Login';

const Login = async () => {
  return (
    <Card filled text="Not logged in to a Spotify account.">
      <LoginButton />
    </Card>
  );
};

export default Login;
