import { Navigate } from 'react-router-dom';
import { IsUserLogged } from '../HandleChanges/UserAuth';
import { Routes } from '../Types/Props';

function ProtectedRoute({ children }: Routes) {
  const { currentUser } = IsUserLogged();

  if (!currentUser) {
    return <Navigate to={'/login'} />;
  }
  return children;
}

export default ProtectedRoute;
