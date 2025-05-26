import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import Cookies from "js-cookie";
import VerifyOTP from "@/components/auth/VerifyOTP";
import getGraphql from "@/utils/api/graphql";
import signUpUserFinalSchema, {
  signUpUserFinalDataQuery,
} from "@/graphql/auth/signUpUserFinalSchema";
import useLoginCheck from "@/hooks/auth/useLoginCheck";

const VerifySignUp = () => {
  const { refetch } = useLoginCheck(false);
  const navigate = useNavigate();

  const handleVerify = async (email: string, otp: string) => {
    const token = await getGraphql(
      signUpUserFinalSchema,
      signUpUserFinalDataQuery,
      { email, otp }
    );

    Cookies.set("_use", token, { expires: 90 });
    sessionStorage.removeItem("email");
    Cookies.remove("email");
    refetch();
    navigate("/");
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

export default VerifySignUp;
