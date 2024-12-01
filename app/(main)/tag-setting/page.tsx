import getTags from "../../../actions/getTags"
import { TagRow } from "../../../components/organisms/TagRow"
import TmpButton from "./TmpButton"

export default async function Page() {
  const tags = await getTags()
  return (
    <>
      <h3 className="m-1 w-full text-center">タグ一覧</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <TagRow tag={tag} />
          </li>
        ))}
      </ul>
      <TmpButton />
    </>
  )
}
