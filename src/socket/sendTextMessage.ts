import { Server } from "socket.io"
import { PersonalChat } from "@/types/personalChat"
import { prismaClient } from "../database/client"
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  ServerSocketExtended,
  ClientSocketExtended,
} from "../types/socket"

export function sendTextMessageServer(
  socket: ServerSocketExtended,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  socket.on(
    "sendTextMessage",
    async ({ recipientId, senderId, textMessage }) => {
      const textMessageResponse = await prismaClient.personalChat.create({
        data: {
          textMessage,
          recipient: { connect: { id: recipientId } },
          sender: { connect: { id: senderId } },
        },
      })

      if (textMessageResponse) {
        socket.emit("sendTextMessage", textMessageResponse)

        io.sockets.sockets.forEach((socketIO) => {
          if (socketIO.data.id === recipientId) {
            io.to(socketIO.id).emit("sendTextMessage", textMessageResponse)
          }
        })
      } else {
        socket.emit("sendTextMessage", null)
      }
    }
  )
}

interface SendTextMessageClientProps {
  socket: ClientSocketExtended
  setCurrentLoadedChat: (
    value: React.SetStateAction<PersonalChat[] | undefined>
  ) => void
}

export function sendTextMessageClient({
  setCurrentLoadedChat,
  socket,
}: SendTextMessageClientProps) {
  socket.on("sendTextMessage", (message) => {
    if (message)
      setCurrentLoadedChat((oldCurrentLoadedChat) => [
        ...(oldCurrentLoadedChat || []),
        message,
      ])
  })
}
