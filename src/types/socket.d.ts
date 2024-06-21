import { Server, Socket } from "socket.io"
import { Socket as ClientSocket } from "socket.io-client"
import { Account } from "./account"
import { PersonalChat } from "./personalChat"

export interface ServerToClientEvents {
  sendOnlineStatus: ({
    id,
    isOnline,
  }: {
    id: string
    isOnline: boolean
  }) => void
  getAllUsers: (users: Account[]) => void
  getUsers: (users: Account[]) => void
  getUser: (user: Account | null) => void
  sendTextMessage: (message: PersonalChat | null) => void
  getAllMessages: (messages: PersonalChat[]) => void
  getNewestMessage: (message: PersonalChat | null) => void
}

export interface ClientToServerEvents {
  sendInitialUserInfo: (id: string) => void
  getAllUsers: (senderId: string) => void
  getUsers: (userName: string) => void
  getUser: (userName: string) => void
  sendTextMessage: ({
    image,
    textMessage,
    senderId,
    recipientId,
  }: {
    image: string | null
    textMessage: string | null
    senderId: string
    recipientId: string
  }) => void
  getAllMessages: ({
    senderId,
    recipientId,
  }: {
    senderId: string
    recipientId: string
  }) => void
  getNewestMessage: ({
    senderId,
    recipientId,
  }: {
    senderId: string
    recipientId: string
  }) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  id: string
}

export type ServerSocketExtended = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

export type ClientSocketExtended = ClientSocket<
  ServerToClientEvents,
  ClientToServerEvents
>

export type ServerExtended = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>
