"use client"

import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react"

export default function ImageUpload({ disabled, onChange, onRemove, value }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])
  

  const onUpload = (res) => {
    onChange([res.info.secure_url]);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex gap-3">
        {value.map((image) => {
          return (
            <div key={image} className="relative overflow-hidden mb-2">
              PDF: <a href={image}>Link</a>
                <button className="bg-red-600 text-white rounded-md ml-auto p-1 w-fit h-fit" type="button" onClick={() => onRemove(image)}>
                  <span className="symbol">delete</span>
                </button>
            </div>
          )
        })}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="b9obatdq">
        {({ open }) => {
          const onClick = () => {
            open();
          }
          return (
            <button disabled={disabled} type="button" onClick={onClick}
            className={"justify-center items-center gap-1 text-[17px] px-1.5 py-1.5 bg-pink-600 text-white border-2 border-pink-200 transition flex hover:bg-pink-500 w-fit"}>
              Upload de PDF
            </button>
          )
        }}
      </CldUploadWidget>
    </>
  )
}