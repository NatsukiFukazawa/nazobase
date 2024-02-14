import { FC } from "react";
import Mysteries from "@/components/organisms/Mysteries";
import { UserPageHeader } from "@/components/organisms/UserPageHeader";
import { UserPageNav } from "@/components/organisms/UserPageNav";
import ClientOnly from "@/components/ClientOnly";
import getMysteries from "@/actions/getMysteries";
import getTags from "@/actions/getTags";
import { Mystery } from "@/models/Mystery";

const UserMainPage: FC = async () => {

  const res = await getMysteries()
  let mysteries: Mystery[] = res.map(mystery => ({
    id: mystery.id,
    imageUrl: mystery.imageUrl,
    title: mystery.title,
    difficulty: mystery.difficulty,
    explanation: mystery.explanation,
    answer: mystery.answer,
    tags: mystery.tags.map((tag) => ({ id: tag.tag.id, name: tag.tag.name,color: tag.tag.color }))
  }))
  const tags = await getTags()

  const user = null

  return (
    <div className='h-full'>
      <ClientOnly>
        <div className="flex h-full">
          <UserPageNav />
          <div className="grow">
            <UserPageHeader user={user} signed={true} tags={tags} />
            <div className="m-4">
              <Mysteries mysteries={mysteries} />
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  )
};

export default UserMainPage