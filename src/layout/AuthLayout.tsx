import { ToastContainer } from "@/lib/Toastify";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="">
      <Outlet />
      <ToastContainer />
    </main>
  );
};

export default AuthLayout;
