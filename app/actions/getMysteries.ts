// import { getServerSession } from "next-auth/next"
import prisma from "../services/prisma"
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

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
