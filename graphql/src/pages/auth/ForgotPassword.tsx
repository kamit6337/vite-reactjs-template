import forgotPasswordSchema, {
  forgotPasswordDataQuery,
} from "@/graphql/auth/forgotPasswordSchema";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import getGraphql from "@/utils/api/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showErrorMessage, showSuccessMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const { email } = values;

      const response = await getGraphql(
        forgotPasswordSchema,
        forgotPasswordDataQuery,
        {
          email,
        }
      );

      showSuccessMessage({ message: response });

      navigate("/login");
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try later",
      });
    }
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
          disabled={isSubmitting}
          className="auth_btn auth_submit_btn"
        >
          {isSubmitting ? <Loading height={"full"} small={true} /> : "Submit"}
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
