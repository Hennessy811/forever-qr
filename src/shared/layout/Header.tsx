import React from "react"

import { connect } from "react-redux"
import { useFirebase } from "react-redux-firebase"

import { useAppSelector } from "src/app/hooks"
import { RootState } from "src/app/store"

import Dropdown from "../components/Dropdown"

const Header = () => {
  const user = useAppSelector((state) => state.firebase.profile)
  const firebase = useFirebase()

  const options = [
    {
      title: "Logout",
      action: () => {
        console.log("Logout")
        firebase.logout()
      },
    },
  ]

  return (
    <nav className="flex justify-between p-4 shadow-md">
      <div className="flex items-center text-lg font-light">Forever QR</div>

      <Dropdown
        options={options}
        title={
          <div className="flex items-center cursor-pointer">
            <div className="mr-3 leading-5 prose truncate w-28">
              {user.displayName}
            </div>
            <img
              src={user.avatarUrl}
              alt=""
              className="object-cover w-10 h-10 rounded-full"
            />
          </div>
        }
      />
    </nav>
  )
}

const enhance = connect(({ firebase }: RootState) => {
  console.log(firebase)

  return {
    auth: firebase.auth,
    profile: firebase.profile,
  }
})

export default enhance(Header)
