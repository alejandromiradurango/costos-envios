import React, { useState } from 'react'
import { useInputs } from '../hooks'
import { countries, inputs } from '../constants'
import { calcularCostoEnvio } from '../utils'

const VersionOne = () => {
  const { inputValues, handleChange } = useInputs(inputs)

  const customers = [0, 30, 50, 70, 100]

  const [customerSelected, setCustomerSelected] = useState(0)
  const [total, setTotal] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const zone = e.target.destination.value

    const totalShip = calcularCostoEnvio(inputValues.alto, inputValues.ancho, inputValues.largo, inputValues.peso, zone)

    setTotal(totalShip)
  }
  return (
        <div>
            <ul className='flex items-center gap-2 mb-6'>
                {customers.map(customer => (
                    <li key={customer}>
                        <button onClick={() => setCustomerSelected(customer)} className={`p-2 border rounded-md border-neutral-600 transition-all ${customerSelected === customer ? 'bg-neutral-600 text-white' : 'hover:bg-neutral-400'}`}>Cliente {customer}</button>
                    </li>
                ))}
            </ul>
            <div className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md border">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Calculadora de Costos de Envío</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Ingresa los detalles de tu envío y obtén una estimación del costo.
                    </p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                                <option value={zone} key={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {inputs.map(({ id, label, value }) => (
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
                {total && (
                    <div className="bg-gray-100 border p-4 rounded-lg">
                        <h2 className="text-lg font-bold">Estimación del Costo de Envío</h2>
                        <p className="text-4xl font-bold text-primary">{!isNaN(total) && '$'}{isNaN(total) ? total : (total + (total * (customerSelected / 100))).toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
  )
}

export default VersionOne