import { gql } from "@apollo/client";

export const postSignUpUserDataQuery = "signUpUserInitial";

const signUpSchema = gql`
  mutation PostSignUpUser($name: String!, $email: String!, $password: String!) {
    signUpUserInitial(name: $name, email: $email, password: $password)
  }
`;

export default signUpSchema;
