import React, { useEffect } from "react"

import { useFirebaseConnect } from "react-redux-firebase"
import { useParams } from "react-router-dom"

import { useAppSelector } from "src/app/hooks"
import generateAddress from "src/shared/utils/generateAddress"

import { Values } from "./Home/components/Project"

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

  useEffect(() => {
    if (currentProject) {
      // console.log(currentProject, generateAddress(currentProject))
      try {
        window.location.replace(generateAddress(currentProject))
      } catch (error) {
        console.log(error)
      }
    }
  }, [id, currentProject])

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
