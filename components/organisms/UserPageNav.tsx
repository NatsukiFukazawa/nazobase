"use client"
import Link from "next/link"
import { useState } from "react"
import {
  IconSettings,
  IconLogout,
  IconUser,
  IconListSearch,
  IconTimeDuration10,
} from "@tabler/icons-react"
import classes from "./NavbarSimple.module.css"

const data = [
  { link: "userpage", label: "マイページ", icon: IconUser },
  { link: "random-question", label: "ランダム10問", icon: IconTimeDuration10 },
  { link: "#", label: "謎検索", icon: IconListSearch },
  { link: "tag-setting", label: "タグ設定", icon: IconSettings },
]

export function UserPageNav() {
  const [active, setActive] = useState("userpage")

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      href={"/" + item.link}
      key={item.label}
      onClick={() => {
        setActive(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <nav className={classes.navbar}>
      {/* <Group className={classes.header} justify="space-between">
        <Image src="/logo.svg" alt="logo" width={270} height={80} />
      </Group> */}
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  )
}

// export function UserPageNav() {
//   const collectionLinks = collections.map((collection) => (
//     <div className="flex justify-start" key={collection.label}>
//       <Link
//         href={`/${collection.page}`}
//         key={collection.label}
//       >
//         {collection.label}
//       </Link>
//     </div>
//   ));

//   return (
//     <nav className="w-36 border-r border-gray-500">
//       <div className="mx-2">{collectionLinks}</div>
//     </nav>
//   );
// }
