import useAdminStore from '@store/AdminStore';
import useAuthStore from '@store/AuthStore';

const useLogOut = ({ navigate }: UseLogOutProps) => {
  const { logout } = useAdminStore();
  const auth = useAuthStore();

  const handleCancel = () => {
    navigate('/menu');
  };

  const handleLogOut = () => {
    logout();
    auth.logout();
    navigate('/login');
  };

  return { handleCancel, handleLogOut };
};

export default useLogOut;
