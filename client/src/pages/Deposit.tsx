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

const Deposit = () => {
  const accounts = useStoreAccounts();
  const activeAccountID = useStoreActiveAccountID();
  const accountActions = useStoreActions();
  const activeAccount = accounts?.find(
    (account) => account.id === activeAccountID
  );

  const [showToast, setShowToast] = useState<boolean>(false);

  const initialFormValue: ITransaction = {
    sort: ETransactionType.DEPOSIT,
    amount: 0,
    date: undefined,
  };

  const formik = useFormik({
    initialValues: initialFormValue,
    onSubmit: (values, { resetForm }) => {
      values.date = new Date(Date.now());
      activeAccount!.balance = activeAccount!.balance! + values.amount!;
      activeAccount?.history?.push(values);
      accountActions.updateAccounts(activeAccount!);
      setShowToast(true);
      resetForm({ values: initialFormValue });
    },
    validationSchema: transactionAmountSchema,
  });

  return (
    <div>
      <Card className="shadow" style={{ width: "24em" }}>
        <Card.Header as="h5" className="text-center">
          Deposit
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-muted">
            Deposit money in your account.
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
                label={"Deposit Amount"}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                style={{ width: "100%" }}
              >
                Deposit
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
          body={`Successfully deposited ${
            activeAccount?.history![activeAccount?.history!.length - 1].amount
          }$ in ${activeAccount?.credentials?.fullName}'s account!`}
          color={"success"}
        />
      )}
    </div>
  );
};

export default Deposit;
