import { prismaClient } from "../database/client"
import { ServerSocketExtended } from "../types/socket"

export default function getUser(socket: ServerSocketExtended) {
  socket.on("getUser", async (userName: string) => {
    const user = await prismaClient.account.findFirst({
      where: {
        userName,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
      },
    })

    socket.emit("getUser", user)
  })
}
