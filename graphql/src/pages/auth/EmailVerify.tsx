import VerifyOTP from "@/components/auth/VerifyOTP";
import emailVerifySchema, {
  emailVerifyDataQuery,
} from "@/graphql/auth/emailVerifySchema";
import Toastify from "@/lib/Toastify";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();

  const [mutate, { loading, error, reset, data }] =
    useMutation(emailVerifySchema);

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, showErrorMessage]);

  useEffect(() => {
    if (data && data[emailVerifyDataQuery]) {
      navigate("/newPassword");
    }
  }, [data, navigate]);

  return (
    <>
      <Helmet>
        <title>Verify</title>
        <meta
          name="discription"
          content="Signup Verify page of Voosh project"
        />
      </Helmet>
      <VerifyOTP mutate={mutate} loading={loading} />
    </>
  );
};
export default EmailVerify;
