import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import Cookies from "js-cookie";
import VerifyOTP from "@/components/auth/VerifyOTP";
import { useApolloClient, useMutation } from "@apollo/client";
import signUpVerifySchema, {
  postSignUpVerifyDataQuery,
} from "@/graphql/auth/signUpVerifySchema";
import { useEffect } from "react";
import Toastify from "@/lib/Toastify";
import { getLoginCheckDataQuery } from "@/graphql/auth/loginCheckSchema";

const VerifySignUp = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();

  const [mutate, { loading, error, reset, data }] =
    useMutation(signUpVerifySchema);

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, showErrorMessage]);

  useEffect(() => {
    if (data && data[postSignUpVerifyDataQuery]) {
      const token = data[postSignUpVerifyDataQuery];

      Cookies.set("_use", token, { expires: 30 });
      Cookies.remove("email");

      // Evict the loginCheck query from the cache
      client.cache.evict({
        id: "ROOT_QUERY", // Root query ID
        fieldName: getLoginCheckDataQuery, // Field name to invalidate
      });

      // Optional: Clean up evicted cache
      client.cache.gc();

      navigate("/");
    }
  }, [data, client, navigate, postSignUpVerifyDataQuery]);

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

export default VerifySignUp;
