/* eslint-disable import/prefer-default-export */

import { prismaClient } from "@/database"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const { password, userName } = {
    userName: searchParams.get("userName") || undefined,
    password: searchParams.get("password") || undefined,
  }

  const account = await prismaClient.account.findFirst({
    where: {
      userName,
    },
  })

  if (account == null)
    return NextResponse.json(
      {
        success: false,
        message: "Username incorrect. Please check inputs and try again.",
      },
      { status: 400 }
    )

  const isPasswordCorrect = await bcrypt.compare(
    password as string,
    account.password
  )

  if (!isPasswordCorrect)
    return NextResponse.json(
      {
        success: false,
        message: "Password incorrect. Please check inputs and try again.",
      },
      { status: 400 }
    )

  return NextResponse.json(account, { status: 200 })
}
