"use client"
import db from "@prisma/client"
import { deleteTag } from "../../actions/deleteTag"
import { useRouter } from "next/navigation"
import { Badge, Button } from "@mantine/core"

export function TagRow({ tag }: { tag: db.Tag }) {
  const router = useRouter()
  const handleDelete = async () => {
    await deleteTag(tag.id)
    router.refresh()
  }
  return (
    <div className="flex justify-evenly">
      <Badge color={tag.color} circle></Badge>
      <div className="w-56">{tag.name}</div>
      <Button onClick={handleDelete} size="sm">
        Delete
      </Button>
    </div>
  )
}
