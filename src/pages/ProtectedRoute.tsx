import { Navigate } from 'react-router-dom';
import { IsUserLogged } from '../HandleChanges/UserAuth';

function ProtectedRoute({ children }: any) {
  const { currentUser } = IsUserLogged();

  if (!currentUser) {
    return <Navigate to={'/login'} />;
  }
  return children;
}

export default ProtectedRoute;
