import format from "date-fns/format";
import { Container, Stack, Table } from "react-bootstrap";
import { ITransaction } from "../interfaces/ITransaction";
import { useAccount } from "../stores/useAccountsStore";
import { DropboxAccount } from "./components/MVXSelects";

const Transactions = () => {
  const account = useAccount();

  const reversedOrderTransactions = [...account?.history!].reverse();

  const renderTransactions = reversedOrderTransactions.map(
    (trans: ITransaction, index: number) => {
      const formattedDate = format(
        new Date(trans!.date!),
        "EE dd MMMM yyyy HH:mm:ss"
      );
      return (
        <tr key={index}>
          <td>{trans.userName}</td>
          <td>{trans.sort}</td>
          <td>{trans.amount}$</td>
          <td>{formattedDate}</td>
        </tr>
      );
    }
  );

  return (
    <Container>
      <Stack gap={3}>
        <DropboxAccount />
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#303030", color: "#ebebeb" }}>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{renderTransactions}</tbody>
        </Table>
      </Stack>
    </Container>
  );
};

export default Transactions;
