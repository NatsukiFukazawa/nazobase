import { Prisma } from "@/services/prisma"

export const deleteTag = async (id: number) => {
  const payload: Prisma.TagDeleteArgs = {
    where: {
      id: id,
    },
  }
  const result = await fetch("/api/tag", {
    method: "DELETE",
    body: JSON.stringify({ data: payload }),
  })
  return result
}
