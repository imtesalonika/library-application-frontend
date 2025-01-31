import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@app/store/store';

const PrivateRoute = () => {
  // ingat mengembalikan ini
  const isLoggedIn = useAppSelector((state) => state.auth.currentUser);
  // const isLoggedIn = true;
  return isLoggedIn ? <Outlet /> : <Navigate to={`/login`} />;
};

export default PrivateRoute;
