import { gql } from "@apollo/client";

export const forgotPasswordDataQuery = "forgotPassword";

const forgotPasswordSchema = gql`
  mutation PostForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export default forgotPasswordSchema;
