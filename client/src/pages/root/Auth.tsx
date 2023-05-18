import { Navigate } from "react-router-dom";
import { useStoreActiveAccountID } from "../../stores/useAccountsStore";

type PrivateProps = {
  children: JSX.Element;
};

const Auth = ({ children }: PrivateProps) => {
  const activeAccountID = useStoreActiveAccountID();

  if (!activeAccountID) {
    return <Navigate to="/restricted-access" />;
  }

  return children;
};

export default Auth;
