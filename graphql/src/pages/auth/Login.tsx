import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import environment from "@/utils/environment";
import Helmet from "react-helmet";
import { useEffect, useLayoutEffect, useState } from "react";
import CustomImages from "@/assets/images";
import ReactIcons from "@/assets/icons";
import Cookies from "js-cookie";
import { useApolloClient, useMutation } from "@apollo/client";
import loginSchema, {
  postLoginUserDataQuery,
} from "@/graphql/auth/loginSchema";
import { getLoginCheckDataQuery } from "@/graphql/auth/loginCheckSchema";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const errMsg = useSearchParams()[0].get("msg");
  const { showErrorMessage } = Toastify();
  const [togglePassword, setTogglePassword] = useState(false);
  const [passwordInFocus, setPasswordInFocus] = useState(false);

  const [mutate, { loading, error, reset, data }] = useMutation(loginSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useLayoutEffect(() => {
    if (errMsg) {
      showErrorMessage({ message: errMsg });
    }
  }, [errMsg, showErrorMessage]);

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, showErrorMessage]);

  useEffect(() => {
    if (data && data[postLoginUserDataQuery]) {
      const token = data[postLoginUserDataQuery];

      Cookies.set("_use", token, { expires: 30 });

      // Evict the loginCheck query from the cache
      client.cache.evict({
        id: "ROOT_QUERY", // Root query ID
        fieldName: getLoginCheckDataQuery, // Field name to invalidate
      });

      // Optional: Clean up evicted cache
      client.cache.gc();

      navigate("/");
    }
  }, [data]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (loading) return;

    mutate({
      variables: values,
    });
  };

  const googleOAuth = () => {
    const url = `${environment.SERVER_URL}/auth/google`;
    const openWindow = window.open(url, "_self");

    if (!openWindow) {
      showErrorMessage({
        message:
          "Error in Google OAuth login. Try login with Email and Password",
      });
    } else {
      openWindow.onerror = () => {
        showErrorMessage({
          message:
            "Error in Google OAuth login. Try login with Email and Password",
        });
      };
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="discription" content="Login page of Voosh project" />
      </Helmet>
      {/* MARK: HEADLINE*/}
      <p className="auth_page_title">Sign In.</p>

      {/* MARK: GO TO OAUTH LOGIN PAGE*/}
      <div
        className="border border-auth_input_border rounded-lg py-3 w-full cursor-pointer flex justify-center items-center gap-4"
        onClick={() => googleOAuth()}
      >
        <div className="w-6">
          <img
            src={CustomImages.googleIcon}
            alt="Google Icon"
            className="w-full object-cover bg-transparent"
          />
        </div>
        <p>Continue with Google</p>
      </div>

      <div className="w-full flex items-center gap-2 my-10">
        <div className="flex-1 h-[2px]  bg-auth_input_border" />
        <p className="text-auth_input_border">Or</p>
        <div className="flex-1 h-[2px]  bg-auth_input_border" />
      </div>

      {/* MARK: FORM AND GO TO LOGIN BUTTON*/}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        {/* MARK: EMAIL FIELD*/}
        <div className="w-full">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            className="auth_input"
            autoComplete="off"
            spellCheck="false"
          />

          <p role="alert" className="text-xs text-red-500 pl-2 h-4 mt-[2px]">
            {errors.email?.message}
          </p>
        </div>

        {/* MARK: PASSWORD FIELD*/}
        <div>
          <div
            className={`${
              passwordInFocus ? "border-white" : "border-auth_input_border"
            }  h-12 flex justify-between items-center border  rounded-lg w-full `}
          >
            <input
              type={togglePassword ? "text" : "password"}
              {...register("password", { required: "Password in required" })}
              placeholder="Password"
              className="auth_input_password"
              onFocus={() => setPasswordInFocus(true)}
              onBlur={() => setPasswordInFocus(false)}
            />

            <div
              className={`${
                passwordInFocus ? "text-auth_text" : "text-auth_input_border"
              }  cursor-pointer w-14 h-full flex justify-center items-center`}
              onClick={() => setTogglePassword((prev) => !prev)}
            >
              {togglePassword ? (
                <ReactIcons.eyeOff className="text-xl" />
              ) : (
                <ReactIcons.eyeOn className="text-xl" />
              )}
            </div>
          </div>
          <p role="alert" className="text-xs text-red-500 pl-2 h-4 mt-[2px]">
            {errors.password?.message}
          </p>
        </div>

        {/* MARK: SUBMIT BUTTON*/}
        <div className="space-y-2">
          <button
            type="submit"
            disabled={loading}
            className="auth_btn auth_submit_btn"
          >
            {loading ? <Loading hScreen={false} small={true} /> : "Sign In."}
          </button>
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm">don’t have an account?</p>
            <Link to={`/signup`}>
              <p className="font-bold">Create a account</p>
            </Link>
          </div>
          <div className="font-bold flex justify-center">
            <Link to={`/forgotPassword`}>Forgot Password</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
