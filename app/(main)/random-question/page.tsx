import getMysteries from "@/actions/getMysteries"
import { Mystery } from "@/models/Mystery"
import { Button } from "@mantine/core"
import MysteryRandomSlider from "@/components/modals/MysteryRandomSlider"

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
      <MysteryRandomSlider mysteries={mysteries} opened={true} />
    </div>
  )
}
