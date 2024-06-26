import React, { useState } from 'react'
import { Fieldset, Input, Select } from '../components'
import { provincias } from '../constants'
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()

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
        navigate('gracias')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className='p-12'>
      <div className="space-y-2 text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-800">Crea tu cuenta</h1>
      </div>
      <form className="mx-auto container bg-white space-y-6 border border-blue-800/40 rounded-md p-6" onSubmit={handleSubmit}>
        <div className="space-y-8">
          <Fieldset legend='Información personal'>
            <Input label='Nombre' id='nombre' placeholder='Ingresa tu nombre' value={formData.nombre} handleChange={handleChange} />
            <Input label='Apellido' id='apellido' placeholder='Ingresa tu apellido' value={formData.apellido} handleChange={handleChange} />
            <Input label='Razón social' id='razonSocial' placeholder='Ingresa tu razón social' value={formData.razonSocial} handleChange={handleChange} />
            <Select label='Condición IVA' id='condicionIva' value={formData.condicionIva} handleChange={handleChange} options={['Responsable Inscripto', 'Monotributo', 'Consumidor Final']} required={anotherDirection} />
            <Input label='CUIT' id='cuit' placeholder='Ingresa tu CUIT' value={formData.cuit} handleChange={handleChange} />
            <Input label='Email' id='email' placeholder='Ingresa tu email' value={formData.email} handleChange={handleChange} type='email' />
            <Input label='Teléfono' id='telefono' placeholder='Ingresa tu teléfono' value={formData.telefono} handleChange={handleChange} />
          </Fieldset>
          <Fieldset legend='Dirección'>
            <Input label='Número' id='numero' placeholder='Ingresa tu número' value={formData.numero} handleChange={handleChange} />
            <Input label='Piso' id='piso' placeholder='Ingresa tu piso' value={formData.piso} handleChange={handleChange} />
            <Input label='Departamento' id='depto' placeholder='Ingresa tu departamento' value={formData.depto} handleChange={handleChange} />
            <Input label='Código postal' id='codigoPostal' placeholder='Ingresa tu código postal' value={formData.codigoPostal} handleChange={handleChange} />
            <Input label='Localidad' id='localidad' placeholder='Ingresa tu localidad' value={formData.localidad} handleChange={handleChange} />
            <Select label='Provincia' id='provincia' value={formData.provincia} handleChange={handleChange} options={provincias} />
          </Fieldset>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="another-direction"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-neutral-300 accent-blue-800 shadow focus:ring-2 focus:ring-green-600/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <Fieldset legend='Dirección de facturación'>
                <Input label='Calle' id='billing-calle' placeholder='Ingresa tu calle' value={formData.billingAddress.calle} handleChange={handleChange} required={anotherDirection} />
                <Input label='Número' id='billing-numero' placeholder='Ingresa tu número' value={formData.billingAddress.numero} handleChange={handleChange} required={anotherDirection} />
                <Input label='Piso' id='billing-piso' placeholder='Ingresa tu piso' value={formData.billingAddress.piso} handleChange={handleChange} required={anotherDirection} />
                <Input label='Departamento' id='billing-depto' placeholder='Ingresa tu departamento' value={formData.billingAddress.depto} handleChange={handleChange} required={anotherDirection} />
                <Input label='Código postal' id='billing-codigoPostal' placeholder='Ingresa tu código postal' value={formData.billingAddress.codigoPostal} handleChange={handleChange} required={anotherDirection} />
                <Input label='Localidad' id='billing-localidad' placeholder='Ingresa tu localidad' value={formData.billingAddress.localidad} handleChange={handleChange} required={anotherDirection} />
                <Select label='Provincia' id='billing-provincia' value={formData.billingAddress.provincia} handleChange={handleChange} options={provincias} required={anotherDirection} />
              </Fieldset>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-800 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            type="submit"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
