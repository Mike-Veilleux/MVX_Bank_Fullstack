import { Card } from "react-bootstrap";
import bank from "../assets/Bank.svg";

const Home = () => {
  return (
    <Card className="text-center shadow" style={{ width: "24em" }}>
      <Card.Header as="h5" className="text-center">
        Welcome To Bad Bank
      </Card.Header>
      <Card.Body>
        {/* <Card.Title>Ripping you off openly!</Card.Title> */}
        <img src={bank} width={200} style={{ marginTop: "20px" }} />
        <Card.Text style={{ padding: "20px", textAlign: "justify" }}>
          <p>
            At Bad Bank, we have total disregard for your privacy. All data will
            be stored in your browser's local storage, for everyone's
            convenience. <br />
            <br />
            Our upcoming fullstack developer Mike, is quickly learning about
            back-end and database technology. <br />
            <br />
            <strong>So hurry up, this is a limited offer!</strong>
          </p>
        </Card.Text>
        {/* <Button variant="primary" onClick={() => navigate("/all-data")}>
          Create an Account
        </Button> */}
      </Card.Body>
    </Card>
  );
};

export default Home;
