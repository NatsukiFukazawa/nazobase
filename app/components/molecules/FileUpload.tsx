'use client';

import { UploadDropzone } from "@/utils/uploadthing";
import { OurFileRouter } from "@/api/uploadthing/core";
import Image from "next/image";

import "@uploadthing/react/styles.css"
import { Button } from "@mantine/core";

interface FileUploadProps {
  endpoint: 'serverImage' | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = (props: FileUploadProps) => {
  const { value, onChange } = props;
  const fileType = value?.split('.').pop();


  if (value && fileType !== 'pdf') {
    return (
      <>
        <Button className='absolute top-0 left-0' onClick={() => onChange(undefined)}>削除</Button >
        <div className="w-20 h-30 flex justify-center">
          <Image width={200} height={200} src={value} alt='upload' />
        </div>
      </>
    )
  }

  return (
    <div>
      <UploadDropzone
        endpoint={props.endpoint}
        onClientUploadComplete={(file) => { console.log(file); onChange(file?.[0].url ?? '') }}
        onUploadError={(error) => console.log(error)}
      />
    </div>
  )
}

export default FileUpload