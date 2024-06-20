import { ServerSocketExtended, ServerExtended } from "@/types/socket"

export default function sendInitialUserInfo(
  socket: ServerSocketExtended,
  io: ServerExtended
) {
  socket.on("sendInitialUserInfo", (id) => {
    // eslint-disable-next-line no-param-reassign
    socket.data.id = id
    io.emit("sendOnlineStatus", { id: socket.data.id, isOnline: true })
  })
}
