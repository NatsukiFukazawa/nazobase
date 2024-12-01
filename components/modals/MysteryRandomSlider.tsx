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
import { useState, useRef } from "react"
import { Mystery } from "@/models/Mystery"
import { TagChip } from "@/components/atoms/TagChip"
import { skeleton } from "@/components/atoms/SkeltonForImage"

interface MysteryRandomSliderProps {
  mysteries: Mystery[]
  opened: boolean
}

export default function MysteryRandomSlider({
  opened,
  mysteries,
}: MysteryRandomSliderProps) {
  const [visible, { toggle, close }] = useDisclosure()
  const [inputAnswer, setAnswer] = useState<string>("")
  const [currentMystery, setCurrentMystery] = useState<Mystery>(
    mysteries[Math.floor(Math.random() * mysteries.length)]
  )
  const input = useRef<HTMLInputElement>(null)

  const [nonAnsweredIndices, setNonAnsweredIndices] = useState<number[]>(
    new Array(mysteries.length).fill(0).map((_, i) => i)
  )
  const { title, imageUrl, difficulty, answer } = currentMystery
  const checkAnswer = () => {
    console.log(inputAnswer, answer)
    if (inputAnswer === answer) {
      notifications.show({
        title: "正解",
        message: "正解です!",
        autoClose: 5000,
      })
      if (nonAnsweredIndices.length === 1) {
        notifications.show({
          title: "全問正解",
          message: "全問正解です!",
          autoClose: 5000,
        })
        close()
      }
      const currentMysteryIndex = mysteries.findIndex(
        (m) => m.id === currentMystery.id
      )
      console.log(currentMysteryIndex)
      setNonAnsweredIndices(
        nonAnsweredIndices.filter((i) => i !== currentMysteryIndex)
      )
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
  const [prevMystery, setPrevMystery] = useState<Mystery | null>(null)
  if (prevMystery !== currentMystery) {
    setPrevMystery(currentMystery)
    setAnswer("")
  }
  return (
    <Modal opened={opened} onClose={() => {}} fullScreen>
      <Modal.Title className="flex text-center w-full justify-center font-bold border-gray-100">
        残り:{nonAnsweredIndices.length}問
      </Modal.Title>
      <Modal.Body className="text-center">
        {title}
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
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
  )
}
