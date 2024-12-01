import { Prisma } from "@/services/prisma"

interface Tag {
  name: string
  color: string
}

export const createTag = async (tag: Tag) => {
  const payload: Prisma.TagCreateInput = {
    ...tag,
  }
  const newMystery = await fetch("/api/tag", {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  })
  return newMystery
}

export const createTagMany = async (tags: Tag[]) => {
  const payload: { data: Prisma.TagCreateManyInput[] } = {
    data: tags,
  }
  const result = await fetch("/api/tag", {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  })
  return result
}
