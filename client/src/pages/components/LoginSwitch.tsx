import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IAccount } from "../../interfaces/interfaces";
import {
  useStoreAccounts,
  useStoreActions,
} from "../../stores/useAccountsStore";

type PrivateProps = {
  activeAccountID: string | undefined;
};
const LoginSwitch = ({ activeAccountID }: PrivateProps) => {
  const accounts = useStoreAccounts();
  const accountActions = useStoreActions();
  const navigate = useNavigate();
  const activeUserName = accounts?.find((a) => a.id === activeAccountID)
    ?.credentials?.fullName;

  const onLogout = () => {
    accountActions.setActiveAccount("");
    navigate("/all-data");
  };

  const renderLogin = () => {
    if (activeAccountID) {
      return (
        <Stack direction={"horizontal"} style={{ paddingRight: "20px" }}>
          <div
            style={{
              whiteSpace: "nowrap",
              paddingRight: "20px",
              color: "white",
            }}
          >
            {activeUserName}
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
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Stack>
      );
    }
  };

  return <>{renderLogin()}</>;
};

export default LoginSwitch;
