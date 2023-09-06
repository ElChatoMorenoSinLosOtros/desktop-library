import useAuthStore from '@store/AuthStore';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateOutlet() {
  const auth = useAuthStore(state => state.auth.isLoggedIn);
  return auth ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateOutlet;
