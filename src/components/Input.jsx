import React from 'react'

const Input = ({ label, id, placeholder, value, handleChange, required = true, type = 'text' }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-800" htmlFor={id}>
        {label}
      </label>
      <input
        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        type={type}
      />
    </div>
  )
}

export default Input
