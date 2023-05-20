import { Navigate } from "react-router-dom";
import { useUser } from "../../stores/useUserStore";

type PrivateProps = {
  children: JSX.Element;
};

const Auth = ({ children }: PrivateProps) => {
  const loggedinUser = useUser();

  if (loggedinUser === undefined) {
    return <Navigate to="/restricted-access" />;
  }

  return children;
};

export default Auth;
