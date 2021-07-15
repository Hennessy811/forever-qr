import React, { Fragment, useState } from "react"

import { LinkIcon, ChevronDoubleDownIcon } from "@heroicons/react/outline"
import { useQRCode } from "react-qrcodes"

import Dropdown from "src/shared/components/Dropdown"
import generateAddress from "src/shared/utils/generateAddress"

import EditProjectDialog from "./EditProjectDialog"

const BASE_URL = window.location.origin
// process.env.NODE_ENV === "development"
//   ? "http://192.168.0.12:3000"
//   : window.location.origin
export interface Email {
  address: string
  subject: string
  cc: string
}

export interface Wifi {
  ssid: string
  password: string
  type: string
}

export type SupportedTypes = "url" | "wifi" | "phone" | "email"

export interface Values {
  type: SupportedTypes
  title: string
  url: string
  email: Partial<Email>
  wifi: Partial<Wifi>
  phone: string
  bgColor: string
  qrColor: string
}

const Project = ({ id, data, onDelete, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState<Values>({
    type: data.type,
    title: data.title,
    url: data.url,
    email: {
      address: data.email.address || "",
      subject: data.email.subject || "",
      cc: data.email.cc || "",
    },
    wifi: {
      ssid: data.wifi.ssid || "",
      password: data.wifi.password || "",
      type: data.wifi.type || "",
    },
    phone: data.phone || "",
    bgColor: data.bgColor || "#000000",
    qrColor: data.qrColor || "#ffffff",
  })

  const link = `${BASE_URL}/project/${id}`
  const [inputRef] = useQRCode({
    text: link,
    options: {
      type: "image/jpeg",
      quality: 0.3,
      level: "M",
      margin: 3,
      scale: 4,
      width: 250,
      color: {
        dark: values.qrColor,
        light: values.bgColor,
      },
    },
  })

  const closeModal = () => setIsOpen(false)

  const openModal = () => setIsOpen(true)

  const dropdownOptions = [
    {
      title: "Open",
      action: () => window.open(link, "_blank"),
    },
    {
      title: "Edit",
      action: () => openModal(),
    },
    {
      title: "Delete",
      action: () => onDelete(),
    },
  ]

  const address = generateAddress(values)

  return (
    <>
      <div className="flex flex-col w-full p-5 rounded-md shadow-md">
        <div className="relative w-full mb-2">
          <h2 className="mb-2 text-xl font-bold text-gray-800 truncate has-tooltip">
            <span className="px-3 py-1 -mt-10 text-base font-normal text-gray-100 bg-gray-700 rounded-md shadow-lg tooltip">
              {values.title}
            </span>
            {values.title}
          </h2>

          <div className="absolute top-0 right-0">
            <Dropdown
              title={
                <ChevronDoubleDownIcon className="w-5 h-5 cursor-pointer " />
              }
              options={dropdownOptions}
            />
          </div>
        </div>
        <div>
          <img className="m-0" ref={inputRef} alt={values.title} />
        </div>
        <div className="my-2">
          <span className="flex items-center font-black">
            <a href={link} rel="noopener noreferrer" target="_blank">
              <LinkIcon className="w-5 h-5 mr-2 transition-colors cursor-pointer hover:text-gray-400" />
            </a>
            Now it leads to:
          </span>
          <div className="max-w-md text-sm truncate has-tooltip">
            <span className="px-3 py-1 -mt-10 text-base font-normal text-gray-100 bg-gray-700 rounded-md shadow-lg tooltip">
              {address}
            </span>
            {address}
          </div>
        </div>
      </div>

      <EditProjectDialog
        isOpen={isOpen}
        onCancel={() => {
          closeModal()
          setValues(data)
        }}
        onSave={() => {
          onChange(values)
          closeModal()
        }}
        values={values}
        onChange={(e) => setValues({ ...values, ...e })}
      />
    </>
  )
}

export default Project
