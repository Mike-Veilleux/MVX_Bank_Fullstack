import { Card } from "react-bootstrap";
import bank from "../assets/Bank.svg";

const Home = () => {
  return (
    <Card className="text-center shadow" style={{ width: "24em" }}>
      <Card.Header as="h3" className="text-center">
        Welcome To MVX Bank
      </Card.Header>
      <Card.Body>
        <img src={bank} width={200} style={{ marginTop: "20px" }} />
        <Card.Text style={{ padding: "20px", textAlign: "justify" }}>
          Bad Bank had a reputation of having poor security for its customers.
          We are happy to announce that we have updated our codebase.
          <br />
          <br />
          We are now rebranded as MVX Bank and offer a fully secure banking
          experience. All sessions are now secured with the best techniques.{" "}
          <br />
          <br />
          <strong>
            All your sensitive data is encrypted and stored on our secured
            server.
          </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Home;
