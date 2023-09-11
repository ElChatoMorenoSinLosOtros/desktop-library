import GlobalBlueButton from '@common-components/GlobalBlueButton';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();

  return (
    <div className='px-6 py-2 grid place-items-center grid-cols-6'>
      <div className='font-russo text-3xl text-[#0D1B2A]/75 text-start w-full'>
        Admin List
      </div>
      <GlobalBlueButton
        onClick={() => {
          navigate('/admin/add');
        }}
      >
        Add Admin
      </GlobalBlueButton>
    </div>
  );
}

export default AdminHeader;
