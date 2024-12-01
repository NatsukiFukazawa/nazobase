"use client"
import React from "react"
import * as z from "zod"
import {
  Modal,
  Button,
  Input,
  TextInput,
  NumberInput,
  Textarea,
  LoadingOverlay,
} from "@mantine/core"
import db from "@prisma/client"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/navigation"
import FileUpload from "../molecules/FileUpload"
import { createFormActions, createFormContext } from "@mantine/form"
import { zodResolver } from "@mantine/form"
import { getCurrentUser } from "../../actions/getCurrentUser"
import { createMystery } from "../../actions/createMystery"
import { SearchableMultiSelect } from "../atoms/MultiSelect"
import { notifications } from "@mantine/notifications"

interface ResistMysteryModalProps {
  tags: db.Tag[]
  mysteryCreated?: () => void
}

interface Tag {
  value: string
  label: string
  color: string
}

interface FormValues {
  name: string
  imageUrl: string
  tags: string[]
  difficulty: number
  explanation: string
  answer: string
}

const FORM = "register-mystery"

export const formActions = createFormActions<FormValues>(FORM)

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Too short" })
    .max(20, { message: "Too long" }),
  imageUrl: z.string().url(),
  tags: z.array(z.string()),
  difficulty: z.number().min(1).max(10),
  explanation: z.string().max(200, { message: "Too long" }),
  answer: z.string().max(200, { message: "Too long" }),
})

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()

const itemComponent = (value: Tag) => {
  return (
    <div className="flex gap-1">
      <span
        style={{ backgroundColor: value.color }}
        className="w-2 h-2 rounded-full"
      ></span>
      <span>{value.label}</span>
    </div>
  )
}

function ContextField({ allTags }: { allTags: Tag[] }) {
  const form = useFormContext()
  return (
    <>
      <TextInput
        required
        label="タイトル"
        onChange={(event) =>
          form.setFieldValue("name", event.currentTarget.value)
        }
        value={form.values.name}
      />
      <SearchableMultiSelect<Tag>
        itemComponent={itemComponent}
        pillStyle={(item) => ({ root: { backgroundColor: item.color } })}
        value={form.values.tags}
        data={allTags}
        onChange={(value) => form.setFieldValue("tags", value)}
      />
      <Input.Wrapper label="ファイル" required>
        <FileUpload
          endpoint="serverImage"
          value={form.values.imageUrl}
          onChange={(url) => {
            form.setFieldValue("imageUrl", url ?? "")
          }}
        />
      </Input.Wrapper>
      <NumberInput
        required
        max={10}
        min={1}
        label="難易度"
        value={form.values.difficulty}
        onChange={(event) => form.setFieldValue("difficulty", Number(event))}
      />
      <Textarea
        required
        label="答え"
        value={form.values.answer}
        onChange={(event) =>
          form.setFieldValue("answer", event.currentTarget.value)
        }
      />
      <Textarea
        label="解説"
        value={form.values.explanation}
        onChange={(event) =>
          form.setFieldValue("explanation", event.currentTarget.value)
        }
      />
    </>
  )
}

const ResistMysteryModal: React.FC<ResistMysteryModalProps> = (props) => {
  const { tags } = props
  const router = useRouter()
  const convertedTags: Tag[] = tags.map((tag) => ({
    value: String(tag.id),
    label: tag.name,
    color: tag.color,
  }))
  const form = useForm({
    name: FORM,
    initialValues: {
      name: "",
      imageUrl: "",
      difficulty: 1,
      explanation: "",
      answer: "",
      tags: [],
    },
    validate: zodResolver(schema),
  })

  const [opened, { open, close }] = useDisclosure()
  const [visible, { toggle, close: finishLoading }] = useDisclosure()

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const user = await getCurrentUser()
    toggle()

    const payload = {
      tags: values.tags,
      imageUrl: values.imageUrl,
      title: values.name,
      difficulty: values.difficulty,
      explanation: values.explanation,
      answer: values.answer,
      userId: user.userId,
    }
    await createMystery(payload)
    notifications.show({
      title: "完了",
      message: "謎登録しました!",
      autoClose: 5000,
    })
    finishLoading()
    close()
    router.refresh()
  }

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Modal.Title className="flex text-center w-full justify-center">
          謎登録
        </Modal.Title>
        <Modal.Body>
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <FormProvider form={form}>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <ContextField allTags={convertedTags} />
              <div
                className="flex justify-evenly mt-1"
                style={{ justifyContent: "space-evenly", marginTop: "16px" }}
              >
                <Button onClick={close} variant="outline">
                  閉じる
                </Button>
                <Button type="submit" variant="light" color="blue">
                  登録
                </Button>
              </div>
            </form>
          </FormProvider>
        </Modal.Body>
      </Modal>
      <Button onClick={open} size="compact-sm" color="indigo" variant="outline">
        謎登録
      </Button>
    </>
  )
}

export default ResistMysteryModal
