import { Container, Nav, Navbar } from "react-bootstrap";
import { useUser } from "../../stores/useUserStore";
import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";

const NavigationBar = () => {
  const user = useUser();

  const toolTipsNav = {
    home: "This is the home page.",
    login: "Login your existing account.",
    createAccount: "Create a new account an access our bank services.",
    deposit: "Deposit money in your account.",
    withdraw: "Withdraw money from your account.",
    transaction: "View all previous transactions for your account.",
    allData: "View everyone's bank data!",
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/#/home">MVX Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/#/home"
              data-toggle="tooltip"
              title={toolTipsNav.home}
            >
              Home
            </Nav.Link>
            {/* <Nav.Link
              href="/#/create-account"
              data-toggle="tooltip"
              title={toolTipsNav.createAccount}
            >
              Create Account
            </Nav.Link> */}
            {user !== undefined && (
              <>
                <Nav.Link
                  href="/#/deposit"
                  data-toggle="tooltip"
                  title={toolTipsNav.deposit}
                >
                  Deposit
                </Nav.Link>
                <Nav.Link
                  href="/#/withdraw"
                  data-toggle="tooltip"
                  title={toolTipsNav.withdraw}
                >
                  Withdraw
                </Nav.Link>
                <Nav.Link
                  href="/#/transactions"
                  data-toggle="tooltip"
                  title={toolTipsNav.transaction}
                >
                  Transactions
                </Nav.Link>
                {/* <Nav.Link
                  href="/#/all-data"
                  data-toggle="tooltip"
                  title={toolTipsNav.allData}
                >
                  All Data
                </Nav.Link> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {user == undefined && <SignUpButton />}
        <LoginButton />
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
