import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MongoClient, ObjectId } from 'mongodb'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const EditItem = (props) => {

    const cotizacion = props.data;

    const router = useRouter();
    const [items, setItems] = useState(cotizacion.items);


    const [fechaEntrega, setFechaEntrega] = useState('')
    const [fechaRecepcion, setFechaRecepcion] = useState('')
    const [clienteNombre, setClienteNombre] = useState('')
    const [cedula, setCedula] = useState('')
    const [lugarOperaciones, setLugarOperaciones] = useState('')
    const [clienteDireccion, setClienteDireccion] = useState('')
    const [clienteTelefono, setClienteTelefono] = useState('')
    const [clienteEmail, setClienteEmail] = useState('')
    const [explotador, setExplotador] = useState('')
    const [representanteLegalNombre, setRepresentanteLegalNombre] = useState('')
    const [representanteLegalDireccion, setRepresentanteLegalDireccion] = useState('')
    const [representanteLegalTelefono, setRepresentanteLegalTelefono] = useState('')
    const [representanteLegalEmail, setRepresentanteLegalEmail] = useState('')
    const [matriculaAeronave, setMatriculaAeronave] = useState('')
    const [marcaAeronave, setMarcaAeronave] = useState('')
    const [modeloAeronave, setModeloAeronave] = useState('')
    const [numeroSerieAeronave, setNumeroSerieAeronave] = useState('')
    const [horasAeronave, setHorasAeronave] = useState('')
    const [anoFabricacion, setAnoFabricacion] = useState('')
    const [categoriaAeronave, setCategoriaAeronave] = useState('')
    const [tipoInspeccion, setTipoInspeccion] = useState('')
    const [fechaMantenimiento, setFechaMantenimiento] = useState('')
    const [horasMantenimiento, setHorasMantenimiento] = useState('')
    const [categoriaMantenimiento, setCategoriaMantenimiento] = useState('')
    const [utilizacion, setUtilizacion] = useState('')
    const [pesoBruto, setPesoBruto] = useState('')
    const [pesoVacio, setPesoVacio] = useState('')
    const [fechaUltimoPeso, setFechaUltimoPeso] = useState('')
    const [tiempoReparacion, setTiempoReparacion] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [formaPago, setFormaPago] = useState('')


    // añadir un elemento

    const addItem = () => {
        setItems([...items, { descripcion: '', cantidad: 0, precio: 0, total: 0 }])
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

    // actualizar datos en MongoDB

    const updateInvoice = async (cotizacionId) => {
        try {

            const res = await fetch(`/api/edit-quote/${cotizacionId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fechaRecepcion: fechaRecepcion,
                    fechaEntrega: fechaEntrega,

                    nombreCliente: clienteNombre,
                    cedula: cedula,
                    direccionCliente: clienteDireccion,
                    telefonoCliente: clienteTelefono,
                    emailCliente: clienteEmail,
                    lugarOperaciones: lugarOperaciones,

                    explotador: explotador,
                    nombreRepresentanteLegal: representanteLegalNombre,
                    direccionRepresentanteLegal: representanteLegalDireccion,
                    telefonoRepresentanteLegal: representanteLegalTelefono,
                    emailRepresentanteLegal: representanteLegalEmail,

                    matriculaAeronave: matriculaAeronave,
                    marcaAeronave: marcaAeronave,
                    modeloAeronave: modeloAeronave,
                    numeroDeSerieAeronave: numeroSerieAeronave,
                    anoFabricacionAeronave: anoFabricacion,
                    categoriaAeronave: categoriaAeronave,
                    horasTotalesAeronave: horasAeronave,
                    pesoBrutoAeronave: pesoBruto,
                    pesoVacioAeronave: pesoVacio,
                    fechaUltimoPesoAeronave: fechaUltimoPeso,

                    tipoInspeccion: tipoInspeccion,
                    fechaMantenimiento: fechaMantenimiento,
                    horasMantenimiento: horasMantenimiento,
                    categoriaMantenimiento: categoriaMantenimiento,
                    utilizacion: utilizacion,

                    items: items,
                    total: totalAmount,
                    tiempoReparacion: tiempoReparacion,
                    formaPago: formaPago,
                    observaciones: observaciones
                })
            })

            const data = await res.json()

            router.push(`/cotizaciones/cotizacion/${cotizacionId}`)
            toast.success(data.message)

        } catch (error) {
            toast.error("Algo malo pasó, toca revisar")
            console.log(error)
        }
    }

    // colocar valores por defecto

    useEffect(() => {

        setFechaEntrega(cotizacion.fechaEntrega);
        setFechaRecepcion(cotizacion.fechaRecepcion);

        setClienteNombre(cotizacion.cliente.propietario.nombre);
        setCedula(cotizacion.cliente.propietario.cedula)
        setLugarOperaciones(cotizacion.cliente.propietario.lugarOperaciones)
        setClienteDireccion(cotizacion.cliente.propietario.direccion)
        setClienteTelefono(cotizacion.cliente.propietario.telefono)
        setClienteEmail(cotizacion.cliente.propietario.email)

        setExplotador(cotizacion.cliente.explotador)

        setRepresentanteLegalNombre(cotizacion.cliente.representanteLegal.nombre)
        setRepresentanteLegalDireccion(cotizacion.cliente.representanteLegal.direccion)
        setRepresentanteLegalTelefono(cotizacion.cliente.representanteLegal.telefono)
        setRepresentanteLegalEmail(cotizacion.cliente.representanteLegal.email)

        setMatriculaAeronave(cotizacion.aeronave.datosAeronave.matricula)
        setMarcaAeronave(cotizacion.aeronave.datosAeronave.marca)
        setModeloAeronave(cotizacion.aeronave.datosAeronave.modelo)
        setNumeroSerieAeronave(cotizacion.aeronave.datosAeronave.numeroDeSerie)
        setAnoFabricacion(cotizacion.aeronave.datosAeronave.anoFabricacion)
        setCategoriaAeronave(cotizacion.aeronave.datosAeronave.categoria)
        setPesoBruto(cotizacion.aeronave.datosAeronave.pesoBruto)
        setPesoVacio(cotizacion.aeronave.datosAeronave.pesoVacio)
        setFechaUltimoPeso(cotizacion.aeronave.datosAeronave.fechaUltimoPeso)
        setHorasAeronave(cotizacion.aeronave.datosAeronave.horasTotales)
        setTipoInspeccion(cotizacion.aeronave.programaDeMantenimiento.tipoInspeccion)

        setFechaMantenimiento(cotizacion.aeronave.programaDeMantenimiento.fecha)
        setHorasMantenimiento(cotizacion.aeronave.programaDeMantenimiento.horas)
        setCategoriaMantenimiento(cotizacion.aeronave.programaDeMantenimiento.categoria)
        setUtilizacion(cotizacion.aeronave.programaDeMantenimiento.utilizacion)

        setTiempoReparacion(cotizacion.tiempoReparacion)
        setFormaPago(cotizacion.formaPago)
        setObservaciones(cotizacion.observaciones)

    }, [cotizacion])

    return <div className="main_container">
        <div className="new_invoice">
            <div className="new_invoice-header">
                <FontAwesomeIcon onClick={() => router.push(`/cotizaciones/cotizacion/${cotizacion.id}`)} className="back_btn" icon={icon({ name: 'arrow-left', style: 'solid' })} />
                <h2>Editar cotización</h2>
            </div>

            {/* NUEVA COTIZACION */}
            <div className="new_invoice-body">
                <div className='form_group-dates'>

                    <div>
                        <p>Fecha recepción</p>
                        <input type="date" value={fechaRecepcion} onChange={e => setFechaRecepcion(e.target.value)} />
                    </div>

                    <div>
                        <p>Fecha de entrega</p>
                        <input type="date" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
                    </div>

                </div>

                {/* DATOS DEL CLIENTE */}
                <div className="customer_details">

                    <div className="inline_form_group-two">
                        <div className='name'>
                            <p>Nombre</p>
                            <input type="text" value={clienteNombre} onChange={e => setClienteNombre(e.target.value)} />
                        </div>
                        <div className='cedula'>
                            <p>Cédula / NIT</p>
                            <input type="text" value={cedula} onChange={e => setCedula(e.target.value)} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div>
                            <p>Base principal de operaciones</p>
                            <input type="text" value={lugarOperaciones} onChange={e => setLugarOperaciones(e.target.value)} />
                        </div>

                        <div>
                            <p>Dirección</p>
                            <input type="text" value={clienteDireccion} onChange={e => setClienteDireccion(e.target.value)} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div>
                            <p>Teléfono</p>
                            <input type="number" value={clienteTelefono} onChange={e => setClienteTelefono(e.target.value)} />
                        </div>

                        <div>
                            <p>Correo electrónico</p>
                            <input type="email" value={clienteEmail} onChange={e => setClienteEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div>
                            <p>Explotador</p>
                            <input type="text" value={explotador} onChange={e => setExplotador(e.target.value)} />
                        </div>

                        <div>
                            <p>Representante Legal</p>
                            <input type="text" value={representanteLegalNombre} onChange={e => setRepresentanteLegalNombre(e.target.value)} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-three">
                        <div>
                            <p>Direccion / ciudad</p>
                            <input type="text" value={representanteLegalDireccion} onChange={e => setRepresentanteLegalDireccion(e.target.value)} />
                        </div>

                        <div>
                            <p>Teléfono</p>
                            <input type="text" value={representanteLegalTelefono} onChange={e => setRepresentanteLegalTelefono(e.target.value)} />
                        </div>

                        <div>
                            <p>Correo electrónico</p>
                            <input type="text" value={representanteLegalEmail} onChange={e => setRepresentanteLegalEmail(e.target.value)} />
                        </div>
                    </div>


                </div>
                {/* DATOS DE LA AERONAVE */}
                <div className="airplane_details">
                    <h4 className="title">Datos de la aeronave</h4>
                    <div className="form_group inline_form_group-three">
                        <div>
                            <p>Matrícula</p>
                            <input type="text" value={matriculaAeronave} onChange={e => setMatriculaAeronave(e.target.value)} />
                        </div>

                        <div>
                            <p>Marca</p>
                            <input type="text" value={marcaAeronave} onChange={e => setMarcaAeronave(e.target.value)} />
                        </div>

                        <div>
                            <p>Modelo</p>
                            <input type="text" value={modeloAeronave} onChange={e => setModeloAeronave(e.target.value)} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-four">
                        <div>
                            <p>Número de serie</p>
                            <input type="text" value={numeroSerieAeronave} onChange={e => setNumeroSerieAeronave(e.target.value)} />
                        </div>

                        <div>
                            <p>Año de fabricación</p>
                            <input type="number" value={anoFabricacion} onChange={e => setAnoFabricacion(e.target.value)} />
                        </div>

                        <div>
                            <p>Categoría</p>
                            <input type="text" value={categoriaAeronave} onChange={e => setCategoriaAeronave(e.target.value)} />
                        </div>

                        <div>
                            <p>Horas totales</p>
                            <input type="number" value={horasAeronave} onChange={e => setHorasAeronave(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* DATOS SOBRE EL MANTENIMIENTO */}
                <div className="maintenance_details">
                    <h4 className="title">Cumplimiento del programa de mantenimiento</h4>

                    <div className="form_group inline_form_group-three">
                        <div>
                            <p>Tipo de inspección</p>
                            <input type="text" value={tipoInspeccion} onChange={e => setTipoInspeccion(e.target.value)} />
                        </div>

                        <div>
                            <p>Fecha</p>
                            <input type="date" value={fechaMantenimiento} onChange={e => setFechaMantenimiento(e.target.value)} />
                        </div>

                        <div>
                            <p>Horas</p>
                            <input type="number" value={horasMantenimiento} onChange={e => setHorasMantenimiento(e.target.value)} />
                        </div>
                    </div>

                    <div className="form_group inline_form_group-two">
                        <div className="form_group-lg">
                            <p>Categoría</p>
                            <input type="text" value={categoriaMantenimiento} onChange={e => setCategoriaMantenimiento(e.target.value)} />
                        </div>

                        <div className="form_group-lg">
                            <p>Utilización</p>
                            <input type="text" value={utilizacion} onChange={e => setUtilizacion(e.target.value)} />
                        </div>

                    </div>
                </div>

                {/* PESO Y BALANCE DEL AERONAVE */}
                <div className="weigth_airplane">
                    <h4 className="title">Peso y balance</h4>

                    <div className="form_group inline_form_group-three">
                        <div>
                            <p>Peso bruto (kg)</p>
                            <input type="number" value={pesoBruto} onChange={e => setPesoBruto(e.target.value)} />
                        </div>

                        <div>
                            <p>Peso vacío</p>
                            <input type="number" value={pesoVacio} onChange={e => setPesoVacio(e.target.value)} />
                        </div>

                        <div>
                            <p>Fecha último peso</p>
                            <input type="date" value={fechaUltimoPeso} onChange={e => setFechaUltimoPeso(e.target.value)} />
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
                                            <textarea type="text" name='descripcion' value={item.descripcion} onChange={e => handlerChange(e, i)} />
                                        </div>
                                        <div className="form_group inline_form_group-two item_bg">
                                            <div>
                                                <p>Cantidad</p>
                                                <input type="number" name='cantidad' value={item.cantidad} onChange={e => handlerChange(e, i)} />
                                            </div>

                                            <div>
                                                <p>Precio</p>
                                                <input type="number" name='precio' value={item.precio} onChange={e => handlerChange(e, i)} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className='total_and_delete-btn'>
                                        <div className='center'>
                                            <p>Total</p>
                                            <div className="total_space">
                                                <h4 name='total' onChange={e => handlerChange(e, i)}>${item.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
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
                        <input type="number" value={tiempoReparacion} onChange={e => setTiempoReparacion(e.target.value)} />
                    </div>

                    <div>
                        <h5>Forma de pago</h5>
                        <input type="text" value={formaPago} onChange={e => setFormaPago(e.target.value)} />
                    </div>

                    <div>
                        <h5>Observaciones</h5>
                        <textarea type="text" value={observaciones} onChange={e => setObservaciones(e.target.value)} />
                    </div>
                </div>

                <div className="new_invoice_btns" style={{ justifyContent: 'end' }}>
                    <button className="discard_btn" onClick={() => router.push(`/cotizaciones/cotizacion/${cotizacion.id}`)}>Cancelar</button>
                    <button className="send_btn" onClick={() => updateInvoice(cotizacion.id)} >Guardar cambios</button>
                </div>
            </div>
        </div>
    </div>
}

export default EditItem



export async function getStaticPaths() {

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    const db = client.db();
    const coleccionCotizaciones = db.collection('cotizaciones');

    const cotizaciones = await coleccionCotizaciones.find({}, { _id: 1 }).toArray();

    return {
        fallback: 'blocking',
        paths: cotizaciones.map((cotizacion) => ({
            params: {
                cotizacionId: cotizacion._id.toString()
            }
        }))
    }
}



export async function getStaticProps(context) {

    const { cotizacionId } = context.params

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    const db = client.db();
    const cotizaciones = db.collection('cotizaciones');
    const clientes = db.collection('clientes');
    const aeronaves = db.collection('aeronaves');
    const cotizacion = await cotizaciones.findOne({ _id: ObjectId(cotizacionId) })

    const informacionCliente = await clientes.findOne({ _id: cotizacion.clienteId });
    const informacionAeronave = await aeronaves.findOne({ _id: cotizacion.aeronaveId })

    informacionCliente._id = informacionCliente._id.toString();
    informacionAeronave._id = informacionAeronave._id.toString();

    function actualizarAString(informacion, propiedad) {
        informacion[propiedad] = informacion[propiedad].map((elem) => {
            return elem.toString()
        })

    }

    actualizarAString(informacionCliente, 'cotizaciones')
    actualizarAString(informacionCliente, 'ordenes')
    actualizarAString(informacionCliente, 'facturas')

    actualizarAString(informacionAeronave, 'cotizaciones')
    actualizarAString(informacionAeronave, 'ordenes')
    actualizarAString(informacionAeronave, 'facturas')


    return {
        props: {
            data: {
                id: cotizacion._id.toString(),
                fechaRecepcion: cotizacion.fechaRecepcion,
                fechaEntrega: cotizacion.fechaEntrega,
                items: cotizacion.items,
                total: cotizacion.total,
                tiempoReparacion: cotizacion.tiempoReparacion,
                formaPago: cotizacion.formaPago,
                observaciones: cotizacion.observaciones,
                cliente: informacionCliente,
                aeronave: informacionAeronave
            }
        },
        revalidate: 1
    }
}