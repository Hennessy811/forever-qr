import React, { useEffect } from "react"

import { useFirebase } from "react-redux-firebase"
import { useHistory } from "react-router-dom"

import { useAppSelector } from "src/app/hooks"
import Google from "src/assets/img/google_sign_in.svg"

const Auth = () => {
  const firebase = useFirebase()
  const history = useHistory()
  const auth = useAppSelector((state) => state.firebase.auth)

  useEffect(() => {
    if (!auth.isEmpty) {
      history.push("/")
    }
  }, [history.location.pathname, auth])

  function loginWithGoogle() {
    return firebase.login({ provider: "google", type: "popup" })
  }

  return (
    <div className="container px-4 py-32 m-auto text-center">
      <h1 className="text-5xl prose font-extralight">Forever QR</h1>
      <p className="m-auto mt-4 prose">
        Generate you own dynamic QR codes that just will be there
      </p>
      <p className="m-auto mt-4 prose">Sign in to get started. Its free</p>
      <div className="max-w-sm p-8 m-auto mt-12 rounded-lg shadow-lg">
        <h2 className="text-3xl prose">Sign In</h2>

        <div
          onClick={() => {
            loginWithGoogle()
          }}
          className="flex items-center justify-center p-2 mt-4 rounded-sm shadow-md cursor-pointer "
        >
          <div>
            <img src={Google} alt="" />
          </div>
          <p className="ml-3 font-bold text-gray-700">Sign In with Google</p>
        </div>
      </div>
    </div>
  )
}

export default Auth
