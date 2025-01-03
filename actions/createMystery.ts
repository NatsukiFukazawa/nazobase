import { Prisma } from "../services/prisma"

interface Mystery {
  title: string
  explanation: string
  tags: string[]
  difficulty: number
  answer: string
  imageUrl: string
  userId: string
}

export const createMystery = async (mystery: Mystery) => {
  const { userId, ...rest } = mystery
  const payload: Prisma.MysteryCreateInput = {
    ...rest,
    tags: {
      create: [...mystery.tags.map((tag) => ({ tagId: Number(tag) }))],
    },
    profile: {
      connect: { userId: mystery.userId },
    },
  }
  const newMystery = await fetch("/api/mystery", {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  })
  return newMystery
}
