import React, { useState } from 'react'

const Form = () => {
  const [anotherDirection, setAnotherDirection] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    razonSocial: '',
    condicionIva: '',
    cuit: '',
    email: '',
    telefono: '',
    calle: '',
    numero: '',
    piso: '',
    depto: '',
    codigoPostal: '',
    localidad: '',
    provincia: '',
    billingAddress: {
      calle: '',
      numero: '',
      piso: '',
      depto: '',
      codigoPostal: '',
      localidad: '',
      provincia: ''
    }
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id.startsWith('billing-')) {
      const key = id.replace('billing-', '')
      setFormData((prevData) => ({
        ...prevData,
        billingAddress: {
          ...prevData.billingAddress,
          [key]: value
        }
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let dataToSubmit = formData

    if (!anotherDirection) {
      dataToSubmit = {
        ...formData,
        billingAddress: {
          calle: formData.calle,
          numero: formData.numero,
          piso: formData.piso,
          depto: formData.depto,
          codigoPostal: formData.codigoPostal,
          localidad: formData.localidad,
          provincia: formData.provincia
        }
      }
    }

    fetch('https://eocpv2cu9zx3uq2.m.pipedream.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSubmit)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        setFormSubmitted(true)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
        <form className="mx-auto max-w-6xl space-y-6 border border-neutral-300 rounded-md p-6" onSubmit={handleSubmit}>
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">{!formSubmitted ? 'Crea tu cuenta' : '¡Gracias!'}</h1>
            </div>
            {!formSubmitted
              ? (
                <>
                    <div className="space-y-5">
                        <div className="flex gap-3 flex-col lg:flex-row items-start">
                            <fieldset className="space-y-4 border border-neutral-300 py-4 px-8 rounded-md">
                                <legend className='font-bold text-lg px-4'>Información personal</legend>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="nombre">Nombre</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="nombre" placeholder="Ingresa tu nombre" required value={formData.nombre} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="apellido">Apellido</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="apellido" placeholder="Ingresa tu apellido" required value={formData.apellido} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="razonSocial">Razón social</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="razonSocial" placeholder="Ingresa tu razón social" required value={formData.razonSocial} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="condicionIva">Condición IVA</label>
                                        <select className="bg-white flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="condicionIva" required value={formData.condicionIva} onChange={handleChange}>
                                            <option value="">Ingresa tu condición</option>
                                            <option value="Responsable Inscripto">Responsable Inscripto</option>
                                            <option value="Monotributo">Monotributo</option>
                                            <option value="Consumidor Final">Consumidor Final</option>
                                            {/* Agregar opciones aquí */}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="cuit">CUIT</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="cuit" placeholder="Ingresa tu CUIT" required value={formData.cuit} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="Ingresa tu email" required type="email" value={formData.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="telefono">Teléfono</label>
                                    <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="telefono" placeholder="Ingresa tu teléfono" required value={formData.telefono} onChange={handleChange} />
                                </div>
                            </fieldset>
                            <fieldset className="space-y-4 border border-neutral-300 py-4 px-8 rounded-md">
                                <legend className='font-bold text-lg px-4'>Dirección</legend>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="calle">Calle</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="calle" placeholder="Ingresa tu calle" required value={formData.calle} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="numero">Número</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="numero" placeholder="Ingresa tu número" required value={formData.numero} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="piso">Piso</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="piso" placeholder="Ingresa tu piso" required value={formData.piso} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="depto">Departamento</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="depto" placeholder="Ingresa tu departamento" required value={formData.depto} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="codigoPostal">Código postal</label>
                                    <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="codigoPostal" placeholder="Ingresa tu código postal" required value={formData.codigoPostal} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="localidad">Localidad</label>
                                    <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="localidad" placeholder="Ingresa tu localidad" required value={formData.localidad} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="provincia">Provincia</label>
                                    <select className="bg-white flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="provincia" required value={formData.provincia} onChange={handleChange}>
                                        <option value="">Selecciona tu provincia</option>
                                        <option value="Buenos Aires">Buenos Aires</option>
                                    </select>
                                </div>
                            </fieldset>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="another-direction"
                                    className="peer h-4 w-4 shrink-0 rounded-sm border border-neutral-300 shadow focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    checked={anotherDirection}
                                    onChange={() => setAnotherDirection(!anotherDirection)}
                                />
                                <label
                                    htmlFor="another-direction"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    ¿Deseas recibir la factura en una dirección diferente?
                                </label>
                            </div>
                            {anotherDirection && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billing-calle">Calle</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="billing-calle" placeholder="Ingresa tu calle" required={anotherDirection} value={formData.billingAddress.calle} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billing-numero">Número</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="billing-numero" placeholder="Ingresa tu número" required={anotherDirection} value={formData.billingAddress.numero} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billing-piso">Piso</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="billing-piso" placeholder="Ingresa tu piso" required={anotherDirection} value={formData.billingAddress.piso} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billing-depto">Departamento</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="billing-depto" placeholder="Ingresa tu departamento" required={anotherDirection} value={formData.billingAddress.depto} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billing-codigoPostal">Código postal</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="billing-codigoPostal" placeholder="Ingresa tu código postal" required={anotherDirection} value={formData.billingAddress.codigoPostal} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billing-localidad">Localidad</label>
                                        <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="billing-localidad" placeholder="Ingresa tu localidad" required={anotherDirection} value={formData.billingAddress.localidad} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billing-provincia">Provincia</label>
                                        <select className="bg-white flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="billing-provincia" required={anotherDirection} value={formData.billingAddress.provincia} onChange={handleChange}>
                                            <option value="">Selecciona tu provincia</option>
                                            <option value="Buenos Aires">Buenos Aires</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-black text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            type="submit"
                        >
                            Crear cuenta
                        </button>
                    </div>
                </>
                )
              : <p className='text-center text-lg'>Registro realizado correctamente</p>
            }
        </form>
  )
}

export default Form
