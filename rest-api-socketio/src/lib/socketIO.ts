import getSocket from "./socketConnection";

const socket = getSocket();

export const isConnected = () => {
  socket.emit("isConnected", "i am from client", (response: string) => {
    console.log(response); // ojIckSD2jqNzOqIrAGzL
  });
};

// Join rooms
export const joinRooms = (rooms: string[]) => {
  socket.emit("joinRooms", rooms);
};

// NOTE: EXAMPLE SOCKET HANDLERS
export const onExampleSocket = (callback: (value: string) => void) => {
  socket.on("exampleSocket", callback);
};

export const offExampleSocket = (callback: (value: string) => void) => {
  socket.off("exampleSocket", callback);
};
