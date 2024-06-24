"use client"

/* eslint-disable react/jsx-props-no-spreading */
import { registerAccount } from "@/clientQueries/auth"
import { PostRegister, registerPostValidation } from "@/validation/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import hashPassword from "@/utils/hashString"
import socket from "@/socket"
import { useCookies } from "react-cookie"
import { motion } from "framer-motion"
import Button from "../common/button"
import Input from "../common/input"

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PostRegister>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(registerPostValidation),
  })
  const [, , removeCookie] = useCookies()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const [registerIsLoading, setRegisterLoading] = useState<boolean>(false)

  const router = useRouter()

  async function handleRegister(data: PostRegister) {
    setRegisterLoading(true)

    const hashedPassword = await hashPassword(data.password)

    const response = await registerAccount({
      ...data,
      password: hashedPassword,
    })

    if (response.ok) {
      const signInResponse = await signIn("credentials", {
        username: data.userName,
        password: data.password,
        redirect: false,
      })

      if (signInResponse?.ok) {
        removeCookie("password")
        removeCookie("userName")

        if (socket.connected === false) socket.connect()

        router.push("/")
      } else {
        setErrorMessage(
          "Fehler bei der Anmeldung. Überprüfen Sie Ihre Eingabe und probieren Sie es erneut"
        )
      }
    } else {
      const responseData = await response.json()
      setErrorMessage(responseData.message)
    }

    setRegisterLoading(false)
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col w-full gap-8 relative"
      autoComplete="off"
    >
      <div className="flex flex-col gap-6">
        <span className="text-2xl">Registrieren</span>
        <div className="w-full h-px bg-gray-500" />
      </div>

      <Input
        error={!!errors.firstName}
        placeholder="Vorname"
        {...register("firstName")}
      />

      <Input
        error={!!errors.lastName}
        placeholder="Nachname"
        {...register("lastName")}
      />

      <Input
        error={!!errors.userName}
        placeholder="Username"
        {...register("userName")}
      />

      <Input
        error={!!errors.email}
        placeholder="E-Mail"
        type="email"
        {...register("email")}
      />

      <Input
        error={!!errors.password}
        placeholder="Passwort"
        type="password"
        {...register("password")}
      />

      <Button label="Registrieren" isLoading={registerIsLoading} />

      <Link
        className="w-fit underline text-xs hover:text-white"
        href="/auth/login"
      >
        Sie haben schon ein Konto? Jetzt anmelden!
      </Link>

      {errorMessage && (
        <span className="text-red-500 text-sm absolute -bottom-12">
          {errorMessage}
        </span>
      )}
    </motion.form>
  )
}
