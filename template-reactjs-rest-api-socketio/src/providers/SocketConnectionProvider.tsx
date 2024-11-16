import useExampleSocket from "@/hooks/socketIO/useExampleSocket";
import { isConnected } from "@/lib/socketIO";
import { useEffect } from "react";

const SocketConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    isConnected();
  }, []);

  useExampleSocket();

  return <>{children}</>;
};

export default SocketConnectionProvider;
