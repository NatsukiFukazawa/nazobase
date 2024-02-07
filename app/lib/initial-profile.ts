import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import db from "@/services/prisma";

export const initialProfile = async () => {
  const user = await currentUser();
  console.log(user)
  if (!user) {
    return redirectToSignIn();
  }
  const userProfile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (userProfile) {
    return userProfile;
  }
  const profile = await db.profile.create({
    data: {
      userId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.username,
    },
  })
  return profile;
}

