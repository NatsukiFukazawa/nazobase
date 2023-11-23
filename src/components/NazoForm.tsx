'use client'
import React, { useState,useEffect } from "react"
import Checkbox from "./atoms/Checkbox"
import styles from '@/app/page.module.css'
import { saveRiddle } from "@/services/riddleService"
// const tags = new Array(10).fill(0).map((_, index) => ({ tagName: `tag_${index}` }))
type Tags = {tagName:string;tagId:number}[]
function NazoFrom(): React.ReactNode {
  const [title, setTitle] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [file, setFile] = useState<string>('')
  const [tags, setTags] = useState<Tags>([]);
  const [tagsState, setTagState] = useState<boolean[]>(tags.map(tag => true))
  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFile(event.currentTarget.value)
  }
  useEffect(() => {
  const fetchTags = async () => {
    await fetch('/login',{method:'POST'})
    const response = await fetch('/tags');
    console.log(response)
    const data  = await response.json() as Tags;
    setTags(data);
  }

  fetchTags();
}, []);

  const handleTagChange = (event: React.FormEvent<HTMLInputElement>, index: number) => {
    console.log(event.currentTarget.checked)
    console.log(tagsState)

    tagsState[index] = event.currentTarget.checked
    setTagState(tagsState)
  }
  const handleAnswerChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.value)
  }
  const confirm = async (): Promise<void> => {
    const args = {
      title, file, tags: tagsState, answer
    }
    console.log(args)
    await saveRiddle(args)
  }
  return (
    <div>
      <form onSubmit={confirm} >
        <div>
          <input type='text' placeholder="title" onInput={handleTitleChange} value={title} /></div>
        <div>
          <input type='file' placeholder="file" onInput={handleFileChange} value={file} />
        </div>
        <input type='text' placeholder="answer" onInput={handleAnswerChange} value={answer} />
        <div className='tag'>
          {tags.map((tag, index) => { return (<Checkbox onChange={(event) => handleTagChange(event, index)} key={`checkbox-${index}`} value={tag.tagName} label={tag.tagName} />) })}
      </div>
        <div><input type='submit'></input></div>
      </form>
    </div>
  )
}
export default NazoFrom
