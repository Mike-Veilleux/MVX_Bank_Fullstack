import { useState } from "react";
import { Card, Button, Form, Stack } from "react-bootstrap";
import { format } from "date-fns";
import { useFormik } from "formik";
import { transactionAmountSchema } from "../validation/YupValidationSchemas";
import { ETransactionType, ITransaction } from "../interfaces/interfaces";
import {
  useStoreAccounts,
  useStoreActions,
  useStoreActiveAccountID,
} from "../stores/useAccountsStore";
import { InputAmount } from "./components/MvxInputs";
import MvxToasts from "./components/MvxToasts";

const Withdraw = () => {
  const accounts = useStoreAccounts();
  const activeAccountID = useStoreActiveAccountID();
  const accountActions = useStoreActions();
  const activeAccount = accounts?.find(
    (account) => account.id === activeAccountID
  );

  const [showToast, setShowToast] = useState<boolean>(false);
  const [showOverdraftAlert, setShowOverdraftAlert] = useState<boolean>(false);

  const initialFormValue: ITransaction = {
    sort: ETransactionType.WITHDRAW,
    amount: 0,
    date: undefined,
  };

  const formik = useFormik({
    initialValues: initialFormValue,
    onSubmit: (values, { resetForm }) => {
      if (values.amount! > activeAccount?.balance!) {
        setShowOverdraftAlert(true);
      } else {
        values.date = new Date(Date.now());
        activeAccount!.balance = activeAccount!.balance! - values.amount!;
        activeAccount?.history?.push(values);
        accountActions.updateAccounts(activeAccount!);
        setShowToast(true);
        resetForm({ values: initialFormValue });
      }
    },
    validationSchema: transactionAmountSchema,
  });

  return (
    <div>
      <Card className="shadow" style={{ width: "24em" }}>
        <Card.Header as="h5" className="text-center">
          Withdraw
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-muted">
            Withdraw money from your account.
          </Card.Text>
          <Form onSubmit={formik.handleSubmit}>
            <Stack gap={1}>
              <Stack direction="horizontal" gap={2}>
                <div>Current Balance:</div>
                <div style={{ fontWeight: "bold" }}>
                  {activeAccount!.balance}$
                </div>
              </Stack>
              <InputAmount
                formik={formik}
                objectName={"amount"}
                label={"Withdrawal Amount"}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                style={{ width: "100%" }}
              >
                Withdraw
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>

      {!activeAccount?.history?.length ? null : (
        <MvxToasts
          show={showToast}
          setShow={setShowToast}
          title={""}
          date={format(
            new Date(
              activeAccount?.history![activeAccount?.history!.length - 1].date!
            ),
            "EE dd MMMM yyyy HH:mm:ss"
          )}
          body={`Successfully withdrawn ${
            activeAccount?.history![activeAccount?.history!.length - 1].amount
          }$ from ${activeAccount?.credentials?.fullName}'s account!`}
          color={"success"}
        />
      )}
      <MvxToasts
        show={showOverdraftAlert}
        setShow={setShowOverdraftAlert}
        title={"Warning"}
        date={null}
        body={"You can't withdraw more than your current balance!"}
        color={"danger"}
      />
    </div>
  );
};

export default Withdraw;
