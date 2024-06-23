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
    async ({ recipientId, senderId, textMessage, image }) => {
      let imageUrl: null | string = null

      if (image != null) {
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        })

        const base64Data = Buffer.from(
          image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        )

        const type = image.split(";")[0].split("/")[1]

        const fileName = `${uuidv4()}.${type}`

        const response = await s3
          .putObject({
            Body: base64Data,
            Bucket: "chatappbucketsy",
            Key: fileName,
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
          })
          .promise()

        if (response)
          imageUrl = `https://chatappbucketsy.s3.eu-central-1.amazonaws.com/${fileName}`
      }

      const textMessageResponse = await prismaClient.personalChat.create({
        data: {
          textMessage,
          imageUrl,
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
  userId: string | undefined
  currentSelectedChatUserId: string | undefined
}

export function sendTextMessageClient({
  setCurrentLoadedChat,
  socket,
  userId,
  currentSelectedChatUserId,
}: SendTextMessageClientProps) {
  socket.on("sendTextMessage", (message) => {
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
