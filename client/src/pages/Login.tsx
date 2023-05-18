import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { loginAccountSchema } from "../validation/YupValidationSchemas";
import { ILogin } from "../interfaces/interfaces";
import { useStoreAccounts, useStoreActions } from "../stores/useAccountsStore";
import { InputEmail, InputPassword } from "./components/MvxInputs";
import MvxToasts from "./components/MvxToasts";

const Login = () => {
  const [showFailLoginAlert, setShowFailLoginAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const accountStore = useStoreAccounts();
  const accountActions = useStoreActions();

  const initialFormValues: ILogin = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values, { resetForm }) => {
      const matchingAccount = accountStore?.find(
        (acc) =>
          acc.credentials?.email === values.email &&
          acc.credentials?.password === values.password
      );
      if (matchingAccount) {
        accountActions.setActiveAccount(matchingAccount!.id!);
        resetForm({ values: initialFormValues });
        navigate("/all-data");
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
            Login into your accout to access our services.
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
