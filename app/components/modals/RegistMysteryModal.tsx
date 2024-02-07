'use client'
import React from 'react';
import * as z from 'zod'
import { Modal, Button, TextInput, MultiSelect, NumberInput, Textarea, LoadingOverlay } from '@mantine/core';
import db from '@prisma/client'
import { useDisclosure } from '@mantine/hooks';
import FileUpload from "@/components/molecules/FileUpload"
import { createFormActions, createFormContext } from '@mantine/form';
import { zodResolver } from '@mantine/form';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { createMystery } from '@/actions/createMystery';

interface ResistMysteryModalProps {
  tags: db.Tag[];
}

interface Tag {
  value: string;
  label: string;
  color: string;
}


interface FormValues {
  name: string;
  imageUrl: string;
  tags: string[];
  difficulty: number;
  explanation: string;
  answer: string;
}

const FORM = 'register-mystery';

export const formActions =
  createFormActions<FormValues>(FORM);

const schema = z.object({
  name: z.string().min(3, { message: 'Too short' }).max(20, { message: 'Too long' }),
  imageUrl: z.string().url(),
  tags: z.array(
    z.string()
  ),
  difficulty: z.number().min(1).max(10),
  explanation: z.string().max(200, { message: 'Too long' }),
  answer: z.string().max(200, { message: 'Too long' }),
})

const SeletedItem = (value: Tag) => {
  return (
    <div className='flex justify-between w-full'>
      <span>{value.label}</span>
    </div>
  )
}


const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();


function ContextField({ allTags }: { allTags: Tag[] }) {
  const form = useFormContext();
  return (
    <>
      <TextInput
        required
        label="Name"
        placeholder="Enter your name"
        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
        value={form.values.name}
      />
      <MultiSelect
        required
        label="Tags"
        placeholder="set tags"
        onChange={(value) => form.setFieldValue('tags', value)}
        value={form.values.tags}
        data={allTags}
      />

      <FileUpload
        endpoint='serverImage'
        value={form.values.imageUrl}
        onChange={(url) => { console.log(url); form.setFieldValue('imageUrl', url ?? '') }}
      />
      <NumberInput
        required
        max={10}
        min={1}
        label="Difficulty"
        value={form.values.difficulty}
        onChange={(event) => form.setFieldValue('difficulty', Number(event))}
      />
      <Textarea
        required
        label="Answer"
        value={form.values.answer}
        onChange={(event) => form.setFieldValue('answer', event.currentTarget.value)} />
      <Textarea
        label="Explanation"
        value={form.values.explanation}
        onChange={(event) => form.setFieldValue('explanation', event.currentTarget.value)}
      />
    </>
  );
}


const ResistMysteryModal: React.FC<ResistMysteryModalProps> = (props) => {
  const { tags } = props;
  const convertedTags: Tag[] = tags.map((tag) => ({ value: tag.name, label: tag.name, color: tag.color }))
  const form = useForm({
    name: FORM,
    initialValues: {
      name: '',
      imageUrl: 'https://utfs.io/f/5915b52a-c33d-4b1a-8785-4ff734041728-1d.png',
      difficulty: 1,
      explanation: '',
      answer: '',
      tags: [],
    },
    validate: zodResolver(schema),
  })

  const [opened, { open, close }] = useDisclosure();
  const [visible, { toggle }] = useDisclosure();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values)
    const user = await getCurrentUser()

    const payload = {
      tags: values.tags,
      imageUrl: values.imageUrl,
      title: values.name,
      difficulty: values.difficulty,
      explanation: values.explanation,
      answer: values.answer,
      userId: user.userId
    }
    await createMystery(payload)
  }

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Modal.Title className='flex text-center w-full justify-center'>save mystery</Modal.Title>
        <Modal.Body>
          <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          <FormProvider form={form}>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <ContextField allTags={convertedTags} />
              <div className='flex justify-center gap-5 ' >
                <Button type="submit" variant="light" color="blue">Submit</Button>
              </div>
            </form>
          </FormProvider>
        </Modal.Body>
        <div className='flex justify-center gap-5 sticky bottom-0 left-0 right-0 bg-white z-10' >
          <Button onClick={close}>Close</Button>
        </div>
      </Modal>
      <Button onClick={open}>登録</Button>
    </>
  );
};

export default ResistMysteryModal;
