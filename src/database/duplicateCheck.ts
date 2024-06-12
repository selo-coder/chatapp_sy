import { prismaClient } from "@/database"

export default async function duplicateCheck(
  objectList: any[],
  type: "OR" | "AND" = "OR"
) {
  const duplicateCheckResult = await prismaClient.account.findFirst({
    where: {
      [type]: objectList,
    },
  })

  return duplicateCheckResult !== null
}
