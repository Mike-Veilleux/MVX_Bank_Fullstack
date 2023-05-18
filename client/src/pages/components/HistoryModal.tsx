import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IAccount, ITransaction } from "../../interfaces/interfaces";
import { format } from "date-fns";

type HistoryModalProps = {
  account: IAccount | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const HistoryModal = ({ account, show, setShow }: HistoryModalProps) => {
  const renderTransactions = account?.history?.map(
    (trans: ITransaction, index: number) => {
      const formatedDate = format(
        new Date(trans!.date!),
        "EE dd MMMM yyyy HH:mm:ss"
      );
      return (
        <tr key={index}>
          <td>{trans.sort}</td>
          <td>{trans.amount}$</td>
          <td>{formatedDate}</td>
        </tr>
      );
    }
  );

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{`${account?.credentials?.fullName}'s Transaction History `}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ width: "100%" }}
            variant="primary"
            onClick={() => setShow(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryModal;
