"use client"

import Image from "next/image"

import {
  Modal,
  LoadingOverlay,
  Button,
  Text,
  TextInput,
  Collapse,
  Stack,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { useState, useRef, useEffect } from "react"
import { Mystery } from "@/models/Mystery"
import { skeleton } from "@/components/atoms/SkeltonForImage"

export default function MysteryRandomSlider() {
  const [mysteries, setMysteries] = useState<Mystery[]>([])

  // for random question
  const [opened, { toggle, close }] = useDisclosure()
  const [inputAnswer, setAnswer] = useState<string>("")
  const [currentMystery, setCurrentMystery] = useState<Mystery | null>(null)
  const [prevMystery, setPrevMystery] = useState<Mystery | null>(null)
  const [nonAnsweredIndices, setNonAnsweredIndices] = useState<number[]>(
    new Array(mysteries.length).fill(0).map((_, i) => i)
  )

  // for input focus
  const input = useRef<HTMLInputElement>(null)

  // update current mystery when currentMystery is changed
  if (prevMystery !== currentMystery) {
    setPrevMystery(currentMystery)
    setAnswer("")
  }
  const checkAnswer = () => {
    console.log(inputAnswer, answer)
    if (inputAnswer === answer) {
      if (nonAnsweredIndices.length === 1) {
        notifications.show({
          title: "全問正解",
          message: "全問正解です!",
          autoClose: 5000,
        })
        close()
      } else {
        notifications.show({
          title: "正解",
          message: "正解です!",
          autoClose: 5000,
        })
      }
      const currentMysteryIndex = mysteries.findIndex(
        (m) => m.id === currentMystery!.id
      )
      console.log(currentMysteryIndex, nonAnsweredIndices.length)
      setNonAnsweredIndices(nonAnsweredIndices.splice(currentMysteryIndex, 1))
      console.log(nonAnsweredIndices.length)
      const nextIndex =
        nonAnsweredIndices[
          Math.floor(Math.random() * nonAnsweredIndices.length)
        ]
      setCurrentMystery(mysteries[nextIndex])
      if (input.current) {
        input.current.focus()
      }
    } else {
      notifications.show({
        title: "不正解",
        message: "不正解です!",
        autoClose: 5000,
      })
    }
  }
  const questionStart = async () => {
    const res = await fetch("/api/mystery")
    const data: any[] = await res.json()
    const mysteries: Mystery[] = data.map((mystery) => ({
      id: mystery.id,
      imageUrl: mystery.imageUrl,
      title: mystery.title,
      difficulty: mystery.difficulty,
      explanation: mystery.explanation,
      answer: mystery.answer,
      tags: mystery.tags.map((tag: any) => ({
        id: tag.tag.id,
        name: tag.tag.name,
        color: tag.tag.color,
      })),
    }))
    setMysteries(mysteries)
    setCurrentMystery(mysteries[Math.floor(Math.random() * mysteries.length)])
    toggle()
  }

  const { title, imageUrl, difficulty, answer } = (() => {
    if (!currentMystery) {
      return {
        title: "",
        imageUrl: "",
        difficulty: "",
        answer: "",
      }
    }
    return currentMystery
  })()

  return (
    <>
      <div className="w-full text-center m-1">
        <Button onClick={questionStart} variant="light" size="md">
          start!
        </Button>
      </div>
      <Modal opened={opened} onClose={close} fullScreen>
        <Modal.Title className="flex text-center w-full justify-center font-bold border-gray-100">
          残り:{nonAnsweredIndices.length}問
        </Modal.Title>
        <Modal.Body className="text-center">
          {title}
          <div>
            <div className="flex justify-center mt-2 h-[60vh]">
              <Image
                alt="image"
                src={imageUrl}
                fill
                className="object-contain w-auto !relative"
                placeholder={skeleton(100, 100)}
              />
            </div>
            <Stack align="center" className="m-4">
              <div>難易度:{difficulty}</div>
            </Stack>
          </div>
          <div className="w-full flex justify-evenly mt-1">
            <TextInput
              label="解答"
              placeholder="入力してください"
              ref={input}
              onChange={(event) =>
                setAnswer((event.target as HTMLInputElement).value)
              }
              value={inputAnswer}
            />
            <Button onClick={checkAnswer} variant="light" size="md">
              正誤判定
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
