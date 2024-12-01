import prisma from "../services/prisma"

const getMysteries = async () => {
  const mysteries = await prisma.mystery.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
  return mysteries
}

export default getMysteries
