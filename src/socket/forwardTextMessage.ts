import { Server } from "socket.io"
import { PersonalChat } from "@/types/personalChat"
import AWS from "aws-sdk"
import { v4 as uuidv4 } from "uuid"
import { prismaClient } from "../database/client"
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  ServerSocketExtended,
  ClientSocketExtended,
} from "../types/socket"

export function forwardTextMessageServer(
  socket: ServerSocketExtended,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  socket.on(
    "forwardTextMessage",
    async ({ message, recipientId, senderId }) => {
      let imageUrl: null | string = null

      if (message.imageUrl) {
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        })

        const imageUrlSplitted = message.imageUrl.split("/")
        const fileName = imageUrlSplitted[imageUrlSplitted.length - 1]
        const newFileName = `${uuidv4()}.${fileName.split(".")[1]}`

        const response = await s3
          .copyObject({
            CopySource: encodeURI(`/chatappbucketsy/${fileName}`),
            Bucket: "chatappbucketsy",
            Key: newFileName,
          })
          .promise()

        if (response)
          imageUrl = `https://chatappbucketsy.s3.eu-central-1.amazonaws.com/${newFileName}`
      }

      const textMessageResponse = await prismaClient.personalChat.create({
        data: {
          textMessage: message.textMessage,
          imageUrl,
          recipient: { connect: { id: recipientId } },
          sender: { connect: { id: senderId } },
        },
      })

      if (textMessageResponse) {
        socket.emit("forwardTextMessage", textMessageResponse)

        io.sockets.sockets.forEach((socketIO) => {
          if (socketIO.data.id === recipientId) {
            io.to(socketIO.id).emit("forwardTextMessage", textMessageResponse)
          }
        })
      } else {
        socket.emit("forwardTextMessage", null)
      }
    }
  )
}

interface ForwardTextMessageClientProps {
  socket: ClientSocketExtended
  setCurrentLoadedChat: (
    value: React.SetStateAction<PersonalChat[] | undefined>
  ) => void
  userId: string | undefined
  currentSelectedChatUserId: string | undefined
}

export function forwardTextMessageClient({
  setCurrentLoadedChat,
  socket,
  userId,
  currentSelectedChatUserId,
}: ForwardTextMessageClientProps) {
  socket.on("forwardTextMessage", (message) => {
    if (
      message &&
      (userId === message.senderId ||
        currentSelectedChatUserId === message.senderId)
    )
      setCurrentLoadedChat((oldCurrentLoadedChat) => [
        ...(oldCurrentLoadedChat || []),
        message,
      ])
  })
}
