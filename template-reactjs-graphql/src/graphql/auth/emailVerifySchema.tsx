import { gql } from "@apollo/client";

export const emailVerifyDataQuery = "otpVerification";

const emailVerifySchema = gql`
  mutation PostEmailverify($otp: String!, $email: String!) {
    otpVerification(otp: $otp, email: $email)
  }
`;

export default emailVerifySchema;
