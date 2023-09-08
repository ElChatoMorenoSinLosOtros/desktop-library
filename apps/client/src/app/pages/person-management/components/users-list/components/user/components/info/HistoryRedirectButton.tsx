import Button from '@common-components/Button';
import { useNavigate } from 'react-router-dom';

function HistoryRedirectButton({
  id,
  path,
  text
}: {
  id: string;
  path: string;
  text: string;
}) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`${path}/${id}`)}
      className='text-white bg-[#0d1b2a] px-10 rounded-xl grid place-content-center py-3 font-russo text-1xl'
    >
      {text}
    </Button>
  );
}

export default HistoryRedirectButton;
