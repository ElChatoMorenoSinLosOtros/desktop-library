import DeleteStore from '@store/DeleteStore';
import { useNavigate } from 'react-router-dom';
import DeleteButton from './components/DeletePageButton';

function DeletePage() {
  const { type, onClick } = DeleteStore();
  const navigate = useNavigate();

  return (
    <div className='h-screen flex justify-center place-items-center font-roboto-mono font-bold text-2xl text-white'>
      <div className='w-3/5 bg-[#0d1b2a] grid place-content-center py-20 rounded-3xl gap-16'>
        <h1>Are you sure to delete this {type}?</h1>
        <div className='flex w-full justify-between gap-5'>
          <DeleteButton
            onClick={() => {
              navigate(-1);
            }}
            className='text-black bg-white'
          >
            Cancel
          </DeleteButton>
          <DeleteButton className='bg-[#c34949]' onClick={onClick}>
            Ok
          </DeleteButton>
        </div>
      </div>
    </div>
  );
}

export default DeletePage;
