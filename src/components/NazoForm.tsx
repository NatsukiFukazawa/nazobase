'use client'
import React, { useState, useEffect } from "react"
import { Checkbox } from "@/components/atoms/Checkbox"
import { saveRiddle } from "@/services/riddleService"
import { Textfield } from '@/components/atoms/Textfield'
import { useForm } from '@mantine/form'

type Tags = { tagName: string; tagId: number }[]
function NazoFrom(): React.ReactNode {
  const form = useForm({
    initialValues: {
      title: '',
      file: '',
      answer: '',
      tags: [],
    }
  })
  const [tags, setTags] = useState<Tags>([]);
  const [tagsState, setTagState] = useState<boolean[]>(tags.map(tag => true))
  useEffect(() => {
    // const fetchTags = async () => {
    //   await fetch('/login', { method: 'POST' })
    //   const response = await fetch('/tags');
    //   console.log(response)
    //   const data = await response.json() as Tags;
    //   setTags(data);
    // }

    // fetchTags();
  }, []);

  const handleTagChange = (event: React.FormEvent<HTMLInputElement>, index: number) => {
    console.log(event.currentTarget.checked)
    console.log(tagsState)

    tagsState[index] = event.currentTarget.checked
    setTagState(tagsState)
  }
  const confirm = async (): Promise<void> => {
    const args = form.values
    console.log(args)
    await saveRiddle(args)
  }

  const checkboxes = () => {
    return tags.map((tag, index) => { return (<Checkbox onChange={(event) => handleTagChange(event, index)} key={`checkbox-${index}`} value={tag.tagName} label={tag.tagName} />) })
  }
  return (
    <div>
      <form onSubmit={confirm} >
        <Textfield
          label="Title"
          placeholder="Enter your title"
          {...form.getInputProps('title')}
        />

        <Textfield
          label="answer"
          placeholder="Enter your answer"
          {...form.getInputProps('answer')}
        />
        {checkboxes()}
        {/* <input type='file' placeholder="file" onInput={handleFileChange} value={file} /> */}
        <div><input type='submit' placeholder="判定"></input></div>
      </form>
    </div>
  )
}

export default NazoFrom
