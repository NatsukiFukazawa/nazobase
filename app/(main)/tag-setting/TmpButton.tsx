"use client"
import { tags } from "../../../mock/createMock"

export default function TmpButton() {
  const createTagMany = async () => {
    const result = await fetch("/api/tag", {
      method: "POST",
      body: JSON.stringify({ data: tags }),
    })
    return result
  }
  return <button onClick={createTagMany}>tmp</button>
}
