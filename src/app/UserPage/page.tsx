import { FC } from "react";
import Mysteries, { Mystery } from "@/components/organisms/Mysteries";
import ClientOnly from "@/components/ClientOnly";
import getMysteries from "@/actions/getMysteries";
// import { createMock } from "@/test/factory/Factories";

const UserMainPage: FC = async () => {

  const res = await getMysteries()
  const mysteries: Mystery[] = res.map(mystery => ({
    id: mystery.id,
    imageUrl: mystery.imageUrl,
    title: mystery.title,
    difficulty: mystery.difficulty,
    explanation: mystery.explanation,
    tags: mystery.tags.map((tag) => ({ id: tag.tag.id, name: tag.tag.name }))
  }))

  return (
    <ClientOnly>
      <div>
        <Mysteries mysteries={mysteries} />
      </div>
    </ClientOnly>
  );
};

export default UserMainPage