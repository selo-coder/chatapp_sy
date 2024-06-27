import { Server } from "socket.io"
import { createServer } from "node:http"
import next from "next"
import { sendTextMessageServer } from "@/socket/sendTextMessage"
import { getAllMessagesServer } from "@/socket/getAllMessages"
import getNewestMessage from "@/socket/getNewestMessage"
import { getAllUsersServer } from "@/socket/getAllUsers"
import getUsers from "@/socket/getUsers"
import getUser from "@/socket/getUser"
import disconnectServer from "@/socket/disconnect"
import sendInitialUserInfo from "@/socket/sendInitialUserInfo"
import { deleteTextMessageServer } from "@/socket/deleteTextMessage"
import { forwardTextMessageServer } from "@/socket/forwardTextMessage"
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  ServerSocketExtended,
} from "./src/types/socket"

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer)

  io.on("connection", (socket: ServerSocketExtended) => {
    //
    // Get and then set user id from the database in socket.data
    sendInitialUserInfo(socket, io)

    //
    // Get a message, with recipientId and senderId, then forward them accordingly
    forwardTextMessageServer(socket, io)

    //
    // Broadcast new IsOnline Status to all users on disconnect of socket
    disconnectServer(socket, io)

    //
    // send a sorted list of all users
    getAllUsersServer(socket, io)

    //
    // send text message with a string and by a pair of recipientId and senderId
    sendTextMessageServer(socket, io)

    //
    // delete text message via message id
    deleteTextMessageServer(socket, io)

    //
    // Get newest message by pair of recipientId and senderId
    getNewestMessage(socket)

    //
    // Get all messages by pair of recipientId and senderId
    getAllMessagesServer(socket)

    //
    // get list of Users by userName contains check ( For User Search )
    getUsers(socket)

    //
    // get 1 User by userName check ( For User Search )
    getUser(socket)
  })

  httpServer
    .once("error", (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
