import { useNavigate } from 'react-router-dom';
import LogOutButtons from './components/LogOutButtons';
import useLogOut from './hooks/useLogOut';

function LogOutBody() {
  const navigate = useNavigate();

  const { handleCancel, handleLogOut } = useLogOut({ navigate });

  return (
    <div className='w-full justify-between flex font-bold'>
      <LogOutButtons className='bg-white text-black' onClick={handleCancel}>
        Cancel
      </LogOutButtons>
      <LogOutButtons className='bg-[#c34949]' onClick={handleLogOut}>
        Log Out
      </LogOutButtons>
    </div>
  );
}

export default LogOutBody;
