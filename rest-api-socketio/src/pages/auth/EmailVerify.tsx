import VerifyOTP from "@/components/auth/VerifyOTP";
import { postAuthReq } from "@/utils/api/authApi";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const navigate = useNavigate();

  const handleVerify = async (email: string, otp: string) => {
    await postAuthReq("/verifyOTP", { email, otp });
    navigate("/newPassword");
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
      <VerifyOTP callback={handleVerify} />
    </>
  );
};
export default EmailVerify;
