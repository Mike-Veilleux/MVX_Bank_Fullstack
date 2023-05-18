import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const Layout = () => {
  return (
    <Stack>
      <NavigationBar />
      <Stack style={{ alignItems: "center", marginTop: 20 }}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default Layout;
