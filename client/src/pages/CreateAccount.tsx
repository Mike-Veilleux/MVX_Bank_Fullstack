import { Fragment, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { createAccountSchema } from "../validation/YupValidationSchemas";
import { IAccount, IUserCredential } from "../interfaces/interfaces";
import { useStoreAccounts, useStoreActions } from "../stores/useAccountsStore";
import uuid from "react-uuid";
import {
  InputEmail,
  InputPassword,
  InputUserName,
} from "./components/MvxInputs";
import MvxToasts from "./components/MvxToasts";

const CreateAccount = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showEmailExistAlert, setShowEmailExistAlert] =
    useState<boolean>(false);
  const [isFirstAccount, setIsFirstAccount] = useState(true);
  const accountStore = useStoreAccounts();
  const accountActions = useStoreActions();

  const initialFormValues: IUserCredential = {
    fullName: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values, { resetForm }) => {
      const matchingEmail = accountStore?.find(
        (acc) => acc.credentials?.email === values.email
      );
      if (matchingEmail) {
        setShowEmailExistAlert(true);
      } else {
        const newAccount = {} as IAccount;
        newAccount.credentials = { ...values };
        newAccount.id = uuid();
        newAccount.balance = 0;
        newAccount.history = [];
        accountActions.addAccount(newAccount);
        accountActions.setActiveAccount(newAccount.id);
        setIsFirstAccount(false);
        setShowSuccessAlert(true);
        resetForm({ values: initialFormValues });
      }
    },
    validationSchema: createAccountSchema,
  });

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
              objectName={"fullName"}
              label={"Name"}
            />
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
              {isFirstAccount ? "Create Account" : "Create Another Account"}
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
        body={"Account created succesfully!"}
        color={"success"}
      />
    </Fragment>
  );
};

export default CreateAccount;
