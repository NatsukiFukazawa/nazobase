import { Profile } from "@/services/prisma"

interface User {
  id: string
}

export const getCurrentUser = async (): Promise<Profile> => {
  console.trace()
  const response = await fetch(`/api/user/`)
  const data = await response.json()
  return data.user
}
