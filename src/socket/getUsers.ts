import { prismaClient } from "../database/client"
import { ServerSocketExtended } from "../types/socket"

export default function getUsers(socket: ServerSocketExtended) {
  socket.on("getUsers", async (userName: string) => {
    const users = await prismaClient.account.findMany({
      where: {
        userName: {
          contains: userName,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
      },
    })

    socket.emit("getUsers", users)
  })
}
