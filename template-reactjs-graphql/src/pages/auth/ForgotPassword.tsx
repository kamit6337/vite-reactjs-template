import forgotPasswordSchema, {
  forgotPasswordDataQuery,
} from "@/graphql/auth/forgotPasswordSchema";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();
  const [mutate, { loading, error, data, reset }] =
    useMutation(forgotPasswordSchema);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, showErrorMessage]);

  useEffect(() => {
    if (data && data[forgotPasswordDataQuery]) {
      Cookies.set("email", getValues().email, { expires: 1 });

      navigate("/email/verify");
    }
  }, [data]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (loading) return;

    mutate({
      variables: values,
    });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="discription"
          content="Forgot Password page of this project"
        />
      </Helmet>
      <p className="auth_page_title">Forgot Password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
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

export default ForgotPassword;
