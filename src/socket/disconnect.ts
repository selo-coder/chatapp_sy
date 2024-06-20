import { ServerSocketExtended, ServerExtended } from "@/types/socket"

export default function disconnectServer(
  socket: ServerSocketExtended,
  io: ServerExtended
) {
  socket.on("disconnect", () => {
    io.emit("sendOnlineStatus", { id: socket.data.id, isOnline: false })
  })
}
