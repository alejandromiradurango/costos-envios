import React, { useState } from 'react'
import { contact, countries, inputs } from '../constants'
import { calcularCostoEnvio, sendData } from '../utils'
import { useInputs } from '../hooks'

const VersionTwo = () => {
  const [step, setStep] = useState(1)
  const [country, setCountry] = useState('')

  const { inputValues, handleChange } = useInputs(inputs)
  const { inputValues: inputValuesContact, handleChange: handleChangeContact } = useInputs(contact)

  const [total, setTotal] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const country = e.target.destination.value

    setCountry(country)

    const zone = countries.find(({ name }) => name === country).zone

    const totalShip = calcularCostoEnvio(inputValues.alto, inputValues.ancho, inputValues.largo, inputValues.peso, zone)

    setTotal(totalShip)

    setStep(2)
  }

  const sendInfo = (e) => {
    e.preventDefault()

    const { name, lastName, email, phone } = inputValuesContact

    const body = {
      name,
      lastName,
      email,
      phone,
      total,
      alto: inputValues.alto,
      ancho: inputValues.ancho,
      largo: inputValues.largo,
      peso: inputValues.peso,
      country
    }

    sendData({ data: body })

    setStep(3)
  }
  return (
        <div>
            <div className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md border">
                <div className={`space-y-2 ${step === 3 ? 'hidden' : 'block'}`}>
                    <h1 className="text-2xl font-bold">Calculadora de Costos de Envío</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Ingresa los detalles de tu envío y obtén una estimación del costo.
                    </p>
                </div>
                {/* FORMULARIO */}
                <form className={`${step === 1 ? 'block' : 'hidden'} space-y-4`} onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="destination-country"
                        >
                            País de Destino
                        </label>
                        <select
                            className="flex h-10 w-full bg-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="destination"
                            required
                        >
                            <option value="">Ingresa el país de destino</option>
                            {countries.map(({ name, zone }) => (
                                <option value={name} key={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {inputs.map(({ id, label }) => (
                            <div className="space-y-2" key={id}>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor={id}
                                >
                                    {label}
                                </label>
                                <input
                                    className="placeholder:capitalize flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="number"
                                    step="any"
                                    id={id}
                                    placeholder={id}
                                    value={inputValues[id]}
                                    onChange={(e) => handleChange(id, Number(e.target.value))}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="bg-neutral-800 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                        Calcular Costo
                    </button>
                </form>
                <form className={`${step === 2 ? 'block' : 'hidden'} space-y-4`} onSubmit={sendInfo}>
                    {contact.map(({ id, label }) => (
                        <div className="space-y-2" key={id}>
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor={id}
                            >
                                {label}
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                id={id}
                                value={inputValuesContact[id]}
                                onChange={(e) => handleChangeContact(id, e.target.value)}
                                placeholder={`Ingresa tu ${label.toLowerCase()}`}
                                required
                            />
                        </div>
                    ))}
                    <button className="bg-neutral-800 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                        Confirmar
                    </button>
                </form>
                <div className={`${step === 3 ? 'block' : 'hidden'} space-y-4`}>
                    <div className="bg-gray-100 border p-4 rounded-lg">
                        <h2 className="text-2xl mb-3 font-bold">Gracias por contactarnos!</h2>
                        <p className="text-md text-neutral-600">Te enviaremos a tu correo los datos de la cotización</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default VersionTwo