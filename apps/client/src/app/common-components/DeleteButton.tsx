import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useDeleteStore from '@store/DeleteStore';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function DeleteButton({
  onClick,
  className,
  type,
  children = undefined
}: DeleteButtonFProps) {
  const { setOnClick, setType } = useDeleteStore();
  const navigate = useNavigate();

  return (
    <Button
      className={`grid place-content-center ${className}`}
      onClick={() => {
        setOnClick({
          onClick: () => {
            onClick();
          }
        });
        setType({ type });
        navigate('/delete');
      }}
    >
      {children || <DeleteForeverIcon fontSize='inherit' />}
    </Button>
  );
}

export default DeleteButton;
