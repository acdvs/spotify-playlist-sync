import Card from '@/components/Card';
import LoginButton from '@/components/buttons/Login';

async function Login() {
  return (
    <Card filled text="Not logged in to a Spotify account.">
      <LoginButton />
    </Card>
  );
}

export default Login;
