import Button from '@common-components/Button';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

function InfoUserButton({ id }: { id: number }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`/person-management/info/${id}`)}
      className='text-center text-2xl grid place-content-center'
    >
      <InfoIcon />
    </Button>
  );
}

export default InfoUserButton;
