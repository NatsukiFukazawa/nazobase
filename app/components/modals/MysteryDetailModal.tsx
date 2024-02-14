import {
  Modal,
  LoadingOverlay,
  Button,
  HoverCard,
  Text
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Mystery } from '@/models/Mystery';
import Image from 'next/image';
import { TagChip } from '@/components/atoms/TagChip'

interface MysteryDetailModalProps {
  mystery: Mystery | null;
  onClose: () => void;
  open: () => void;
  opened: boolean;
}


export function MysteryDetailModal({ opened, open, mystery, onClose }: MysteryDetailModalProps) {
  const [visible, { toggle }] = useDisclosure();
  if (mystery === null) return null
  const { title, imageUrl, difficulty, answer, explanation } = mystery
  return (
    <>
      <Modal opened={opened} onClose={onClose} size='xl'>
        <Modal.Title className='flex text-center w-full justify-center font-bold border-gray-100'>{title}</Modal.Title>
        <Modal.Body className='text-center'>
          <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          <div className="flex justify-center mt-2 h-72">
            <Image alt='image' src={imageUrl} fill className="object-contain !w-auto !relative" />
          </div>

          <HoverCard>
            <div>
              <HoverCard.Target>
                <Text>答え</Text>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text>
                  {answer}
                  <div>解説: {explanation}</div>
                </Text>
              </HoverCard.Dropdown>
            </div>
          </HoverCard>
          <div className='flex gap-1'>タグ:
            {mystery.tags.map(tag => <span key={tag.name}>
              <TagChip tag={tag} />
            </span>)}
          </div>
          <div className='flex justify-evenly mt-1' style={{ justifyContent: 'space-evenly', marginTop: '16px' }}>
            <Button onClick={onClose}>Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}