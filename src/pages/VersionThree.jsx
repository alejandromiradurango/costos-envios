import React, { useEffect, useRef, useState } from 'react'
import { countries, inputs, precios } from '../constants'
import { calcularCostoEnvio } from '../utils'

// Custom hook para manejar el estado de los productos
const useProducts = (initialInputs) => {
  const createProduct = () => {
    const initialProduct = { id: Date.now(), cantidad: 1 }
    initialInputs.forEach(input => {
      initialProduct[input.id] = ''
    })
    return initialProduct
  }

  const [products, setProducts] = useState([createProduct()])

  const handleChange = (productId, field, value) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, [field]: value } : product
    ))
  }

  const addProduct = () => {
    setProducts([...products, createProduct()])
  }

  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  return {
    products,
    handleChange,
    addProduct,
    removeProduct
  }
}

const VersionThree = () => {
  const { products, handleChange, addProduct, removeProduct } = useProducts(inputs)
  const [customerSelected, setCustomerSelected] = useState(0)
  const [total, setTotal] = useState(null)
  const [zoneSelected, setZoneSelected] = useState('')
  const formRef = useRef(null)
  console.log(formRef.current)

  const customers = [0, 30, 50, 70, 100]

  const handleSubmit = (e) => {
    if (e) e.preventDefault()

    const form = e ? e.target : formRef.current

    const country = form.destination.value
    const zone = countries.find(({ name }) => name === country).zone
    setZoneSelected(zone)
    const totalShip = products.reduce((acc, product) => {
      return acc + calcularCostoEnvio(product.alto, product.ancho, product.largo, product.peso, zone) * product.cantidad
    }, 0)

    setTotal(totalShip)
  }

  const maxKey = Math.max(...Object.keys(precios[zoneSelected] || 'A').map(Number))

  useEffect(() => {
    if (products.length > 1 && formRef.current) {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
      formRef.current.dispatchEvent(submitEvent)
    }
  }, [products.length])
  return (
    <div>
      <ul className='flex items-center gap-2 mb-6'>
        {customers.map(customer => (
          <li key={customer}>
            <button onClick={() => setCustomerSelected(customer)} className={`p-2 border rounded-md border-neutral-600 transition-all ${customerSelected === customer ? 'bg-neutral-600 text-white' : 'hover:bg-neutral-400'}`}>Cliente {customer}</button>
          </li>
        ))}
      </ul>
      <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md border">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Calculadora de Costos de Envío</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ingresa los detalles de tu envío y obtén una estimación del costo.
          </p>
        </div>
        <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
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
          {products.map(product => (
            <div key={product.id} className="grid grid-cols-12 mb-4">
              <div className="space-y-2 col-span-2 self-end">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={`cantidad-${product.id}`}
                >
                  Cantidad
                </label>
                <select
                  className="bg-white flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  id={`cantidad-${product.id}`}
                  value={product.cantidad}
                  onChange={(e) => handleChange(product.id, 'cantidad', Number(e.target.value))}
                >
                  {[...Array(20).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
              {inputs.sort((a, b) => b.id === 'peso').map(({ id, label }) => (
                <div className="space-y-2 col-span-2" key={id}>
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor={`${id}-${product.id}`}
                  >
                    {label}
                  </label>
                  <input
                    className="placeholder:capitalize flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    step="any"
                    id={`${id}-${product.id}`}
                    placeholder={id}
                    value={product[id]}
                    onChange={(e) => handleChange(product.id, id, Number(e.target.value))}
                  />
                </div>
              ))}
              {products.length > 1 && (
                <button type="button" onClick={() => removeProduct(product.id)} className="self-end col-span-2 ml-2 text-red-600 border border-red-600 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-3 py-2">
                  Eliminar
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addProduct} className="text-blue-600 text-xs inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mb-4">
            + AGREGUE OTRO PAQUETE
          </button>
          <button className="bg-neutral-800 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Calcular Costo
          </button>
        </form>
        {total !== null && (
          <div className="bg-gray-100 border p-4 rounded-lg">
            <h2 className="text-lg font-bold">Estimación del Costo de Envío</h2>
            <p className="text-4xl font-bold text-primary">{!isNaN(total) && '$'}{isNaN(total) ? `Alguno de los paquetes sobrepaso nuestro peso permitido: ${maxKey} kg` : (total + (total * (customerSelected / 100))).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VersionThree
