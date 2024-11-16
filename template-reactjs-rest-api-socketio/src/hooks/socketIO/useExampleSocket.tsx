import { offExampleSocket, onExampleSocket } from "@/lib/socketIO";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useExampleSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleExample = (response: string) => {
      console.log("example response", response);
    };

    onExampleSocket(handleExample);

    return () => {
      offExampleSocket(handleExample);
    };
  }, [queryClient]);

  return;
};

export default useExampleSocket;
