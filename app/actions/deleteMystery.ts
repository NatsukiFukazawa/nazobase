import { Prisma } from '@/services/prisma';



export const deleteMystery = async (id:number) => {
  const payload: Prisma.MysteryDeleteArgs = {
    where: {
      id: id
    }
  }
  console.log(payload)
  const result = await fetch('/api/mystery', { method: 'DELETE', body: JSON.stringify({ data: payload }) })
  return result
}