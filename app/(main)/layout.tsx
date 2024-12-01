import { UserPageNav } from "@/components/organisms/UserPageNav"
import { UserPageHeader } from "@/components/organisms/UserPageHeader"
import ClientOnly from "@/components/ClientOnly"
import getTags from "@/actions/getTags"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tags = await getTags()
  return (
    <div className="h-full">
      <ClientOnly>
        <div className="flex h-full">
          <div className="w-1/5">
            <UserPageNav />
          </div>
          <div className="w-4/5">
            <UserPageHeader signed={true} tags={tags} />
            {children}
          </div>
        </div>
      </ClientOnly>
    </div>
  )
}
