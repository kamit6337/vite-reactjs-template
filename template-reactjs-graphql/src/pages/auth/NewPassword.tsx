import ReactIcons from "@/assets/icons";
import newPasswordSchema, {
  newPasswordDataQuery,
} from "@/graphql/auth/newPasswordSchema";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"], // Set the path of the error
  });

const NewPassword = () => {
  const email = Cookies.get("email");
  const { showErrorMessage } = Toastify();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordInFocus, setPasswordInFocus] = useState(false);
  const [confirmPasswordInFocus, setConfirmPasswordInFocus] = useState(false);

  const [mutate, { loading, error, reset, data }] =
    useMutation(newPasswordSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, showErrorMessage]);

  useEffect(() => {
    if (data && data[newPasswordDataQuery]) {
      Cookies.remove("email");
      navigate("/login");
    }
  }, [data]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (loading) return;

    if (!email) {
      showErrorMessage({ message: "Something went wrong. Please try again." });
      setTimeout(() => {
        navigate("/forgotPassword");
      }, 5000);
      return;
    }

    const formData = { ...values };
    delete formData.confirmPassword;

    const data = { ...formData, email };

    mutate({
      variables: data,
    });
  };

  return (
    <>
      <Helmet>
        <title>New Password</title>
        <meta name="discription" content="New Password page of Voosh project" />
      </Helmet>
      <p className="auth_page_title">New Password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        {/* MARK: PASSWORD FIELD*/}
        <div>
          <div
            className={`${
              passwordInFocus ? "border-white" : "border-auth_input_border"
            }  h-12 flex justify-between items-center border  rounded-lg w-full `}
          >
            <input
              type={toggle.password ? "text" : "password"}
              {...register("password", { required: "Password in required" })}
              placeholder="Password"
              className="auth_input_password"
              onFocus={() => setPasswordInFocus(true)}
              onBlur={() => setPasswordInFocus(false)}
            />

            <div
              className={`text-gray-300 cursor-pointer w-14 h-full flex justify-center items-center`}
              onClick={() =>
                setToggle((prev) => {
                  return {
                    ...prev,
                    password: !prev.password,
                  };
                })
              }
            >
              {toggle.password ? (
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

        {/* MARK: CONFIRM PASSWORD FIELD*/}
        <div>
          <div
            className={`${
              confirmPasswordInFocus
                ? "border-white"
                : "border-auth_input_border"
            }  h-12 flex justify-between items-center border  rounded-lg w-full `}
          >
            <input
              type={toggle.confirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password in required",
              })}
              placeholder="Confirm Password"
              className="auth_input_password"
              onFocus={() => setConfirmPasswordInFocus(true)}
              onBlur={() => setConfirmPasswordInFocus(false)}
            />

            <div
              className={`text-gray-300 cursor-pointer w-14 h-full flex justify-center items-center`}
              onClick={() =>
                setToggle((prev) => {
                  return {
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  };
                })
              }
            >
              {toggle.confirmPassword ? (
                <ReactIcons.eyeOff className="text-xl" />
              ) : (
                <ReactIcons.eyeOn className="text-xl" />
              )}
            </div>
          </div>
          <p role="alert" className="text-xs text-red-500 pl-2 h-4 mt-[2px]">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth_btn auth_submit_btn"
        >
          {loading ? <Loading hScreen={false} small={true} /> : "Submit"}
        </button>
      </form>
    </>
  );
};

export default NewPassword;
