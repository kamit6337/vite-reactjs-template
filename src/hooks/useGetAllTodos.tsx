import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllTodos = (toggle = false) => {
  const query = useQuery({
    queryKey: ["All todos"],
    queryFn: () => getReq("/todos"),
    enabled: toggle,
    staleTime: Infinity,
  });

  return query;
};

export default useGetAllTodos;
