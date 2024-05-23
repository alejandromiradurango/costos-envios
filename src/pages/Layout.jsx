import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <header className='container mx-auto p-5 space-x-2'>
            <Link className='p-2 border rounded-md border-neutral-600' to='version01'>Versión 1</Link>
            <Link className='p-2 border rounded-md border-neutral-600' to='version02'>Versión 2</Link>
            <Link className='p-2 border rounded-md border-neutral-600' to='version03'>Versión 3</Link>
            <Link className='p-2 border rounded-md border-neutral-600' to='formulario'>Formulario</Link>
        </header>
        <main className='p-5 container mx-auto'>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout