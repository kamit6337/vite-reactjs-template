import SocketConnectionProvider from "@/providers/SocketConnectionProvider";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <SocketConnectionProvider>
      <Outlet />
    </SocketConnectionProvider>
  );
};

export default RootLayout;
