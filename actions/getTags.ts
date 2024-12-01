import prisma from "../services/prisma"

const getTags = async () => {
  const tags = await prisma.tag.findMany()
  return tags
}

export default getTags
