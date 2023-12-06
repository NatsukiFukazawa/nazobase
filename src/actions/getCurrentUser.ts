// import { getServerSession } from "next-auth/next"
import prisma from '@/services/prisma'
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

const getCurrentUsers = async () => {
  const mysteries = await prisma.user.findMany({
    include: {
      favoriteMysteries: {
        include: {
          mystery: true
        }
      },
      mysteries: true
    }
  });
  console.log(mysteries)
  return mysteries
}