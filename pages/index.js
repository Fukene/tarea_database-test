import React from "react"
import Image from "next/image"

export default function Home() {

  const borrar = async () => {

    try {
      const res = await fetch('/api/borrar', {
        method: 'DELETE'
      })

      const data = await res.json()
      console.log(data.message)

    } catch (error) {
      console.error(error)
    }
  }

  return <div className="home_container">
    <div className="fill"></div>
    <div className="home_header">
      <h2>Tarea Aeropintura</h2>
    </div>
  </div>
}

