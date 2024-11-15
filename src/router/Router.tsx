import { Routes, Route } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import VerifySignUp from "@/pages/auth/VerifySignUp";
import Home from "@/pages/home/Home";
import AuthLayout from "@/layout/AuthLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NewPassword from "@/pages/auth/NewPassword";

const Router = () => {
  return (
    <Routes>
      {/* NOTE: AUTH ROUTES */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifySignUp />} />
        <Route path="/oauth" element={<VerifySignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
      </Route>

      {/* NOTE: ROOTLAYOUT */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
