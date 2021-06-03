import React, { Fragment } from "react"

import { Menu, Transition } from "@headlessui/react"
import { connect } from "react-redux"
import { useFirebase } from "react-redux-firebase"

import { useAppSelector } from "src/app/hooks"
import { RootState } from "src/app/store"

const Dropdown = ({ title, options }) => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full">
            {title}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-xl focus:outline-none">
            <div className="px-1 py-1 ">
              {options.map((option) => (
                <Menu.Item key={option.title}>
                  {({ active }) => (
                    <button
                      onClick={() => option.action()}
                      className={`${
                        active
                          ? "bg-violet-500 text-purple-500"
                          : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {option.title}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

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
              className="w-10 h-10 rounded-full"
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
