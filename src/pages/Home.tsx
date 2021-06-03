import React from "react"

import { PlusIcon } from "@heroicons/react/outline"
import { useFirebase, useFirebaseConnect } from "react-redux-firebase"

import { useAppSelector } from "src/app/hooks"
import Project from "src/shared/components/Project"

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
      <div className="container px-4 py-12 m-auto prose prose-lg lg:px-0">
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
        {userProjects?.map((project: any) => {
          return (
            <Project
              key={project.key}
              id={project.key}
              title={project.value.title}
              targetUrl={project.value.targetUrl}
              onDelete={() => {
                firebase.remove(`projects/${uid}/${project.key}`)
              }}
              onChange={(e) => {
                firebase.set(`projects/${uid}/${project.key}`, e)
              }}
            />
          )
        })}
        {(!userProjects || userProjects?.length === 0) && (
          <div>Create new project to get started</div>
        )}

        <div className="flex ">
          <div
            className="flex items-center py-2 pl-4 pr-6 mt-8 text-xl text-white transition-all bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500"
            onClick={() => {
              firebase.push(`projects/${uid}`, {
                title: "Project name",
                targetUrl: "https://example.com",
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
