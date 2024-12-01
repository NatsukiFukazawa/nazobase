import { FC } from "react"
import Mysteries from "@/components/organisms/Mysteries"
import getMysteries from "@/actions/getMysteries"
import { Mystery } from "@/models/Mystery"

const UserMainPage: FC = async () => {
  const res = await getMysteries()
  const mysteries: Mystery[] = res.map((mystery) => ({
    id: mystery.id,
    imageUrl: mystery.imageUrl,
    title: mystery.title,
    difficulty: mystery.difficulty,
    explanation: mystery.explanation,
    answer: mystery.answer,
    tags: mystery.tags.map((tag) => ({
      id: tag.tag.id,
      name: tag.tag.name,
      color: tag.tag.color,
    })),
  }))
  return (
    <>
      <div className="m-4">
        <Mysteries mysteries={mysteries} />
      </div>
    </>
  )
}

export default UserMainPage
