"use client"
import Image from "next/image"
import { MysteryDetailModal } from "@/components/modals/MysteryDetailModal"
import { useState } from "react"
import { Mystery } from "@/models/Mystery"
import { useDisclosure } from "@mantine/hooks"
import { skeleton } from "@/components/atoms/SkeltonForImage"

export interface MysteriesProps {
  mysteries: Mystery[]
}

function Mysteries({ mysteries }: MysteriesProps) {
  const [selectedMystery, setSelectedMystery] = useState<Mystery | null>(null)
  const [opened, { open, close }] = useDisclosure()
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {mysteries.map((mystery) => (
          <div className="w-[150px]" key={mystery.id}>
            <div className="h-[180px] flex items-center">
              <span
                onClick={() => {
                  setSelectedMystery(mystery)
                  open()
                }}
                className="align-middle"
              >
                <Image
                  priority={false}
                  src={mystery.imageUrl}
                  alt={mystery.title}
                  width={300}
                  height={200}
                  className="object-contain"
                  placeholder={skeleton(100, 100)}
                />
              </span>
            </div>
            <div>難易度: {mystery.difficulty}</div>
          </div>
        ))}
      </div>
      <MysteryDetailModal
        open={open}
        opened={opened}
        mystery={selectedMystery}
        onClose={() => close()}
      />
    </>
  )
}

export default Mysteries
