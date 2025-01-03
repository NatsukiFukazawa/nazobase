"use client"

import { UploadDropzone } from "@/utils/uploadthing"
import Image from "next/image"
import { CloseButton } from "@mantine/core"

import "@uploadthing/react/styles.css"
import { Button } from "@mantine/core"

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile"
  value: string
  onChange: (url?: string) => void
}

const FileUpload = (props: FileUploadProps) => {
  const { value, onChange } = props
  const fileType = value?.split(".").pop()

  if (value && fileType !== "pdf") {
    return (
      <div className="relative">
        <CloseButton
          variant="transparent"
          className="abusolute top-0 right-0"
          onClick={() => onChange(undefined)}
        />
        <div className="flex justify-center">
          <Image width={200} height={200} src={value} alt="upload" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <UploadDropzone
        endpoint={props.endpoint}
        onClientUploadComplete={(file) => {
          onChange(file?.[0].url ?? "")
        }}
        onUploadError={(error) => console.log(error)}
      />
    </div>
  )
}

export default FileUpload
