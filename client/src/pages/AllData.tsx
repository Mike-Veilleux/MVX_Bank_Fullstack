import { useState } from "react";
import { Button, Card, Container, Stack, Table } from "react-bootstrap";
import { IAccount, ITransaction } from "../interfaces/interfaces";
import { useStoreAccounts, useStoreActions } from "../stores/useAccountsStore";
import HistoryModal from "./components/HistoryModal";

const AllData = () => {
  const accountStore = useStoreAccounts();
  const accountActions = useStoreActions();

  const [show, setShow] = useState(false);
  const [selectedAccountForHistory, setSelectedAccountForHistory] = useState<
    IAccount | undefined
  >();

  const showAccountTransactionsHistory = (_account: IAccount) => {
    setSelectedAccountForHistory(_account);
    setShow(true);
  };

  const renderAccounts = accountStore?.map((acc: IAccount, index) => {
    return (
      <tr key={index}>
        <td>{acc.credentials?.fullName}</td>
        <td>{acc.credentials?.email}</td>
        <td>{acc.credentials?.password}</td>
        <td>{acc.balance}$</td>
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            style={{ width: "100%" }}
            onClick={() => accountActions.setActiveAccount(acc.id!)}
          >
            Login
          </Button>
        </td>
        <td>
          <Button
            variant="outline-primary"
            size="sm"
            style={{ width: "100%" }}
            onClick={() => showAccountTransactionsHistory(acc!)}
          >
            History
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <Container>
      {accountStore?.length ? (
        <Card className="shadow" style={{ width: "100%" }}>
          <Card.Header as="h5" className="text-center">
            User Acount Details
          </Card.Header>
          <Card.Body>
            <Card.Text className="text-muted text-center">
              In the table below, you will find all of our user's account data.
            </Card.Text>
            <Card.Text className="text-muted text-center">
              To make sure that we are the least secure bank available, we also
              store all data in the browser’s local storage for your
              convenience.
            </Card.Text>
            <Card.Text className="text-muted text-center">
              You can check other users' transaction history, as well as login
              into their account.
            </Card.Text>
            <Table className="" striped bordered hover>
              <thead style={{ backgroundColor: "#303030", color: "#ebebeb" }}>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Balance</th>
                  <th>Login</th>
                  <th>History</th>
                </tr>
              </thead>
              <tbody>{renderAccounts}</tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : (
        <h4 style={{ textAlign: "center" }}>No Accounts</h4>
      )}
      <HistoryModal
        account={selectedAccountForHistory}
        show={show}
        setShow={setShow}
      />
    </Container>
  );
};

export default AllData;
