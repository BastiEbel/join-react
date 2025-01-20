//import { Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useData } from "../../hooks/useData";

type ProtectedRouteProps = {
  element: JSX.Element;
};

function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user } = useData();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
}

export default ProtectedRoute;
