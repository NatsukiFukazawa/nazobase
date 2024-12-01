import { ReactNode } from "react"
import { getCurrentUser } from "../../../actions/getCurrentUser"
import { UserPageHeader } from "../../../components/organisms/UserPageHeader"

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser()
  if (user) {
    return (
      <>
        <>{children}</>
      </>
    )
  } else {
    return (
      <div className="h-full flex items-center justify-center">Loading...</div>
    )
  }
}

export default Layout
