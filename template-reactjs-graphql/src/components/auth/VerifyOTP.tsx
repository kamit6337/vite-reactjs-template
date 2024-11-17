import Toastify from "@/lib/Toastify";
import modifyEmail from "@/utils/javascript/modifyEmail";
import Cookies from "js-cookie";
import { useState } from "react";
import OtpInput from "./OtpInput";
import Loading from "@/lib/Loading";
import { useNavigate } from "react-router-dom";

type Props = {
  mutate: ({
    variables: { email, otp },
  }: {
    variables: { email: string; otp: string };
  }) => void;
  loading: boolean;
};

const VerifyOTP = ({ mutate, loading }: Props) => {
  const navigate = useNavigate();
  const email = Cookies.get("email") as string;
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const { showErrorMessage } = Toastify();

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple calls during loading

    if (!email) {
      showErrorMessage({ message: "Something went wrong" });
      setTimeout(() => {
        navigate(-1);
      }, 5000);
      return;
    }
    const modifyOtp = otp.join("");

    mutate({
      variables: { otp: modifyOtp, email: email },
    });
  };

  return (
    <div className="space-y-10 pt-10">
      <div className="text-center">
        <p>Enter the 6 digit code you have received on</p>
        <p className="font-medium">{email ? modifyEmail(email) : ""}</p>
      </div>
      <OtpInput otp={otp} cb={(value) => setOtp(value)} />
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-12 auth_submit_btn auth_btn"
      >
        {loading ? <Loading small={true} /> : "Verify"}
      </button>
    </div>
  );
};

export default VerifyOTP;
