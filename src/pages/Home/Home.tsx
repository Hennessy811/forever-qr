import React from "react"

import { PlusIcon } from "@heroicons/react/outline"
import { isEmpty, omitBy } from "lodash"
import { useFirebase, useFirebaseConnect } from "react-redux-firebase"

import { useAppSelector } from "src/app/hooks"

import Project, { Values } from "./components/Project"

const Home = () => {
  useFirebaseConnect([{ path: "projects" }])
  const projects = useAppSelector((state) => state.firebase.ordered.projects)
  const { uid } = useAppSelector((state) => state.firebase.auth)
  const firebase = useFirebase()

  const tempProjects = projects?.find((i) => i.key === uid)?.value || {}
  const userProjects = Object.entries(tempProjects).map((i) => ({
    key: i[0],
    value: i[1],
  }))

  return (
    <div className="">
      <div className="container px-4 py-12 m-auto lg:px-0">
        <div className="m-auto prose prose-lg">
          <h1>Welcome to Forever QR</h1>
          <p>
            Here you can generate dynamic QR codes, save it and you can be sure
            that it will be stored forever*
          </p>
          <p>
            You can edit link where this QR leads you, but picture will be the
            same, so you can print it (and place it in a wedding album, for
            example, <span className="underline">just like I did</span>)
          </p>
          <h2>Your Projects</h2>
          <div className="h-px border border-gray-200 rounded-full shadow-md" />
        </div>

        <div className="grid max-w-6xl grid-flow-row grid-cols-1 gap-8 m-auto mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userProjects?.map((project: any) => {
            console.log(project)

            return (
              <Project
                key={project.key}
                id={project.key}
                data={project.value}
                onDelete={() => {
                  firebase.remove(`projects/${uid}/${project.key}`)
                }}
                onChange={(e: Values) => {
                  firebase.set(
                    `projects/${uid}/${project.key}`,
                    omitBy(e, isEmpty)
                  )
                }}
              />
            )
          })}
          {(!userProjects || userProjects?.length === 0) && (
            <div>Create new project to get started</div>
          )}
        </div>

        <div className="flex max-w-6xl m-auto">
          <div
            className="flex items-center py-2 pl-4 pr-6 mt-8 text-xl text-white transition-all bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500"
            onClick={() => {
              firebase.push(`projects/${uid}`, {
                type: "url",
                title: "<Unnamed>",
                url: "https://example.com",
                email: {
                  address: "",
                  subject: "",
                  cc: "",
                },
                wifi: {
                  ssid: "",
                  password: "",
                  type: "",
                },
                phone: "",
                bgColor: "#000000",
                qrColor: "#ffffff",
              })
            }}
          >
            <PlusIcon className="mr-2 w-7 h-7" />
            <span>Create New Project</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
