import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import Layout from '../pages/Layout';

export const PublicRoute = ({ restricted = false }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const shouldRedirect = isAuth && restricted;

  return shouldRedirect ? <Navigate to="/" /> : <Layout />;
};
