import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from '../contexts/AccountContext';

const AdminRoute = () => 
{
  const { user } = useAccount();

  if (!user || user.rol !== 'Admin') 
  {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
