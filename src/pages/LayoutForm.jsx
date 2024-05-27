import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutForm = () => {
  return (
        <main className='bg-cover h-full' style={{ backgroundImage: 'url(http://cotizador.waiverpicks.com.ar/fondo_blur.webp)' }}>
            <header className='bg-blue-800 text-white'>
                <div className="container flex items-center justify-between max-w-5xl py-6">
                    <img className='max-w-40' src="http://cotizador.waiverpicks.com.ar/assets/waiverpicks.logo_trans.png" alt="" />
                    <p className='text-3xl font-black'>you order, <br /> we deliver!</p>
                </div>
            </header>
            <Outlet />
        </main>
  )
}

export default LayoutForm