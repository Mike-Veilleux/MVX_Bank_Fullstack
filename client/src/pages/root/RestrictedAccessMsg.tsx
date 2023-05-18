import React from "react";
import { Alert, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RestrictedAccessMsg = () => {
  const navigate = useNavigate();

  return (
    <Alert className="text-center shadow" variant="warning">
      <Stack gap={2} style={{ display: "flex", alignItems: "center" }}>
        <h4>Ooops!</h4>
        <h6>Restricted Access</h6>
        <div>
          <p>You need to be a registered user to access this area.</p>
          <p>You can either:</p>
        </div>
        <Button
          variant="primary"
          style={{ width: "100%" }}
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </Button>
        <Button
          variant="primary"
          style={{ width: "100%" }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="danger"
          style={{ width: "100%" }}
          onClick={() => navigate("/all-data")}
        >
          Use Someone Else's Account
        </Button>
      </Stack>
    </Alert>
  );
};

export default RestrictedAccessMsg;
