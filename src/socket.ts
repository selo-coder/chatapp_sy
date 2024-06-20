"use client"

import { io } from "socket.io-client"
import { ClientSocketExtended } from "./types/socket"

const socket: ClientSocketExtended = io({
  autoConnect: false,
})

export default socket
