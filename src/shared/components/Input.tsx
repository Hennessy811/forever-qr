import React, { FC } from "react"

interface InputProps {
  label: string
  value: string
  onChange: (string) => void
  type?: "text" | "tel" | "email" | "password"
  placeholder: string
}

const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="my-4">
    <label
      className="block mb-2 text-sm font-bold text-gray-700"
      htmlFor={label}
    >
      {label}
    </label>
    <input
      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

export default Input
