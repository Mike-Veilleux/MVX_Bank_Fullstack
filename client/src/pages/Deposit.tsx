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

const Deposit = () => {
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
  const [selectedAccountType, setSelectedAccountType] = useState<IAccount>();

  function handleSelectAccount(e: any) {
    setSelectedAccountType(e.target.value);
  }

  const initialFormValue: ITransaction = {
    sort: ETransactionType.DEPOSIT,
    amount: 0,
    date: undefined,
  };

  const formik = useFormik({
    initialValues: initialFormValue,
    onSubmit: async (values, { resetForm }) => {
      let updatedAccount: IAccount = await account_API.UpdateBalance(
        user?._id!,
        values.amount!
      );

      if (updatedAccount !== undefined) {
        const newTransaction = CreateTransaction(
          user?.name,
          ETransactionType.DEPOSIT,
          values.amount!,
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
                <div style={{ fontWeight: "bold" }}>{account!.balance}$</div>
              </Stack>
              {/* <select
                className="form-select"
                aria-label="Default select example"
                // onChange={(e, val) => handleSelectAccount(val)}
              >
                <option selected>Select Account</option>
                <option value="1">{IAccountType.SAVINGS}</option>
                <option value="2">{IAccountType.CHECK}</option>
              </select> */}
              <InputAmount
                formik={formik}
                objectName={nameof(transactionAsType, (x) => x.amount!)}
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

      {!account?.history?.length ? null : (
        <MvxToasts
          show={showToast}
          setShow={setShowToast}
          title={""}
          date={format(
            new Date(account?.history![account?.history!.length - 1].date!),
            "EE dd MMMM yyyy HH:mm:ss"
          )}
          body={`Successfully deposited ${
            account?.history![account?.history!.length - 1].amount
          }$ in ${user?.name}'s account!`}
          color={"success"}
        />
      )}
    </div>
  );
};

export default Deposit;
