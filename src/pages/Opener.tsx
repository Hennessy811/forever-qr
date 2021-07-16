import React, { useEffect, useState } from "react"

import { ClipboardCopyIcon } from "@heroicons/react/outline/"
import { useQRCode } from "react-qrcodes"
import { useFirebaseConnect } from "react-redux-firebase"
import { useParams } from "react-router-dom"
import { useCopyToClipboard } from "react-use"

import { useAppSelector } from "src/app/hooks"
import generateAddress from "src/shared/utils/generateAddress"

import { Values } from "./Home/components/Project"

const Copier = ({ value }) => {
  const [state, copyToClipboard] = useCopyToClipboard()
  const [v, setV] = useState(state.value)

  useEffect(() => {
    setV(state.value)
  }, [value, state.value])

  const copy = () => {
    copyToClipboard(value)
    setTimeout(() => {
      setV(undefined)
    }, 2000)
  }

  return (
    <div className="has-tooltip">
      <span className="right-0 px-3 py-1 -mt-16 text-base font-normal text-gray-100 bg-gray-700 rounded-md shadow-lg tooltip">
        {!v ? "Copy to clipboard" : `Copied ${v}`}
      </span>
      <ClipboardCopyIcon
        className="absolute w-5 h-5 cursor-pointer top-2 right-4"
        onClick={() => copy()}
      />
    </div>
  )
}

const Opener = () => {
  useFirebaseConnect([{ path: "projects" }])

  const { id } = useParams<{ id: string }>()
  const projects = useAppSelector((state) => state.firebase.ordered.projects)
  const { uid } = useAppSelector((state) => state.firebase.auth)

  const tempProjects = projects?.find((i) => i.key === uid)?.value || {}
  const userProjects = Object.entries(tempProjects).map((i) => ({
    key: i[0],
    value: i[1],
  }))
  const currentProject = userProjects.find((i) => i.key === id)?.value as Values

  const [inputRef] = useQRCode({
    text: generateAddress(currentProject),
    options: {
      type: "image/jpeg",
      quality: 0.3,
      level: "M",
      margin: 3,
      scale: 4,
      width: 250,
      color: {
        dark: currentProject.qrColor,
        light: currentProject.bgColor,
      },
    },
  })
  useEffect(() => {
    if (currentProject && currentProject.type !== "wifi") {
      window.location.replace(generateAddress(currentProject))
    }
  }, [id, currentProject])

  if (currentProject?.type === "wifi")
    return (
      <div className="container px-4 m-auto mt-12 prose md:px-0">
        <h1>{currentProject.title}: Wi-Fi Info</h1>
        <span>
          This QR code should connect your device to wi-fi network, but
          unfortunately we cant do it from the browser.
          <br />
          <br />
          You can copy SSID and password to connect manually.
        </span>
        <div className="my-4">
          <span className="text-sm font-bold text-gray-700">SSID</span>
          <div className="relative w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none bg-gray-50">
            {currentProject.wifi.ssid}
            <Copier value={currentProject.wifi.ssid} />
          </div>
        </div>
        <div className="my-4">
          <span className="text-sm font-bold text-gray-700">Password</span>
          <div className="relative w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none bg-gray-50">
            {currentProject.wifi.password}

            <Copier value={currentProject.wifi.password} />
          </div>
        </div>
        <div className="my-4">
          <span className="text-sm font-bold text-gray-700">Network type</span>
          <div className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none bg-gray-50">
            {currentProject.wifi.type}
          </div>
        </div>

        <div className="mt-12">
          <span className="text-lg">
            But maybe this{" "}
            <span className="text-sm text-gray-400">
              (yes, one more QR code)
            </span>{" "}
            will help you
          </span>

          <img ref={inputRef} alt="helper qr code" />
        </div>
      </div>
    )

  return (
    <div className="container flex items-center justify-center h-screen px-4 m-auto font-mono prose text-center lg:prose-2xl">
      <h1>
        Opening the{" "}
        <span className="font-light underline">{currentProject?.title}</span>{" "}
        project...
      </h1>
    </div>
  )
}

export default Opener
