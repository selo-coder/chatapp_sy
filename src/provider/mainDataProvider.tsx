/* eslint-disable react/jsx-no-constructed-context-values */
import { Account } from "@/types/account"
import { PersonalChat } from "@/types/personalChat"
import useIsMobile from "@/utils/useIsMobile"
import { ReactNode, createContext, useContext, useState } from "react"

export type DataContextType = {
  userList: Account[] | undefined
  setUserList: React.Dispatch<React.SetStateAction<Account[] | undefined>>
  currentSelectedChatUser: Account | undefined
  setCurrentSelectedChatUser: React.Dispatch<
    React.SetStateAction<Account | undefined>
  >
  currentLoadedChat: PersonalChat[] | undefined
  setCurrentLoadedChat: React.Dispatch<
    React.SetStateAction<PersonalChat[] | undefined>
  >
  currentLoadedWindow: "userList" | "chat" | "both" | undefined
  setCurrentLoadedWindow: React.Dispatch<
    React.SetStateAction<"userList" | "chat" | "both" | undefined>
  >
  isMobile: boolean | undefined
}

// #####################  UserList
const UserListContext = createContext<
  Pick<DataContextType, "userList" | "setUserList">
>({
  userList: [],
  setUserList: () => {},
})

export function useUserList() {
  return useContext(UserListContext)
}
// #####################
// #####################  CurrentSelectedChatUser
const CurrentSelectedChatUserContext = createContext<
  Pick<
    DataContextType,
    "currentSelectedChatUser" | "setCurrentSelectedChatUser"
  >
>({
  currentSelectedChatUser: undefined,
  setCurrentSelectedChatUser: () => {},
})

export function useCurrentSelectedChatUser() {
  return useContext(CurrentSelectedChatUserContext)
}
// #####################
// #####################  CurrentLoadedChat
const CurrentLoadedChatContext = createContext<
  Pick<DataContextType, "currentLoadedChat" | "setCurrentLoadedChat">
>({
  currentLoadedChat: [],
  setCurrentLoadedChat: () => {},
})

export function useCurrentLoadedChat() {
  return useContext(CurrentLoadedChatContext)
}
// #####################
// #####################  CurrentLoadedWindow
const CurrentLoadedWindowContext = createContext<
  Pick<DataContextType, "currentLoadedWindow" | "setCurrentLoadedWindow">
>({
  currentLoadedWindow: undefined,
  setCurrentLoadedWindow: () => {},
})

export function useCurrentLoadedWindow() {
  return useContext(CurrentLoadedWindowContext)
}
// ######################
// #####################  isMobile
const IsMobileContext = createContext<Pick<DataContextType, "isMobile">>({
  isMobile: undefined,
})

export function useMobile() {
  return useContext(IsMobileContext)
}
// #####################

export function MainmainDataProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const [userList, setUserList] = useState<Account[]>()
  const [currentSelectedChatUser, setCurrentSelectedChatUser] =
    useState<Account>()
  const [currentLoadedChat, setCurrentLoadedChat] = useState<PersonalChat[]>()
  const [currentLoadedWindow, setCurrentLoadedWindow] = useState<
    "userList" | "chat" | "both" | undefined
  >(undefined)

  return (
    <IsMobileContext.Provider value={{ isMobile }}>
      <CurrentLoadedWindowContext.Provider
        value={{ currentLoadedWindow, setCurrentLoadedWindow }}
      >
        <CurrentLoadedChatContext.Provider
          value={{ currentLoadedChat, setCurrentLoadedChat }}
        >
          <CurrentSelectedChatUserContext.Provider
            value={{ currentSelectedChatUser, setCurrentSelectedChatUser }}
          >
            <UserListContext.Provider value={{ setUserList, userList }}>
              {children}
            </UserListContext.Provider>
          </CurrentSelectedChatUserContext.Provider>
        </CurrentLoadedChatContext.Provider>
      </CurrentLoadedWindowContext.Provider>
    </IsMobileContext.Provider>
  )
}
