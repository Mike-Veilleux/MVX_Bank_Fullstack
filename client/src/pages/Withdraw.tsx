import { format } from "date-fns";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { ETransactionType } from "../interfaces/ENUMS";
import { IAccount } from "../interfaces/IAccount";
import { CreateTransaction, ITransaction } from "../interfaces/ITransaction";
import {
  useAccount,
  useAccount_ACTIONS,
  useAccount_API,
} from "../stores/useAccountsStore";
import { useUser } from "../stores/useUserStore";
import { nameof } from "../uitls/nameof";
import { transactionAmountSchema } from "../validation/YupValidationSchemas";
import { InputAmount } from "./components/MvxInputs";
import MvxToasts from "./components/MvxToasts";

const Withdraw = () => {
  const user = useUser();
  const account = useAccount();
  const account_ACTIONS = useAccount_ACTIONS();
  const account_API = useAccount_API();

  const transactionAsType = CreateTransaction(
    undefined,
    undefined,
    undefined,
    undefined
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
    onSubmit: async (values, { resetForm }) => {
      let updatedAccount: IAccount = await account_API.UpdateBalance(
        user?._id!,
        -values.amount!
      );

      if (updatedAccount !== undefined) {
        const newTransaction = CreateTransaction(
          user?.name,
          ETransactionType.WITHDRAW,
          -values.amount!,
          new Date(Date.now())
        );
        updatedAccount = await account_API.AddTransactionToAccount(
          updatedAccount._id!,
          newTransaction
        );
        account_ACTIONS.setActiveAccount(updatedAccount);

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
                <div style={{ fontWeight: "bold" }}>{account!.balance}$</div>
              </Stack>
              <InputAmount
                formik={formik}
                objectName={nameof(transactionAsType, (x) => x.amount!)}
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

      {!account?.history?.length ? null : (
        <MvxToasts
          show={showToast}
          setShow={setShowToast}
          title={""}
          date={format(
            new Date(account?.history![account?.history!.length - 1].date!),
            "EE dd MMMM yyyy HH:mm:ss"
          )}
          body={`Successfully withdrawn ${
            account?.history![account?.history!.length - 1].amount
          }$ from ${user?.name}'s account!`}
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
