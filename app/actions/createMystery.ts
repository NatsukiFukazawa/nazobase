import { Prisma } from '@/services/prisma';


interface Mystery {
  title: string;
  explanation: string;
  tags: string[];
  difficulty: number;
  answer: string;
  imageUrl: string;
  userId: string;
}

export const createMystery = async (mystery: Mystery) => {
  const {userId,...rest} = mystery
  const payload: Prisma.MysteryCreateInput = {
    ...rest,
    tags: {
      connect: mystery.tags.map((tag) => ({ id: Number(tag) }))
    },
    profile: {
      connect: { userId: mystery.userId }
    }
  }
  console.log(payload)
  const newMystery = await fetch('/api/mystery', { method: 'POST', body: JSON.stringify({ data: payload }) })

  console.log(newMystery)
  return newMystery
}