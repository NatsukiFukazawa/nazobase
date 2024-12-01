"use client"
import { Badge } from "@mantine/core"
import { Tag } from "@prisma/client"
import { toRGB } from "../../utils/toRGB"

type PropsTag = Omit<Tag, "createdAt" | "updatedAt">

export function TagChip({ tag }: { tag: PropsTag }) {
  const { name, color } = tag
  const toRGBColor = toRGB(color)
  return (
    // <Badge color={toRGBColor} variant='outline'>
    //   {name}
    // </Badge>
    <div
      className="h-6 w-fit rounded-xl flex justify-center items-center text-xs px-3"
      style={{ backgroundColor: toRGBColor }}
    >
      {name}
    </div>
  )
}
