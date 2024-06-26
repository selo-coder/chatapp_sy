/* eslint-disable import/prefer-default-export */
import { prismaClient } from "@/database"
import { PersonalChat } from "@/types/personalChat"
import {
  ClientSocketExtended,
  ClientToServerEvents,
  InterServerEvents,
  ServerSocketExtended,
  ServerToClientEvents,
  SocketData,
} from "@/types/socket"
import AWS from "aws-sdk"
import { Server } from "socket.io"

export function deleteTextMessageServer(
  socket: ServerSocketExtended,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  socket.on("deleteTextMessage", async ({ id, recipientId, imageUrl }) => {
    if (imageUrl) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      })

      const imageUrlSplitted = imageUrl.split("/")
      const fileName = imageUrlSplitted[imageUrlSplitted.length - 1]

      await s3
        .deleteObject({
          Bucket: "chatappbucketsy",
          Key: fileName,
        })
        .promise()
    }

    const textMessageResponse = await prismaClient.personalChat.delete({
      where: { id },
    })

    if (textMessageResponse) {
      socket.emit("deleteTextMessage", textMessageResponse)

      io.sockets.sockets.forEach((socketIO) => {
        if (socketIO.data.id === recipientId) {
          io.to(socketIO.id).emit("deleteTextMessage", textMessageResponse)
        }
      })
    } else {
      socket.emit("deleteTextMessage", null)
    }
  })
}

interface DeleteTextMessageClientProps {
  socket: ClientSocketExtended
  setCurrentLoadedChat: (
    value: React.SetStateAction<PersonalChat[] | undefined>
  ) => void
  userId: string | undefined
  currentSelectedChatUserId: string | undefined
}

export function deleteTextMessageClient({
  setCurrentLoadedChat,
  socket,
  userId,
  currentSelectedChatUserId,
}: DeleteTextMessageClientProps) {
  socket.on("deleteTextMessage", (message) => {
    if (
      message &&
      (userId === message.senderId ||
        currentSelectedChatUserId === message.senderId)
    )
      setCurrentLoadedChat((oldCurrentLoadedChat) =>
        oldCurrentLoadedChat?.filter((msg) => msg.id !== message.id)
      )
  })
}
