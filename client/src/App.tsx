import { Routes, Route } from "react-router-dom";
import AllData from "./pages/AllData";
import CreateAccount from "./pages/CreateAccount";
import Deposit from "./pages/Deposit";
import Home from "./pages/Home";
import Layout from "./pages/root/Layout";
import Login from "./pages/Login";
import Withdraw from "./pages/Withdraw";
import Auth from "./pages/root/Auth";
import RestrictedAccessMsg from "./pages/root/RestrictedAccessMsg";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restricted-access" element={<RestrictedAccessMsg />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/all-data" element={<AllData />} />

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
      </Route>
    </Routes>
  );
}

export default App;
