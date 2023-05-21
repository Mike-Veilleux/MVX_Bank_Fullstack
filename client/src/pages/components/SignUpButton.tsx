import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUpButton = () => {
  const navigate = useNavigate();

  const renderSignUp = (
    <Stack direction={"horizontal"} style={{ paddingRight: "20px" }}>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => navigate("/create-account")}
      >
        Sign Up
      </Button>
    </Stack>
  );
  return <>{renderSignUp}</>;
};

export default SignUpButton;
