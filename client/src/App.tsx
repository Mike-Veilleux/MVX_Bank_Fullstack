import { Route, Routes } from "react-router-dom";
// import AllData from "./pages/AllData";
import CreateNewUser from "./pages/CreateUser";
import Deposit from "./pages/Deposit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import Withdraw from "./pages/Withdraw";
import Auth from "./pages/root/Auth";
import Layout from "./pages/root/Layout";
import RestrictedAccessMsg from "./pages/root/RestrictedAccessMsg";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateNewUser />} />
        <Route path="/restricted-access" element={<RestrictedAccessMsg />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/deposit"
          element={
            <Auth>
              <Deposit />
            </Auth>
          }
        />
        <Route
          path="/withdraw"
          element={
            <Auth>
              <Withdraw />
            </Auth>
          }
        />
        <Route
          path="/transactions"
          element={
            <Auth>
              <Transactions />
            </Auth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
