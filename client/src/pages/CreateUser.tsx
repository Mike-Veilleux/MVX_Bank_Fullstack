import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { CreateUser, IUser } from "../interfaces/IUser";
import { useAccount_API } from "../stores/useAccountsStore";
import {
  useNewUser,
  useUser,
  useUser_ACTIONS,
  useUser_API,
} from "../stores/useUserStore";
import { nameof } from "../uitls/nameof";
import { createAccountSchema } from "../validation/YupValidationSchemas";
import {
  InputEmail,
  InputPassword,
  InputUserName,
} from "./components/MvxInputs";
import MvxToasts from "./components/MvxToasts";

const CreateNewUser = () => {
  const user = useUser();
  const newUser = useNewUser();
  const user_ACTIONS = useUser_ACTIONS();
  const user_API = useUser_API();
  const account_API = useAccount_API();

  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showEmailExistAlert, setShowEmailExistAlert] =
    useState<boolean>(false);
  const [isFirstUserCreated, setIsFirstUserCreated] = useState(true);

  const initialFormValues: IUser = {
    name: newUser?.name != undefined ? newUser.name : "",
    email: newUser?.email != undefined ? newUser.email : "",
    password: newUser?.password != undefined ? newUser.password : "",
    googleID: newUser?.googleID != undefined ? newUser.googleID : "",
  };
  const emptyFormValues: IUser = {
    name: "",
    email: "",
    password: "",
    googleID: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (values, { resetForm }) => {
      let newUser: IUser = CreateUser(
        values.name,
        values.email,
        values.password,
        values.googleID
      );
      const isNewAccount = await user_API.CreateNewUser(newUser);
      if (isNewAccount) {
        setIsFirstUserCreated(false);
        setShowSuccessAlert(true);
        user_ACTIONS.setNewUser(undefined);
        resetForm({ values: emptyFormValues });
      } else {
        setShowEmailExistAlert(true);
      }
    },
    validationSchema: createAccountSchema,
  });
  const userAsType: IUser = CreateUser("", "", "", "");
  return (
    <Fragment>
      <Card className="shadow" style={{ width: "24em" }}>
        <Card.Header as="h5" className="text-center">
          Create New Account
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-muted">
            Fill in your data to create a new account.
          </Card.Text>

          <Form onSubmit={formik.handleSubmit}>
            <InputUserName
              formik={formik}
              objectName={nameof(userAsType, (x) => x.name!)}
              label={"Name"}
            />
            <InputEmail
              formik={formik}
              objectName={nameof(userAsType, (x) => x.email!)}
              label={"Email"}
            />

            <InputPassword
              formik={formik}
              objectName={nameof(userAsType, (x) => x.password!)}
              label={"Password"}
            />
            <Button
              variant="primary"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              style={{ width: "100%" }}
            >
              {isFirstUserCreated ? "Create Account" : "Create Another Account"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <MvxToasts
        show={showEmailExistAlert}
        setShow={setShowEmailExistAlert}
        title={"Warning"}
        date={null}
        body={"This email address is already used!"}
        color={"danger"}
      />

      <MvxToasts
        show={showSuccessAlert}
        setShow={setShowSuccessAlert}
        title={""}
        date={null}
        body={"Account created successfully!"}
        color={"success"}
      />
    </Fragment>
  );
};

export default CreateNewUser;
