import { useState } from 'react'

const useInputs = (initialInputs) => {
  const [inputValues, setInputValues] = useState(
    initialInputs.reduce((acc, input) => {
      acc[input.id] = input.value
      return acc
    }, {})
  )

  const handleChange = (id, newValue) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: newValue
    }))
  }

  return {
    inputValues,
    handleChange
  }
}

export default useInputs
