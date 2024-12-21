import { gql } from "@apollo/client";

export const postLoginUserDataQuery = "loginUser";

const loginSchema = gql`
  mutation PostLoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export default loginSchema;
