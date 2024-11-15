import OtpInput from "@/pages/auth/OtpInput";
import Box from "@/components/custom/Box";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import { postAuthReq } from "@/utils/api/authApi";
import modifyEmail from "@/utils/javascript/modifyEmail";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";

const VerifySignUp = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage } = Toastify();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const modifyOtp = otp.join("");
      await postAuthReq("/signup/verify", { otp: modifyOtp });
      localStorage.removeItem("email");
      navigate("/");
    } catch (error) {
      showErrorMessage({
        message: "Something went wrong. Please try later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify</title>
        <meta
          name="discription"
          content="Signup Verify page of Voosh project"
        />
      </Helmet>
      <Box title="Verify your email">
        <div className="text-center text-black">
          <p>Enter the 8 digit code you have received on</p>
          <p className="font-medium">{email ? modifyEmail(email) : ""}</p>
        </div>
        <OtpInput otp={otp} cb={(value: string[]) => setOtp(value)} />
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="btn_submit text-light_white"
        >
          {isLoading ? <Loading /> : "Verify"}
        </button>
      </Box>
    </>
  );
};

export default VerifySignUp;
