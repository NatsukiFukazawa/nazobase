import { useRouter } from "next/navigation"
import Image from "next/image"

import {
  Modal,
  LoadingOverlay,
  Button,
  Text,
  Collapse,
  Stack,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"

import { Mystery } from "@/models/Mystery"
import { deleteMystery } from "@/actions/deleteMystery"
import { TagChip } from "@/components/atoms/TagChip"
import { skeleton } from "@/components/atoms/SkeltonForImage"

interface MysteryDetailModalProps {
  mystery: Mystery | null
  onClose: () => void
  open: () => void
  opened: boolean
}

export function MysteryDetailModal({
  opened,
  open,
  mystery,
  onClose,
}: MysteryDetailModalProps) {
  const [visible, { toggle, close }] = useDisclosure()
  const [collapseState, { toggle: collapsToggle, close: collapseClose }] =
    useDisclosure()
  const router = useRouter()
  if (mystery === null) return null
  const { title, imageUrl, difficulty, answer, explanation } = mystery
  const handleDeleteMystery = async () => {
    toggle()
    try {
      await deleteMystery(mystery.id)
    } catch (e) {
      console.log(e)
    } finally {
      close()
    }
    notifications.show({
      title: "完了",
      message: "削除しました!",
      autoClose: 5000,
    })

    router.refresh()
    onClose()
  }
  const closeModal = () => {
    collapseClose()
    onClose()
  }

  return (
    <>
      <Modal opened={opened} onClose={closeModal} fullScreen>
        <Modal.Title className="flex text-center w-full justify-center font-bold border-gray-100">
          {title}
        </Modal.Title>
        <Modal.Body className="text-center">
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
              <div className="flex gap-1">
                タグ:
                {mystery.tags.map((tag) => (
                  <span key={tag.name}>
                    <TagChip tag={tag} />
                  </span>
                ))}
              </div>
              <Button
                onClick={collapsToggle}
                variant="light"
                size="compact-md"
                color="cyan"
              >
                答え・解説を見る
              </Button>
              <Collapse in={collapseState}>
                <Text>
                  <div>答え: {answer}</div>
                  <div>解説: {explanation}</div>
                </Text>
              </Collapse>
            </Stack>
          </div>
          <div className="w-full flex justify-evenly mt-1">
            <Button
              onClick={handleDeleteMystery}
              color="red"
              variant="outline"
              size="md"
            >
              削除
            </Button>
            <Button onClick={() => {}} variant="light" size="md">
              変更
            </Button>
            <Button onClick={closeModal} variant="outline" size="md">
              閉じる
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
