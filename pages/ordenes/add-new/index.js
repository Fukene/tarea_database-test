import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const AddNew = () => {

    const router = useRouter()
    const [items, setItems] = useState([])


    const fechaRecepcion = useRef('')
    const fechaEntrega = useRef('')
    const nombreCliente = useRef('')
    const cedula = useRef('')
    const lugarDeOperaciones = useRef('')
    const direccionCliente = useRef('')
    const telefonoCliente = useRef('')
    const emailCliente = useRef('')
    const matriculaAeronave = useRef('')
    const marcaAeronave = useRef('')
    const modeloAeronave = useRef('')
    const numeroDeSerie = useRef('')
    const anoFabricacion = useRef('')
    const categoriaAeronave = useRef('')
    const horasTotales = useRef('')
    const tipoInspeccion = useRef('')
    const fechaMantenimiento = useRef('')
    const horasMantenimiento = useRef('')
    const categoriaMantenimiento = useRef('')
    const utilizacion = useRef('')
    const pesoBruto = useRef('')
    const pesoVacio = useRef('')
    const fechaUltimoPeso = useRef('')
    const tiempoReparacion = useRef('')
    const formaPago = useRef('')
    const observaciones = useRef('')
    const explotador = useRef('')
    const nombreRepresentanteLegal = useRef('')
    const direccionRepresentanteLegal = useRef('')
    const telefonoRepresentanteLegal = useRef('')
    const emailRepresentanteLegal = useRef('')




    // añadir un elemento

    const addItem = () => {
        setItems([...items, { nombre: '', cantidad: 0, precio: 0, descripcion: "", total: 0 }])
    }

    const handlerChange = (event, i) => {
        const { name, value } = event.target
        const list = [...items]
        list[i][name] = value
        list[i]['total'] = list[i]['cantidad'] * list[i]['precio']
        setItems(list)
    }

    // borrar un elemento

    const deleteItem = (i) => {
        const inputData = [...items]
        inputData.splice(i, 1)
        setItems(inputData)
    }

    // cantidad total de todos los productos

    const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0)

    // enviar datos a MongoDB

    const crearOrden = async () => {
        try {

            const res = await fetch('/api/add-new-order', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    fechaRecepcion: fechaRecepcion.current.value,
                    fechaEntrega: fechaEntrega.current.value,

                    nombreCliente: nombreCliente.current.value,
                    cedula: cedula.current.value,
                    direccionCliente: direccionCliente.current.value,
                    telefonoCliente: telefonoCliente.current.value,
                    emailCliente: emailCliente.current.value,
                    lugarOperaciones: lugarDeOperaciones.current.value,

                    explotador: explotador.current.value,
                    nombreRepresentanteLegal: nombreRepresentanteLegal.current.value,
                    direccionRepresentanteLegal: direccionRepresentanteLegal.current.value,
                    telefonoRepresentanteLegal: telefonoRepresentanteLegal.current.value,
                    emailRepresentanteLegal: emailRepresentanteLegal.current.value,

                    matriculaAeronave: matriculaAeronave.current.value,
                    marcaAeronave: marcaAeronave.current.value,
                    modeloAeronave: modeloAeronave.current.value,
                    numeroDeSerieAeronave: numeroDeSerie.current.value,
                    anoFabricacionAeronave: anoFabricacion.current.value,
                    categoriaAeronave: categoriaAeronave.current.value,
                    horasTotalesAeronave: horasTotales.current.value,
                    pesoBrutoAeronave: pesoBruto.current.value,
                    pesoVacioAeronave: pesoVacio.current.value,
                    fechaUltimoPesoAeronave: fechaUltimoPeso.current.value,

                    tipoInspeccion: tipoInspeccion.current.value,
                    fechaMantenimiento: fechaMantenimiento.current.value,
                    horasMantenimiento: horasMantenimiento.current.value,
                    categoriaMantenimiento: categoriaMantenimiento.current.value,
                    utilizacion: utilizacion.current.value,

                    items: items,
                    total: totalAmount,
                    tiempoReparacion: tiempoReparacion.current.value,
                    formaPago: formaPago.current.value,
                    observaciones: observaciones.current.value

                }),
            })

            const data = await res.json()
            router.push('/ordenes')
            toast.success(data.message)
        } catch (error) {
            toast.error('Algo salió mal')
            console.error(error)
        }
    }

    /* RELLENAR DATOS AUTOMÁTICAMENTE */

    const [clienteNombreActualizado, setClienteNombreActualizado] = useState('')
    const [lugarOperacionesActualizado, setLugarOperacionesActualizado] = useState('')
    const [clienteDireccionActualizado, setClienteDireccionActualizado] = useState('')
    const [clienteTelefonoActualizado, setClienteTelefonoActualizado] = useState('')
    const [clienteEmailActualizado, setClienteEmailActualizado] = useState('')
    const [explotadorActualizado, setExplotadorActualizado] = useState('')
    const [representanteLegalNombreActualizado, setRepresentanteLegalNombreActualizado] = useState('')
    const [representanteLegalDireccionActualizado, setRepresentanteLegalDireccionActualizado] = useState('')
    const [representanteLegalTelefonoActualizado, setRepresentanteLegalTelefonoActualizado] = useState('')
    const [representanteLegalEmailActualizado, setRepresentanteLegalEmailActualizado] = useState('')
    const [marcaAeronaveActualizado, setMarcaAeronaveActualizado] = useState('')
    const [modeloAeronaveActualizado, setModeloAeronaveActualizado] = useState('')
    const [numeroSerieAeronaveActualizado, setNumeroSerieAeronaveActualizado] = useState('')
    const [horasAeronaveActualizado, setHorasAeronaveActualizado] = useState('')
    const [anoFabricacionActualizado, setAnoFabricacionActualizado] = useState('')
    const [categoriaAeronaveActualizado, setCategoriaAeronaveActualizado] = useState('')
    const [tipoInspeccionActualizado, setTipoInspeccionActualizado] = useState('')
    const [fechaMantenimientoActualizado, setFechaMantenimientoActualizado] = useState('')
    const [horasMantenimientoActualizado, setHorasMantenimientoActualizado] = useState('')
    const [categoriaMantenimientoActualizado, setCategoriaMantenimientoActualizado] = useState('')
    const [utilizacionActualizado, setUtilizacionActualizado] = useState('')
    const [pesoBrutoActualizado, setPesoBrutoActualizado] = useState('')
    const [pesoVacioActualizado, setPesoVacioActualizado] = useState('')
    const [fechaUltimoPesoActualizado, setFechaUltimoPesoActualizado] = useState('')

    const comprobarInformacionClientes = async (tipoBusqueda, id) => {

        try {
            const res = await fetch(`/api/checkInformation/search?tipoBusqueda=${tipoBusqueda}&id=${id}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

            const data = await res.json()
            const cotizacion = data.datosEncontrados[0];

            setClienteNombreActualizado(cotizacion.propietario.nombre)
            setLugarOperacionesActualizado(cotizacion.propietario.lugarOperaciones)
            setClienteDireccionActualizado(cotizacion.propietario.direccion)
            setClienteTelefonoActualizado(cotizacion.propietario.telefono)
            setClienteEmailActualizado(cotizacion.propietario.email)
            setExplotadorActualizado(cotizacion.explotador)
            setRepresentanteLegalNombreActualizado(cotizacion.representanteLegal.nombre)
            setRepresentanteLegalDireccionActualizado(cotizacion.representanteLegal.direccion)
            setRepresentanteLegalTelefonoActualizado(cotizacion.representanteLegal.telefono)
            setRepresentanteLegalEmailActualizado(cotizacion.representanteLegal.email)

        } catch (error) {
            toast.error('Algo salió mal o no hay ninguna persona')
            console.error(error)
        }
    }

    const comprobarInformacionAeronaves = async (tipoBusqueda, id) => {
        try {
            const res = await fetch(`/api/checkInformation/search?tipoBusqueda=${tipoBusqueda}&id=${id}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

            const data = await res.json()
            const cotizacion = data.datosEncontrados[0];

            setMarcaAeronaveActualizado(cotizacion.datosAeronave.marca)
            setModeloAeronaveActualizado(cotizacion.datosAeronave.modelo)
            setNumeroSerieAeronaveActualizado(cotizacion.datosAeronave.numeroDeSerie)
            setHorasAeronaveActualizado(cotizacion.datosAeronave.horasTotales)
            setAnoFabricacionActualizado(cotizacion.datosAeronave.anoFabricacion)
            setCategoriaAeronaveActualizado(cotizacion.datosAeronave.categoria)
            setPesoBrutoActualizado(cotizacion.datosAeronave.pesoBruto)
            setPesoVacioActualizado(cotizacion.datosAeronave.pesoVacio)
            setFechaUltimoPesoActualizado(cotizacion.datosAeronave.fechaUltimoPeso)
            setTipoInspeccionActualizado(cotizacion.programaDeMantenimiento.tipoInspeccion)
            setFechaMantenimientoActualizado(cotizacion.programaDeMantenimiento.fecha)
            setHorasMantenimientoActualizado(cotizacion.programaDeMantenimiento.horas)
            setCategoriaMantenimientoActualizado(cotizacion.programaDeMantenimiento.categoria)
            setUtilizacionActualizado(cotizacion.programaDeMantenimiento.utilizacion)

            toast.success(data.message)

        } catch (error) {
            toast.error('Algo salió mal o no hay ninguna persona')
            console.error(error)
        }
    }


    const controlarCambio = (e) => {
        const datoAActualizar = e.target.name
        const valorActual = e.target.value;
        switch (datoAActualizar) {
            case 'nombreCliente':
                setClienteNombreActualizado(valorActual)
                break;
            case 'lugarOperaciones':
                setLugarOperacionesActualizado(valorActual)
                break;
            case 'direccionCliente':
                setClienteDireccionActualizado(valorActual)
                break;
            case 'telefonoCliente':
                setClienteTelefonoActualizado(valorActual)
                break;
            case 'emailCliente':
                setClienteEmailActualizado(valorActual)
                break;
            case 'explotador':
                setExplotadorActualizado(valorActual)
                break;
            case 'nombreRepresentanteLegal':
                setRepresentanteLegalNombreActualizado(valorActual)
                break;
            case 'direccionRepresentanteLegal':
                setRepresentanteLegalDireccionActualizado(valorActual)
                break;
            case 'telefonoRepresentanteLegal':
                setRepresentanteLegalTelefonoActualizado(valorActual)
                break;
            case 'emailRepresentanteLegal':
                setRepresentanteLegalEmailActualizado(valorActual)
                break;
            case 'marcaAeronave':
                setMarcaAeronaveActualizado(valorActual)
                break;
            case 'modeloAeronave':
                setModeloAeronaveActualizado(valorActual)
                break;
            case 'numeroDeSerieAeronave':
                setNumeroSerieAeronaveActualizado(valorActual)
                break;
            case 'anoFabricacionAeronave':
                setAnoFabricacionActualizado(valorActual)
                break;
            case 'categoriaAeronave':
                setCategoriaAeronaveActualizado(valorActual)
                break;
            case 'horasTotalesAeronave':
                setHorasAeronaveActualizado(valorActual)
                break;
            case 'tipoInspeccion':
                setTipoInspeccionActualizado(valorActual)
                break;
            case 'fechaMantenimiento':
                setFechaMantenimientoActualizado(valorActual)
                break;
            case 'horasMantenimiento':
                setHorasMantenimientoActualizado(valorActual)
                break;
            case 'categoriaMantenimiento':
                setCategoriaMantenimientoActualizado(valorActual)
                break;
            case 'utilizacion':
                setUtilizacionActualizado(valorActual)
                break;
            case 'pesoBruto':
                setPesoBrutoActualizado(valorActual)
                break;
            case 'pesoVacio':
                setPesoVacioActualizado(valorActual)
                break;
            case 'fechaUltimoPeso':
                setFechaUltimoPesoActualizado(valorActual)
                break;
        }
    }

    return <div className="main_container">
        <div className="new_invoice">

            {/* NUEVA COTIZACION */}
            <div className="new_invoice-body">
                <div className="new_invoice-header">
                    <FontAwesomeIcon onClick={() => router.push(`/ordenes`)} className="back_btn" icon={icon({ name: 'arrow-left', style: 'solid' })} />
                    <h2>Nueva orden</h2>
                </div>
                <div className='form_group-dates'>

                    <div>
                        <p>Fecha recepción</p>
                        <input type="date" ref={fechaRecepcion} />
                    </div>

                    <div>
                        <p>Fecha de entrega</p>
                        <input type="date" ref={fechaEntrega} />
                    </div>

                </div>

                {/* DATOS DEL CLIENTE */}
                <div className="customer_details">

                    <div className="form_group-name">
                        <div className='name'>
                            <p>Nombre</p>
                            <input type="text" name='nombreCliente' value={clienteNombreActualizado} onChange={controlarCambio} ref={nombreCliente} />
                        </div>
                        <div className='cedula'>
                            <p>Cédula / NIT</p>
                            <input type="text" name='cedula' ref={cedula} />
                        </div>

                        <button className='btn' onClick={e => comprobarInformacionClientes('clientes', cedula.current.value)}>Comprobar</button>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div>
                            <p>Base principal de operaciones</p>
                            <input type="text" name='lugarOperaciones' value={lugarOperacionesActualizado} onChange={controlarCambio} ref={lugarDeOperaciones} />
                        </div>

                        <div>
                            <p>Dirección</p>
                            <input type="text" name='direccionCliente' value={clienteDireccionActualizado} onChange={controlarCambio} ref={direccionCliente} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div>
                            <p>Teléfono</p>
                            <input type="text" name='telefonoCliente' value={clienteTelefonoActualizado} onChange={controlarCambio} ref={telefonoCliente} />
                        </div>

                        <div>
                            <p>Correo electrónico</p>
                            <input type="email" name='emailCliente' value={clienteEmailActualizado} onChange={controlarCambio} ref={emailCliente} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div>
                            <p>Explotador</p>
                            <input type="text" name='explotador' value={explotadorActualizado} onChange={controlarCambio} ref={explotador} />
                        </div>

                        <div className='form_group-lg'>
                            <p>Representante Legal</p>
                            <input type="text" name='nombreRepresentanteLegal' value={representanteLegalNombreActualizado} onChange={controlarCambio} ref={nombreRepresentanteLegal} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-three">
                        <div>
                            <p>Direccion / ciudad</p>
                            <input type="text" name='direccionRepresentanteLegal' value={representanteLegalDireccionActualizado} onChange={controlarCambio} ref={direccionRepresentanteLegal} />
                        </div>

                        <div>
                            <p>Teléfono</p>
                            <input type="text" name='telefonoRepresentanteLegal' value={representanteLegalTelefonoActualizado} onChange={controlarCambio} ref={telefonoRepresentanteLegal} />
                        </div>

                        <div>
                            <p>Correo electrónico</p>
                            <input type="text" name='emailRepresentanteLegal' value={representanteLegalEmailActualizado} onChange={controlarCambio} ref={emailRepresentanteLegal} />
                        </div>
                    </div>


                </div>
                {/* DATOS DE LA AERONAVE */}
                <div className="airplane_details">
                    <h4 className="title">Datos de la aeronave</h4>
                    <div className="form_group inline_form_group-four-btn">

                        <div>
                            <p>Marca</p>
                            <input type="text" name='marcaAeronave' value={marcaAeronaveActualizado} onChange={controlarCambio} ref={marcaAeronave} />
                        </div>

                        <div>
                            <p>Modelo</p>
                            <input type="text" name='modeloAeronave' value={modeloAeronaveActualizado} onChange={controlarCambio} ref={modeloAeronave} />
                        </div>

                        <div>
                            <p>Matrícula</p>
                            <input type="text" ref={matriculaAeronave} />
                        </div>

                        <button className='btn' onClick={(e) => comprobarInformacionAeronaves('aeronaves', matriculaAeronave.current.value)}>Comprobar</button>
                    </div>

                    <div className="form_group inline_form_group-four">
                        <div>
                            <p>Número de serie</p>
                            <input type="text" name='numeroDeSerieAeronave' value={numeroSerieAeronaveActualizado} onChange={controlarCambio} ref={numeroDeSerie} />
                        </div>

                        <div>
                            <p>Año de fabricación</p>
                            <input type="number" name='anoFabricacionAeronave' value={anoFabricacionActualizado} onChange={controlarCambio} ref={anoFabricacion} />
                        </div>

                        <div>
                            <p>Categoría</p>
                            <input type="text" name='categoriaAeronave' value={categoriaAeronaveActualizado} onChange={controlarCambio} ref={categoriaAeronave} />
                        </div>

                        <div>
                            <p>Horas totales</p>
                            <input type="number" name='horasTotalesAeronave' value={horasAeronaveActualizado} onChange={controlarCambio} ref={horasTotales} />
                        </div>
                    </div>
                </div>

                {/* DATOS SOBRE EL MANTENIMIENTO */}
                <div className="maintenance_details">
                    <h4 className="title">Cumplimiento del programa de mantenimiento</h4>

                    <div className="form_group inline_form_group-three">
                        <div>
                            <p>Tipo de inspección</p>
                            <input type="text" name='tipoInspeccion' value={tipoInspeccionActualizado} onChange={controlarCambio} ref={tipoInspeccion} />
                        </div>

                        <div>
                            <p>Fecha</p>
                            <input type="date" name='fechaMantenimiento' value={fechaMantenimientoActualizado} onChange={controlarCambio} ref={fechaMantenimiento} />
                        </div>

                        <div>
                            <p>Horas</p>
                            <input type="number" name='horasMantenimiento' value={horasMantenimientoActualizado} onChange={controlarCambio} ref={horasMantenimiento} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div className="form_group-lg">
                            <p>Categoría</p>
                            <input type="text" name='categoriaMantenimiento' value={categoriaMantenimientoActualizado} onChange={controlarCambio} ref={categoriaMantenimiento} />
                        </div>

                        <div className="form_group-lg">
                            <p>Utilización</p>
                            <input type="text" name='utilizacion' value={utilizacionActualizado} onChange={controlarCambio} ref={utilizacion} />
                        </div>

                    </div>
                </div>

                {/* PESO Y BALANCE DEL AERONAVE */}
                <div className="weigth_airplane">
                    <h4 className="title">Peso y balance</h4>

                    <div className="form_group inline_form_group-three">
                        <div>
                            <p>Peso bruto (kg)</p>
                            <input type="number" name='pesoBruto' value={pesoBrutoActualizado} onChange={controlarCambio} ref={pesoBruto} />
                        </div>

                        <div>
                            <p>Peso vacío</p>
                            <input type="number" name='pesoVacio' value={pesoVacioActualizado} onChange={controlarCambio} ref={pesoVacio} />
                        </div>

                        <div>
                            <p>Fecha último peso</p>
                            <input type="date" name='fechaUltimoPeso' value={fechaUltimoPesoActualizado} onChange={controlarCambio} ref={fechaUltimoPeso} />
                        </div>
                    </div>


                </div>


                {/* INVOICE PRODUCT ITEMS */}
                <div className="invoice_items">
                    <h3>Lista de items</h3>
                    {
                        items?.map((item, i) => (
                            <div className="item" key={i}>
                                <div className='row_form-group'>
                                    <div className='row_form_group-item'>
                                        <div className='form_group'>
                                            <p>Descripción</p>
                                            <textarea type="text" name='descripcion' onChange={e => handlerChange(e, i)} />
                                        </div>
                                        <div className="form_group inline_form_group-two">

                                            <div>
                                                <p>Cantidad</p>
                                                <input type="number" name='cantidad' onChange={e => handlerChange(e, i)} />
                                            </div>

                                            <div>
                                                <p>Valor Unitario</p>
                                                <input type="number" name='precio' onChange={e => handlerChange(e, i)} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='total_and_delete-btn'>
                                        <div className='center'>
                                            <p>Total</p>
                                            <div className='total_space'>
                                                <h4 name='total'>${item.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                                            </div>
                                        </div>
                                        <button className="discard_btn" onClick={() => deleteItem(i)}>Eliminar</button>

                                    </div>
                                </div>
                            </div>
                        ))
                    }


                </div>

                <div className="add_item-container">
                    <button className="add_item-btn" onClick={addItem}>Añadir Item</button>
                </div>

                <div className="form_group-bottom">
                    <div>
                        <h5>Tiempo de reparación (horas)</h5>
                        <input type="number" ref={tiempoReparacion} />
                    </div>

                    <div>
                        <h5>Forma de pago</h5>
                        <input type="text" ref={formaPago} />
                    </div>

                    <div>
                        <h5>Observaciones</h5>
                        <textarea type="text" ref={observaciones} />
                    </div>
                </div>

                <div className="new_invoice_btns">
                    <button className="discard_btn" onClick={() => router.push('/ordenes')}>Descartar</button>
                    <button className="send_btn" onClick={() => crearOrden()}>Enviar y Guardar</button>
                </div>
            </div>
        </div>
    </div>
}

export default AddNew