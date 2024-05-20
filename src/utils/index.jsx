import { precios } from '../constants'

// Función para calcular el peso volumétrico
function calcularPesoVolumetrico (alto, ancho, largo) {
  // Fórmula para calcular el peso volumétrico en kg
  return (alto * ancho * largo) / 5000
}

// Función para obtener el precio basado en el tipo y el peso
function obtenerPrecio (tipo, peso) {
  if (precios[tipo]) {
    const pesosDisponibles = Object.keys(precios[tipo]).map(Number).sort((a, b) => a - b)
    for (let i = 0; i < pesosDisponibles.length; i++) {
      if (peso <= pesosDisponibles[i]) {
        return precios[tipo][pesosDisponibles[i]]
      }
    }
    return `Actualmente no tenemos disponibilidad para enviar un paquete de ${peso} kg`
  } else {
    return 'Tipo no válido'
  }
}

// Función principal para calcular el costo de envío
export function calcularCostoEnvio (alto, ancho, largo, peso, zona) {
  // Calcular peso volumétrico
  const pesoVolumetrico = calcularPesoVolumetrico(alto, ancho, largo)

  const pesoFinal = peso > pesoVolumetrico ? peso : pesoVolumetrico

  // Calcular el costo de envío basado en la zona
  const costoEnvio = obtenerPrecio(zona, pesoFinal)
  console.log(`Costo de Envío para la Zona ${zona}: ${costoEnvio} unidades monetarias`)

  return costoEnvio
}

export const sendData = async ({ data }) => {
  try {
    const response = await fetch('https://eo6soera7rt5un0.m.pipedream.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    console.log(response)

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    return response
  } catch (error) {
    console.error(error)
    return false
  }
}
