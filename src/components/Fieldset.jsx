import React from 'react'

const Fieldset = ({ children, legend }) => {
  return (
        <fieldset className="space-y-4 border border-blue-700/50 py-4 px-8 rounded-md">
            <legend className='font-bold text-lg px-4 text-blue-800'>{legend}</legend>
            {children}
        </fieldset>
  )
}

export default Fieldset