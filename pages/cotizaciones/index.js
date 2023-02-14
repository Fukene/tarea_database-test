import React, { useEffect, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/router"
import { MongoClient } from "mongodb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'


const Cotizaciones = (props) => {
    const router = useRouter();

    const navigatePage = () => router.push('/cotizaciones/add-new')

    const [data, setData] = useState([...props.data])
    const [orden, setOrden] = useState('DSC')

    const cambioFormatoFechas = props.data.map((elem) => {
        const obj = { ...elem }
        obj.fechaEntrega = new Date(obj.fechaEntrega).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
        obj.fechaRecepcion = new Date(obj.fechaRecepcion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
        return obj
    })

    useEffect(() => {
        setData(cambioFormatoFechas)

    }, [])
 
    const iconoArriba = (
        <FontAwesomeIcon className="sorted_icons" icon={icon({ name: 'arrow-up-a-z', style: 'solid' })} />
    )

    const iconoAbajo = (
        <FontAwesomeIcon className="sorted_icons" icon={icon({ name: 'arrow-down-a-z', style: 'solid' })} />
    )

    const [ordenIconoCotizacion, setOrdenIconoCotizacion] = useState(iconoAbajo)
    const [ordenIconoNombre, setOrdenIconoNombre] = useState(iconoAbajo)
    const [ordenIconoFechaEntrega, setOrdenIconoFechaEntrega] = useState(iconoAbajo)
    const [ordenIconoFechaRecepcion, setOrdenIconoFechaRecepcion] = useState(iconoAbajo)

    const ordenarDatos = (columna) => {

        let copiaDatos = [...data]

        if (orden === 'ASC') {
            const sorted = copiaDatos.sort((a, b) => {
                if (columna != 'fechaEntrega' && columna != 'fechaRecepcion') {
                    return a[columna].toString().toLowerCase() > b[columna].toString().toLowerCase() ? 1 : -1
                } else {
                    return a[columna].toString() > b[columna].toString() ? 1 : -1
                }
            })
            setData(sorted)
            setOrden('DSC')
            switch (columna) {
                case "id":
                    setOrdenIconoCotizacion(iconoAbajo)
                    break;
                case "nombreCliente":
                    setOrdenIconoNombre(iconoAbajo)
                    break;
                case "fechaEntrega":
                    setOrdenIconoFechaEntrega(iconoAbajo)
                    break;
                case "fechaRecepcion":
                    setOrdenIconoFechaRecepcion(iconoAbajo)
                    break;
            }
        }

        if (orden === 'DSC') {
            const sorted = copiaDatos.sort((a, b) => {
                if (columna != 'fechaEntrega' && columna != 'fechaRecepcion') {
                    return a[columna].toString().toLowerCase() < b[columna].toString().toLowerCase() ? 1 : -1
                } else {
                    return a[columna].toString() < b[columna].toString() ? 1 : -1
                }
            })
            setData(sorted)
            setOrden('ASC')

            switch (columna) {
                case "id":
                    setOrdenIconoCotizacion(iconoArriba)
                    break;
                case "nombreCliente":
                    setOrdenIconoNombre(iconoArriba)
                    break;
                case "fechaEntrega":
                    setOrdenIconoFechaEntrega(iconoArriba)
                    break;
                case "fechaRecepcion":
                    setOrdenIconoFechaRecepcion(iconoArriba)
                    break;
            }
        }

    }

    const filtrarDatos = (columna, evento) => {

        if (evento === '') {
            setData(cambioFormatoFechas)
        } else {
            const filtrado = [...cambioFormatoFechas].filter((cotizacion) => {

                const eventoMinusculas = evento.toLowerCase()
                const cotizacionMinusculas = cotizacion[columna].toLowerCase()

                if (columna === 'id') {
                    return cotizacionMinusculas.includes(eventoMinusculas)
                }
                const cotizacionCortada = cotizacionMinusculas.slice(0, evento.length)
                return eventoMinusculas.includes(cotizacionCortada)

            })
            setData(filtrado)
        }
    }


    return <div className="main_container">
        <div className="invoice_header">

            <div className="invoice_header-logo">
                <h4>Hay un total de {data.length} {data.length == 1? "cotización" : "cotizaciones"}</h4>
            </div>

            <button className="btn"
                onClick={navigatePage}>Agregar Nueva</button>
        </div>

        <div className="invoice_container">

            <div className="box_sorted-items">
                <input id='cotizacion' placeholder="Filtrar por..." onChange={(e) => filtrarDatos("id", e.target.value)} />
                <input id="nombre" placeholder="Filtrar por..." onChange={(e) => filtrarDatos("nombreCliente", e.target.value)} />
                <input id="fechaEntrega" placeholder="Filtrar por..." onChange={(e) => filtrarDatos("fechaEntrega", e.target.value)} />
                <input id="fechaRecepcion" placeholder="Filtrar por..." onChange={(e) => filtrarDatos("fechaRecepcion", e.target.value)} />
            </div>

            <div className="box_sorted-items">
                <button onClick={() => ordenarDatos('id')}>Cotizacion{ordenIconoCotizacion}</button>
                <button onClick={() => ordenarDatos('nombreCliente')}>Nombre{ordenIconoNombre}</button>
                <button onClick={() => ordenarDatos('fechaEntrega')}>Fecha entrega{ordenIconoFechaEntrega}</button>
                <button onClick={() => ordenarDatos('fechaRecepcion')}>Fecha recepción{ordenIconoFechaRecepcion}</button>
            </div>
            <div className="fill"></div>

            {
                data?.map(cotizacion => (
                    <Link href={`/cotizaciones/cotizacion/${cotizacion.id}`} passHref key={cotizacion.id}>
                        <div className="box_items">
                            <div className="numeroCotizacion">
                                <p>Cotización #</p>
                                <h5 className="quote_id">{cotizacion.id.substr(18, 24).toUpperCase()}</h5>
                            </div>

                            <div className="nombreItem">
                                <p>Nombre:</p>
                                <h5 className="quote_client-name">{cotizacion.nombreCliente}</h5>
                            </div>

                            <div className="fechaEntregaItem">
                                <p>Fecha de entrega:</p>
                                <h5 className="quote_date">{cotizacion.fechaEntrega !== "Invalid Date" ? cotizacion.fechaEntrega : <FontAwesomeIcon className="sorted_icons" icon={icon({ name: 'calendar-xmark', style: 'solid' })} />
                                }</h5>
                            </div>

                            <div className="fechaRecepcionItem">
                                <p>Fecha de recepción:</p>
                                <h5 className="quote_date">{cotizacion.fechaRecepcion !== "Invalid Date" ? cotizacion.fechaRecepcion : <FontAwesomeIcon className="sorted_icons" icon={icon({ name: 'calendar-xmark', style: 'solid' })} />}</h5>
                            </div>

                            <div>
                                <p>Total</p>
                                <h4 className="quote_total">$ {cotizacion.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                            </div>

                        </div>
                    </Link>
                ))
            } </div>
    </div>
}

export async function getStaticProps() {
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const db = client.db()
    const cotizaciones = db.collection('cotizaciones')
    const clientes = db.collection('clientes')

    const cotizacionesCompletas = await cotizaciones.find({}).sort({ _id: -1 }).toArray()

    const data = await Promise.all(cotizacionesCompletas.map(async cotizacion => {
        const clienteId = cotizacion.clienteId
        const clienteIdEncontrado = await clientes.find({ _id: clienteId }).toArray()

        return {
            id: cotizacion._id.toString(),
            fechaRecepcion: cotizacion.fechaRecepcion,
            fechaEntrega: cotizacion.fechaEntrega,
            total: cotizacion.total,
            nombreCliente: clienteIdEncontrado[0].propietario.nombre
        }
    }))



    return {
        props: {
            data
        }, revalidate: 1
    }
}

export default Cotizaciones
