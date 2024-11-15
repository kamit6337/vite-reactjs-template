import Box from "@/components/custom/Box";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import { postAuthReq } from "@/utils/api/authApi";
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
      const response = await postAuthReq("/forgot", values);
      showSuccessMessage({ message: response.message });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
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
          content="Forgot Password page of Voosh project"
        />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Forgot Password">
          <div>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />
            {errors.email?.message && (
              <p className="input_error">{errors.email.message}</p>
            )}
          </div>
          <button
            className="btn_submit text-light_white"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? <Loading /> : "Submit"}
          </button>
        </Box>
      </form>
    </>
  );
};

export default ForgotPassword;
