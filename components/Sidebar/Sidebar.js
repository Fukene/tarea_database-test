import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Sidebar() {

  const router = useRouter()

  return <div className='sidebar'>
    <div className='sidebar_container'>
      <div className='sidebar_header'>

        <button onClick={() => router.push('/cotizaciones')} className="sidebar_logo">
          Cotizaciones
        </button>

        <button onClick={() => router.push('/ordenes')} className="sidebar_logo">
          Órdenes
        </button>

        <button onClick={() => router.push('/facturas')} className="sidebar_logo">
          Facturas
        </button>

      </div>
    </div>
  </div >
}

export default Sidebar