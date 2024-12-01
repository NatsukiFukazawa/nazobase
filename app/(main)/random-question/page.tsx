import prisma from "../../../services/prisma"
import getMysteries from "../../../actions/getMysteries"
import { Mystery } from "../../../models/Mystery"
import Mysteries from "../../../components/organisms/Mysteries"

export default async function Page() {
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
    <div>
      <h3>Random Question</h3>
      <Mysteries mysteries={mysteries} />
    </div>
  )
}
