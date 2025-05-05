import Card from '@/components/ui/Card';
import LoginButton from '@/components/buttons/Login';

async function LoginCard() {
  return (
    <Card filled text="Not logged in to a Spotify account.">
      <LoginButton />
    </Card>
  );
}

export default LoginCard;
