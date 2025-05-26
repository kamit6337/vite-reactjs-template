import useLoginCheck from "@/hooks/auth/useLoginCheck";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyOAuthLogin = () => {
  const navigate = useNavigate();
  const token = useSearchParams()[0].get("use");
  const { refetch } = useLoginCheck(false);

  useEffect(() => {
    if (!token) {
      navigate("/login?msg=Issue in OAuth Login. Please try again");
      return;
    }

    Cookies.set("_use", token, { expires: 90 });
    refetch();
    navigate("/");
  }, [token, navigate]);

  return (
    <>
      <Helmet>
        <title>Verify Google Login</title>
        <meta name="description" content="Google OAuth Login" />
      </Helmet>
    </>
  );
};

export default VerifyOAuthLogin;
