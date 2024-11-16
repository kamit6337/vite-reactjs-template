import { io, Socket } from "socket.io-client";
import environment from "@/utils/environment";
import Cookies from "js-cookie";

let socket: Socket | null = null;

const getSocket = (): Socket => {
  const token = Cookies.get("_use");

  if (!socket || !socket.connected) {
    socket = io(environment.SERVER_URL, {
      auth: {
        token: `Bearer ${token}`,
      },
      reconnectionAttempts: 5, // Retry up to 5 times
      reconnectionDelay: 1000, // Delay between retries
    });
    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }
  return socket;
};

export default getSocket;
