import format from "date-fns/format";
import { Container, Table } from "react-bootstrap";
import { ITransaction } from "../interfaces/ITransaction";
import { useAccount } from "../stores/useAccountsStore";

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
          <td>{trans.sort}</td>
          <td>{trans.amount}$</td>
          <td>{formattedDate}</td>
        </tr>
      );
    }
  );
  return (
    <Container>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "#303030", color: "#ebebeb" }}>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{renderTransactions}</tbody>
      </Table>
    </Container>
  );
};

export default Transactions;
