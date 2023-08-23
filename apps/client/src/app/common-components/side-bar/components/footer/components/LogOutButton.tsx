import Button from '@common-components/Button';
import { useNavigate } from 'react-router-dom';

function LogOutButton({ children }: LogOutButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      className='flex justify-center place-items-center gap-5'
      onClick={() => navigate('/logout')}
    >
      {children}
    </Button>
  );
}

export default LogOutButton;
