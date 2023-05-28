import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser, useUser_ACTIONS, useUser_API } from "../stores/useUserStore";

const LoginButton = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const userLocal = useUser();
  const user_ACTIONS = useUser_ACTIONS();
  const user_API = useUser_API();
  const navigate = useNavigate();

  const onLogout = () => {
    user_ACTIONS.setActiveUser(undefined);
    logout();
    //   {
    //   logoutParams: {
    //     returnTo: window.location.origin,
    //   },
    // }
    // navigate("/home");
  };

  async function CheckIfAuthenticatedUserIsRegisteredUser() {
    if (isAuthenticated) {
      const isExisting = await user_API.FetchUserByEmail(user?.email!);
      if (!isExisting) {
        navigate("/create-account");
      }
    }
  }
  useEffect(() => {
    CheckIfAuthenticatedUserIsRegisteredUser();
  }, [isAuthenticated]);

  const renderLogin = () => {
    if (userLocal !== undefined) {
      return (
        <Stack direction={"horizontal"} style={{ paddingRight: "20px" }}>
          <div
            style={{
              whiteSpace: "nowrap",
              paddingRight: "20px",
              color: "white",
            }}
          >
            {userLocal?.name}
          </div>
          <Button variant="secondary" size="sm" onClick={() => onLogout()}>
            Logout
          </Button>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"horizontal"} style={{ paddingRight: "20px" }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => loginWithRedirect()}
          >
            Login
          </Button>
        </Stack>
      );
    }
  };

  return <>{renderLogin()}</>;
};

export default LoginButton;
