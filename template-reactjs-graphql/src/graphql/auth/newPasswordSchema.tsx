import { gql } from "@apollo/client";

export const newPasswordDataQuery = "newPassword";

const newPasswordSchema = gql`
  mutation PostNewPassword($email: String!, $password: String!) {
    newPassword(email: $email, password: $password)
  }
`;

export default newPasswordSchema;
