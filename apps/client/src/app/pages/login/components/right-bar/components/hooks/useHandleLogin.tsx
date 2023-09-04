import LibraryAPIService from '@api/LibraryAPI';
import useAdminStore from '@store/AdminStore';
import useSucursalStore from '@store/SucursalStore';
import { useNavigate } from 'react-router-dom';

export const useHandleLogin = ({ setError }: UseHandleLoginProps) => {
  const navigate = useNavigate();
  const { login } = LibraryAPIService();

  const useLogin = async ({ email, password, sucursal }: UseLoginProps) => {
    const data = await login({ email, password });
    if (data?.message === 'Invalid Credentials') {
      setError(data.message);
      return;
    }
    const Admin = {
      name: data?.name || '',
      email: data?.email || '',
      role: data?.role || '',
      accessToken: data?.accessToken || ''
    };
    const { setAdmin } = useAdminStore.getState();
    const { setSucursal } = useSucursalStore.getState();
    setAdmin({ admin: Admin });
    setSucursal({ sucursal });
    navigate('/menu');
  };

  return { useLogin };
};

export default useHandleLogin;
