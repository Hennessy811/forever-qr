import React from "react"

const Button = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-1 bg-transparent border border-blue-400 rounded-lg"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
