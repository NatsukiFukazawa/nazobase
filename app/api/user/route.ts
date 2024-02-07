import { NextResponse } from 'next/server';
import { currentUser, auth } from "@clerk/nextjs";
import prisma, { Profile } from '@/services/prisma'

export async function GET() {

  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const dbUser = await prisma.profile.findUnique({
    where: {
      userId
    }
  }) as Profile
  console.log(dbUser)
  return NextResponse.json({ "user": dbUser }, { status: 200 })
}