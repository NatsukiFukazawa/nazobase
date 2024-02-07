import { FC } from "react";
import Mysteries, { Mystery } from "../../components/organisms/Mysteries";
import RegistMysteryModal from "@/components/modals/RegistMysteryModal";
import RegistTagModal from "@/components/modals/RegistTagModal";
import ClientOnly from "../../components/ClientOnly";
import getMysteries from "../../actions/getMysteries";
import getTags from "../../actions/getTags";
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
  const tags = await getTags()


  return (
    <>
      <ClientOnly>
        <div>
          <Mysteries mysteries={mysteries} />
        </div>
        <div>
          <RegistMysteryModal tags={tags} />
        </div>
        <div>
          <RegistTagModal/>
        </div>
      </ClientOnly>
    </>
  )
};

export default UserMainPage