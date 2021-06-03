import React, { useRef, useState } from "react"

import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  DownloadIcon,
  LinkIcon,
} from "@heroicons/react/outline"
import FileSaver from "file-saver"
import QRCode from "qrcode.react"

const Project = ({ id, title, targetUrl, onDelete, onChange }) => {
  const [url, setUrl] = useState("")
  const ref = useRef(null)
  const [editTitle, setEditTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const link = `${window.location.origin}/project/${id}`

  const handleChange = () => {
    onChange({
      title: editedTitle,
      targetUrl: url,
    })
  }

  const editorIcon = !editTitle ? (
    <PencilIcon
      onClick={() => setEditTitle(!editTitle)}
      className="w-5 h-5 ml-3 text-gray-400 cursor-pointer hover:text-gray-300"
    />
  ) : (
    <CheckIcon
      onClick={() => {
        setEditTitle(!editTitle)
        handleChange()
      }}
      className="w-6 h-6 ml-3 text-gray-400 cursor-pointer hover:text-gray-300"
    />
  )

  // const

  return (
    <div className="flex flex-wrap justify-center p-4 my-12 prose rounded-md shadow-md lg:justify-between lg:prose-lg lg:flex-nowrap">
      <div className="w-full pr-4">
        <div>
          <div className="flex items-center">
            {!editTitle && (
              <span className="text-2xl font-bold border-b border-gray-400">
                {title}
              </span>
            )}
            {editTitle && (
              <input
                type="text"
                className="w-48 p-0 px-2 text-2xl font-bold border-gray-400 rounded-md"
                onChange={(e) => setEditedTitle(e.target.value)}
                value={editedTitle}
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    setEditTitle(false)
                    handleChange()
                  }
                }}
              />
            )}
            {editorIcon}
          </div>
          <div className="my-2">
            <span className="flex items-center font-black">
              <a href={link} rel="noopener noreferrer" target="_blank">
                <LinkIcon className="w-5 h-5 mr-2 transition-colors cursor-pointer hover:text-gray-400" />{" "}
              </a>
              Now it leads to:{" "}
            </span>
            <div className="max-w-md text-sm truncate">{targetUrl}</div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <input
            type="text"
            placeholder="Enter URL to your resouce here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full my-2 rounded-lg"
          />
        </div>

        <div className="flex flex-wrap justify-between mt-2">
          <div className="flex">
            <div
              className="flex items-center justify-between px-2 py-1 my-1 text-white transition-all bg-blue-500 rounded-md shadow-md cursor-pointer lg:my-0 lg:px-4 hover:bg-blue-400"
              onClick={() => handleChange()}
            >
              <CheckIcon className="hidden w-5 h-5 mr-2 lg:block" />
              <span>Save</span>
            </div>
            <div
              className="flex items-center justify-between px-2 py-1 my-1 ml-4 transition-all bg-gray-100 rounded-md shadow-md cursor-pointer lg:my-0 lg:px-4 hover:bg-gray-50"
              onClick={() => {
                const canvas = ref.current.querySelector("canvas")
                canvas.toBlob((blob) => FileSaver.saveAs(blob, "code.png"))
              }}
            >
              <DownloadIcon className="hidden w-5 h-5 mr-2 lg:block" />
              <div className="truncate">Download QR</div>
            </div>
          </div>

          <div
            className="flex items-center justify-between px-2 py-1 my-1 ml-4 text-white transition-all bg-red-500 rounded-md shadow-md cursor-pointer lg:my-0 lg:px-4 hover:bg-red-400"
            onClick={() => onDelete()}
          >
            <TrashIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="mt-4 lg:mt-0" ref={ref}>
        <QRCode size={210} value={link} />
      </div>
    </div>
  )
}

export default Project
