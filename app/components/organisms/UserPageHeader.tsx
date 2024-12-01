"use client"
import { useState } from "react"
import Link from "next/link"
import { Profile } from "@/services/prisma"
import { Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Image from "next/image"
import RegistMysteryModal from "@/components/modals/RegistMysteryModal"
import RegistTagModal from "@/components/modals/RegistTagModal"
import db from "@prisma/client"
import { UserButton } from "@clerk/clerk-react"

const links = [
  { link: "/sign-in", label: "Sign In" },
  { link: "/sign-up", label: "Sign Up" },
]

interface UserPageHeaderProps {
  signed: boolean
  tags: db.Tag[]
}

export function UserPageHeader({ signed, tags }: UserPageHeaderProps) {
  const [active, setActive] = useState(links[0].link)

  const items = links
    .filter(() => !signed)
    .map((link) => (
      <Link
        key={link.label}
        href={link.link}
        data-active={active === link.link || undefined}
        onClick={(event) => {
          event.preventDefault()
          setActive(link.link)
        }}
      >
        {link.label}
      </Link>
    ))

  return (
    <header className="w-full border-b border-gray-600">
      <div className="mx-1 flex justify-between gap-1">
        <span className="flex gap-1">
          <Image src={"/logo.svg"} alt="logo" width={140} height={140} />
          <div className="flex gap-1 items-center">
            <RegistMysteryModal tags={tags} />
            <RegistTagModal />
          </div>
        </span>
        <Group gap={5} visibleFrom="xs">
          {items}
          <div className="w-10">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </Group>
      </div>
    </header>
  )
}
