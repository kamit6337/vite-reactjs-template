import Box from "@/components/custom/Box";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import { postAuthReq } from "@/utils/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"], // Set the path of the error
  });

const NewPassword = () => {
  const { showErrorMessage, showSuccessMessage } = Toastify();
  const navigate = useNavigate();

  const email = useSearchParams()[0].get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const formData = { ...values };
    delete formData.confirmPassword;

    const data = { ...formData, email };

    try {
      const response = await postAuthReq("/newPassword", data);
      showSuccessMessage({ message: response.message });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("error", error);
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>New Password</title>
        <meta name="discription" content="New Password page of Voosh project" />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="New Password">
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
            {isSubmitting ? <Loading /> : "Submit"}
          </button>
        </Box>
      </form>
    </>
  );
};

export default NewPassword;
