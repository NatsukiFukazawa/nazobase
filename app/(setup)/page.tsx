import { initialProfile } from "../lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

const SetupPage = async () => {
  const profile = await initialProfile();
  console.log(profile)
  if (profile) { redirect('/userpage') } else {
    redirectToSignIn()
  }
}

export default SetupPage;