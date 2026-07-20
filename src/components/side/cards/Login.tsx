import LoginButton from '@/components/buttons/Login';
import Card from '@/components/ui/Card';

async function LoginCard() {
  return (
    <Card filled text="Not logged in to a Spotify account.">
      <LoginButton />
    </Card>
  );
}

export default LoginCard;
