import { Prisma } from '@/services/prisma';


interface Tag {
  name: string;
  color:string;
}

export const createTag = async (tag: Tag) => {
  const payload: Prisma.TagCreateInput = {
    ...tag,
  }
  console.log(payload)
  const newMystery = await fetch('/api/tag', { method: 'POST', body: JSON.stringify({ data: payload }) })

  console.log(newMystery)
  return newMystery
}