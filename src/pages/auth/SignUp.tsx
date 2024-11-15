import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Box from "@/components/custom/Box";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "@/lib/Toastify";
import { postAuthReq } from "@/utils/api/authApi";
import Loading from "@/lib/Loading";
import environment from "@/utils/environment";
import Helmet from "react-helmet";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"], // Set the path of the error
  });

const SignUp = () => {
  const { showErrorMessage } = Toastify();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const formData = { ...values };

    delete formData.confirmPassword;

    try {
      await postAuthReq("/signup", formData);
      localStorage.setItem("email", formData.email);
      navigate("/signup/verify");
    } catch (error) {
      console.log("error", error);
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    }
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
        <title>SignUp</title>
        <meta name="discription" content="Sign up page of Voosh project" />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Sign Up">
          <div>
            <input
              {...register("name")}
              className="input"
              placeholder="First Name"
            />
            {errors.name && (
              <p className="input_error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="input_error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="input_error">{errors.password.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              className="input"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="input_error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn_submit text-light_white"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loading /> : "Signup"}
          </button>
          <div className="flex justify-center gap-2 font-semibold ">
            <p className="text-black">Already have an account?</p>
            <Link to={`/login`} className="text-dark_blue">
              Login
            </Link>
          </div>
          <div className="flex justify-center">
            <div
              className="bg-dark_blue p-2 rounded-lg text-white cursor-pointer"
              onClick={googleOAuth}
            >
              Signup with{" "}
              <span className="font-semibold tracking-wider">Google</span>
            </div>
          </div>
        </Box>
      </form>
    </>
  );
};

export default SignUp;
