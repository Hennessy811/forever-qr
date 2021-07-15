import React, { FC, Fragment, useRef, useState } from "react"

import { Transition, Dialog } from "@headlessui/react"
import { ChromePicker } from "react-color"
import { useClickAway } from "react-use"

import Input from "src/shared/components/Input"

import { SupportedTypes, Values } from "./Project"

interface Props {
  values: Values
  onChange: (value: Partial<Values>) => void
  isOpen: boolean
  onSave: () => void
  onCancel: () => void
}

const typeOptions: { title: string; value: SupportedTypes }[] = [
  { title: "URL or plain text", value: "url" },
  { title: "E-mail", value: "email" },
  { title: "Wi-Fi", value: "wifi" },
  { title: "Phone", value: "phone" },
]

const EditProjectDialog: FC<Props> = ({
  isOpen,
  onSave,
  onCancel,
  values,
  onChange,
}) => {
  const [showBgPicker, setShowBgPicker] = useState(false)
  const [showQrPicker, setShowQrPicker] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    setShowBgPicker(false)
    setShowQrPicker(false)
    console.log("OUTSIDE CLICKED")
  })

  const urlFields = (
    <Input
      label="URL"
      value={values.url}
      placeholder="URL or any plain text"
      onChange={(v) => onChange({ url: v })}
    />
  )

  const wifiFields = (
    <>
      <Input
        label="SSID"
        value={values.wifi.ssid}
        placeholder="Network name"
        onChange={(v) => onChange({ wifi: { ...values.wifi, ssid: v } })}
      />
      <Input
        label="SSID"
        value={values.wifi.password}
        placeholder="Network password"
        onChange={(v) => onChange({ wifi: { ...values.wifi, password: v } })}
      />

      <div className="relative inline-block w-full">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="wifitype"
        >
          Network Type
        </label>
        <select
          id="wifitype"
          value={values.wifi.type}
          onChange={(e) =>
            onChange({ wifi: { ...values.wifi, type: e.target.value } })
          }
          className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
        >
          <option value="WEP">WEP</option>
          <option value="WPA">WPA/WPA2</option>
          <option value="nopass">Open</option>
        </select>
      </div>
    </>
  )

  // mailto:mitia2022@gmail.com?cc=123&subject=hello%20world
  const emailFields = (
    <>
      <Input
        label="Email address"
        value={values.email.address}
        placeholder="Email"
        onChange={(v) => onChange({ email: { ...values.email, address: v } })}
      />
      <Input
        label="Subject"
        value={values.email.subject}
        placeholder="Subject"
        onChange={(v) => onChange({ email: { ...values.email, subject: v } })}
      />
      <Input
        label="CC"
        value={values.email.cc}
        placeholder="CC"
        onChange={(v) => onChange({ email: { ...values.email, cc: v } })}
      />
    </>
  )

  const phoneFields = (
    <div className="my-4">
      <label
        className="block mb-2 text-sm font-bold text-gray-700"
        htmlFor="phone"
      >
        Phone
      </label>
      <input
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="phone"
        type="tel"
        placeholder="Phone number"
        value={values.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
      />
    </div>
  )

  const fieldsMap: Record<SupportedTypes, JSX.Element> = {
    url: urlFields,
    wifi: wifiFields,
    email: emailFields,
    phone: phoneFields,
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onCancel}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-100 bg-opacity-60" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Edit project
              </Dialog.Title>

              <Input
                label="Project name"
                value={values.title}
                placeholder="Project name"
                onChange={(v) => onChange({ title: v })}
              />

              <div className="relative">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => setShowBgPicker(!showBgPicker)}
                >
                  Background color
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => setShowQrPicker(!showQrPicker)}
                >
                  QR color
                </button>

                <div ref={ref} className="absolute left-0 z-10 top-2">
                  {(showQrPicker || showBgPicker) && (
                    <ChromePicker
                      color={showQrPicker ? values.qrColor : values.bgColor}
                      onChange={(v) => {
                        if (showQrPicker) onChange({ qrColor: v.hex })
                        if (showBgPicker) onChange({ bgColor: v.hex })
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="relative inline-block w-full mt-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={values.type}
                  onChange={(e) =>
                    onChange({ type: e.target.value as SupportedTypes })
                  }
                  className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                >
                  {typeOptions.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.title}
                    </option>
                  ))}
                </select>
              </div>

              {fieldsMap[values.type]}

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditProjectDialog
