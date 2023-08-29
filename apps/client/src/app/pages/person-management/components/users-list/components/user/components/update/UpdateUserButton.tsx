import Button from '@common-components/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function UpdateUserButton({ id }: { id: number }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`/person-management/update/${id}`)}
      className='text-center text-2xl grid place-content-center'
    >
      <EditIcon />
    </Button>
  );
}

export default UpdateUserButton;
