'use client'
import React from 'react';
import * as z from 'zod'
import { Modal, Button, TextInput, ColorInput, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createFormActions, createFormContext } from '@mantine/form';
import { zodResolver } from '@mantine/form';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { createTag } from '@/actions/createTag';
import { useRouter } from 'next/navigation';

interface ResistTagModalProps {
}

interface Tag {
  value: string;
  label: string;
}


interface FormValues {
  name: string;
  color: string;
}

const BASE_COLORS = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']

const FORM = 'register-tag';

export const formActions =
  createFormActions<FormValues>(FORM);

const schema = z.object({
  name: z.string().min(3, { message: 'Too short' }).max(20, { message: 'Too long' }),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, { message: 'Invalid color' }),
})


const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();


function ContextField() {
  const form = useFormContext();
  return (
    <>
      {/* tag name */}
      <TextInput
        required
        label="ラベル"
        placeholder="入力してください"
        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
        value={form.values.name}
      />
      {/* color picker */}
      <div className='mt-2 flex justify-center w-full'>
        <ColorInput
          required
          label="色"
          classNames={{ root:'w-full'}}
          swatches={BASE_COLORS}
          value={form.values.color}
          onChange={(value) => form.setFieldValue('color', value)} />
      </div>
    </>
  );
}


const ResistMysteryModal: React.FC<ResistTagModalProps> = (props) => {
  const form = useForm({
    name: FORM,
    initialValues: {
      name: '',
      color: '#2e2e2e',
    },
    validate: zodResolver(schema),
  })
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure();
  const [visible, { open: toggleOpen, close: toggleClose }] = useDisclosure();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    toggleOpen()
    try {
      console.log(values)
      const user = await getCurrentUser()

      const payload = {
        name: values.name,
        color: values.color,
      }
      await createTag(payload)
      router.refresh()

    } catch (e) {
      console.log(e)
    } finally {

      toggleClose()
      close()
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Modal.Title className='flex text-center w-full justify-center'>タグ登録</Modal.Title>
        <Modal.Body>
          <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          <FormProvider form={form}>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <ContextField />
              <div className='flex justify-center gap-5 mt-8' >
                <Button onClick={close} variant='outline'>閉じる</Button>
                <Button type="submit" variant="light" color="blue">登録</Button>
              </div>
            </form>
          </FormProvider>
        </Modal.Body>
      </Modal>
      {/* <Button onClick={open} size='compact-sm' color='grape' variant='outline'>タグ登録</Button> */}
    </>
  );
};

export default ResistMysteryModal;
