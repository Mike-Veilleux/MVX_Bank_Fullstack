import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ILoginValidation } from "../interfaces/ILoginValidation";
import { useAccount_API } from "../stores/useAccountsStore";
import { useUser, useUser_ACTIONS, useUser_API } from "../stores/useUserStore";
import { loginAccountSchema } from "../validation/YupValidationSchemas";
import { InputEmail, InputPassword } from "./components/MvxInputs";
import MvxToasts from "./components/MvxToasts";

const Login = () => {
  const [showFailLoginAlert, setShowFailLoginAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useUser();
  const user_ACTIONS = useUser_ACTIONS();
  const user_API = useUser_API();
  const account_API = useAccount_API();

  const initialFormValues: ILoginValidation = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      const isValidLogin = await user_API.SubmitLogin(
        values.email!,
        values.password!
      );
      if (isValidLogin) {
        resetForm({ values: initialFormValues });
        navigate("/home");
      } else {
        setShowFailLoginAlert(true);
      }
    },
    validationSchema: loginAccountSchema,
  });

  return (
    <Fragment>
      <Card className=" shadow" style={{ width: "24em" }}>
        <Card.Header as="h5" className="text-center">
          Login
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-muted">
            Login into your account to access our services.
          </Card.Text>
          <Form onSubmit={formik.handleSubmit}>
            <InputEmail formik={formik} objectName={"email"} label={"Email"} />
            <InputPassword
              formik={formik}
              objectName={"password"}
              label={"Password"}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <MvxToasts
        show={showFailLoginAlert}
        setShow={setShowFailLoginAlert}
        title={"Warning"}
        date={null}
        body={"Sorry, this Email and Password do not match."}
        color={"danger"}
      />
    </Fragment>
  );
};

export default Login;
