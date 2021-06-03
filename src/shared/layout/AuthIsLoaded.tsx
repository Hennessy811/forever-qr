import React from "react"

import { useSelector } from "react-redux"
import { isLoaded } from "react-redux-firebase"

import { RootState } from "src/app/store"

function AuthIsLoaded({ children }) {
  const auth = useSelector((state: RootState) => state.firebase.auth)
  if (!isLoaded(auth))
    return (
      <div className="flex items-center justify-center w-full h-screen font-mono prose lg:prose-2xl">
        Loading...
      </div>
    )
  return children
}

export default AuthIsLoaded
