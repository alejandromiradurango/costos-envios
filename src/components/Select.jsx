import React from 'react'

const Select = ({ label, id, value, handleChange, options, required = true }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-800" htmlFor={id}>
        {label}
      </label>
      <select
        className="bg-white flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        id={id}
        required={required}
        value={value}
        onChange={handleChange}
      >
        <option value="">Selecciona tu {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
