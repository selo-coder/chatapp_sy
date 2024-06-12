import { PostRegister } from "@/validation/auth"
import useSWR, { mutate } from "swr"
import fetcher from "./fetcher"

const URIRegister = `/api/auth/register`
const URILogin = `/api/auth/login`

export const registerAccount = async (
  project: PostRegister
): Promise<Response> => {
  const result = await fetch(URIRegister, {
    method: "POST",
    body: JSON.stringify({
      ...project,
    }),
  })
  if (result.status === 200) {
    await mutate((key) => typeof key === "string" && key.includes(URIRegister))
  }

  return result
}

export function useAccount(userName: string, password: string) {
  const uri = `${URILogin}?userName=${userName}&password=${password}`

  const query = useSWR(uri, fetcher<any>)
  const account = query.data

  return {
    ...query,
    data: account,
  }
}
