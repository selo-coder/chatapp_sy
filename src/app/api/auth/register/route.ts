/* eslint-disable import/prefer-default-export */
import { prismaClient } from "@/database"
import duplicateCheck from "@/database/duplicateCheck"
import { PostRegister } from "@/validation/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body: PostRegister = await req.json()

  const { email, userName } = body

  if (await duplicateCheck([{ email }])) {
    return NextResponse.json(
      {
        success: false,
        message: "E-Mail already in use. Please try another one.",
      },
      { status: 400 }
    )
  }

  if (await duplicateCheck([{ userName }])) {
    return NextResponse.json(
      {
        success: false,
        message: "Username already in use. Please try another one.",
      },
      { status: 400 }
    )
  }

  const registeredAccount = await prismaClient.account.create({
    data: {
      ...body,
    },
  })

  return NextResponse.json(registeredAccount, { status: 200 })
}
