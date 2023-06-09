import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser, useUser_ACTIONS } from "../../stores/useUserStore";

const LoginButton = () => {
  const user = useUser();
  const user_ACTIONS = useUser_ACTIONS();
  const navigate = useNavigate();

  const onLogout = () => {
    user_ACTIONS.setActiveUser(undefined);
    navigate("/login");
  };

  const onLogin = () => {
    navigate("/login");
  };

  const renderLogin = () => {
    if (user !== undefined) {
      return (
        <Stack direction={"horizontal"} style={{ paddingRight: "20px" }}>
          <div
            style={{
              whiteSpace: "nowrap",
              paddingRight: "20px",
              color: "white",
            }}
          >
            {user?.name}
          </div>
          <Button variant="secondary" size="sm" onClick={() => onLogout()}>
            Logout
          </Button>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"horizontal"} style={{ paddingRight: "20px" }}>
          <Button variant="secondary" size="sm" onClick={() => onLogin()}>
            Login
          </Button>
        </Stack>
      );
    }
  };

  return <>{renderLogin()}</>;
};

export default LoginButton;
