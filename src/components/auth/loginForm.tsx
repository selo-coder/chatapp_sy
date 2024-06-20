"use client"

import { GetLogin, loginGetValidation } from "@/validation/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useCookies } from "react-cookie"
import socket from "@/socket"
import Button from "../common/button"
import Input from "../common/input"
import Checkbox from "../common/checkbox"

export default function LoginForm() {
  const [cookies, setCookie, removeCookie] = useCookies()

  const [cookieIsActive, setCookieIsActive] = useState<boolean | undefined>(
    undefined
  )

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<GetLogin>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(loginGetValidation),
  })

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [loginIsLoading, setLoginIsLoading] = useState<boolean>(false)

  const router = useRouter()

  async function handleLogin({ password, userName }: GetLogin) {
    setLoginIsLoading(true)
    setErrorMessage(undefined)

    const response = await signIn("credentials", {
      username: userName,
      password,
      redirect: false,
    })

    if (response && response.ok) {
      if (cookieIsActive) {
        setCookie("password", password)
        setCookie("userName", userName)
      }

      if (socket.connected === false) socket.connect()

      router.push("/")
    } else {
      setErrorMessage(
        "Fehler bei der Anmeldung. Überprüfen Sie Ihre Eingaben und probieren Sie es erneut"
      )
    }
    setLoginIsLoading(false)
  }

  useEffect(() => {
    setCookieIsActive(cookies.password && cookies.userName)

    if (cookies.password && cookies.userName) {
      setValue("userName", cookies.userName)
      setValue("password", cookies.password)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (cookieIsActive === false) {
      removeCookie("password")
      removeCookie("userName")
    }

    if (cookieIsActive) {
      setCookie("password", getValues("password"))
      setCookie("userName", getValues("userName"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookieIsActive])

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col w-full gap-8 relative"
      autoComplete="off"
    >
      <div className="flex flex-col gap-6">
        <span className="text-2xl">Anmelden</span>
        <div className="w-full h-px bg-gray-500" />
      </div>

      <Input
        error={!!errors?.userName}
        placeholder="Username"
        {...register("userName")}
      />

      <Input
        error={!!errors?.password}
        placeholder="Passwort"
        type="password"
        {...register("password")}
      />

      <Checkbox
        checked={cookieIsActive}
        onClick={async () => {
          setCookieIsActive(!cookieIsActive)
        }}
      />

      <Button label="Login" isLoading={loginIsLoading} />

      <Link
        className="w-fit underline text-xs hover:text-white"
        href="/auth/register"
      >
        Kein Konto? Erstellen Sie jetzt eins!
      </Link>

      {errorMessage && (
        <span className="text-red-500 text-sm absolute -bottom-16">
          {errorMessage}
        </span>
      )}
    </form>
  )
}
