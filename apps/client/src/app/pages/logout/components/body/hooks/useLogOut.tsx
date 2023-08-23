import useAdminStore from '@store/AdminStore';

const useLogOut = ({ navigate }: UseLogOutProps) => {
  const { logout } = useAdminStore();

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  return { handleCancel, handleLogOut };
};

export default useLogOut;
