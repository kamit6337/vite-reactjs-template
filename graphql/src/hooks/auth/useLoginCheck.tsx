import loginCheckSchema, {
  getLoginCheckDataQuery,
} from "@/graphql/auth/loginCheckSchema";
import { useQuery } from "@apollo/client";

const useLoginCheck = () => {
  const query = useQuery(loginCheckSchema);
  return { ...query, data: query.data?.[getLoginCheckDataQuery] };
};

export default useLoginCheck;
