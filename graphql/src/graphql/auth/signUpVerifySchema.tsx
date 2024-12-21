import { gql } from "@apollo/client";

export const postSignUpVerifyDataQuery = "signUpUserFinal";

const signUpVerifySchema = gql`
  mutation PostSignUpVerifyUser($otp: String!, $email: String!) {
    signUpUserFinal(otp: $otp, email: $email)
  }
`;

export default signUpVerifySchema;
