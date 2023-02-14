import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { MongoClient, ObjectId } from 'mongodb';
import { toast } from 'react-toastify';
import GenerarPDF from '../../../../components/GenerarPDF/GenerarPDF'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function InvoiceDetails(props) {

    const router = useRouter();
    const { data } = props;
    const goBack = () => router.push('/cotizaciones')
    const modalRef = useRef(null)


    // ABRIR AVISO DE ELIMINACION
    const modalToggle = () => modalRef.current.classList.toggle('showModal')

    // ELIMINAR FACTURA DE LA BASE DE DATOS

    const borrarCotizacion = async (cotizacionId) => {

        try {

            const res = await fetch(`/api/quotes/${cotizacionId}`, {
                method: 'DELETE',
                body: JSON.stringify({ message: 'test' })
            })

            const data = await res.json()
            toast.success(data.message)
            router.push('/cotizaciones')

        } catch (error) {
            toast.error('ay caramba')
        }
    }

    const convertirAOrden = async (quoteId) => {
        try {

            const res = await fetch(`/api/quotes/${quoteId}`, {
                method: 'PUT',
                header:
                {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    fechaRecepcion: data.fechaRecepcion,
                    fechaEntrega: data.fechaEntrega,
                    items: data.items,
                    total: data.total,
                    tiempoReparacion: data.tiempoReparacion,
                    formaPago: data.formaPago,
                    observaciones: data.observaciones,
                    clienteId: data.cliente._id,
                    aeronaveId: data.aeronave._id
                })
            })
            const dataRes = await res.json()
            toast.success(dataRes.message)
            router.push('/cotizaciones')

        } catch (error) {
            console.error(error)
        }
    }


    return <div className='main_container' id='main_container'>
        <div className='back_btn-container'>
            <FontAwesomeIcon onClick={goBack} className="back_btn" icon={icon({ name: 'arrow-left', style: 'solid' })} />
        </div>

        {/* =========== INVOICE DETAILES HEADER ========== */}
        <div className='invoice_details-header'>
            <div className='details_status'>
                <h4>Cotizacion</h4>
                <h4>#{data.id.substr(18, 24).toUpperCase()}</h4>
            </div>

            <div className='details_btns'>
                <button className='edit_btn' onClick={() => router.push(`/cotizaciones/edit/${data.id}`)}>Editar</button>

                {/* ======= CONFIRMAR ELIMINACION INICIO ========== */}

                <div className="delete_modal" ref={modalRef}>
                    <div className="modal">
                        <h3>Confirmar eliminacion</h3>
                        <p>¿Estás seguro bien seguro de que quieres borrar la factura #{data.id.substr(18, 24).toUpperCase()}? Luego de esto no hay vuelta atrás</p>

                        <div className="details_btns modal_btns">
                            <button className="edit_btn" onClick={modalToggle} >Cancelar</button>
                            <button className="discard_btn" onClick={() => borrarCotizacion(data.id)} >Confirmar</button>
                        </div>
                    </div>
                </div>

                {/* ======= CONFIRMAR ELIMINACION FINAL  ========== */}

                <button className='discard_btn' onClick={modalToggle} >Borrar</button>

                <button className="convert_btn" onClick={() => convertirAOrden(data.id)}>Convertir a orden</button>
                <GenerarPDF data={data} tipo='cotizacion' />
            </div>
        </div>

        {/* ========== INVOICE DETAILS ========== */}

        <div className='invoice_details'>

            {/* ============= DETAILS BOX 2 =========== */}
            <div className='details_box'>
                <div className='invoice_date'>
                    <div>
                        <p>Fecha Recepcion</p>
                        <h4>{data.fechaRecepcion}</h4>
                    </div>
                    <div>
                        <p>Fecha de entrega</p>
                        <h4>{data.fechaEntrega}</h4>
                    </div>
                </div>

                {/* ======== INVOICE CLIENT ADDRESS ========= */}
                <div className='invoice_client-container'>
                    <div className="title-container">
                        <h3>Datos del cliente</h3>
                    </div>
                    <div className='invoice_client_container-space'>
                        <p>Nombre</p>
                        <h5>{data.cliente.propietario.nombre}</h5>
                    </div>
                    <div className='invoice_client-information'>
                        <div>
                            <p>Cédula</p>
                            <h5>{data.cliente.propietario.cedula}</h5>
                        </div>
                        <div>
                            <p>Teléfono</p>
                            <h5>{data.cliente.propietario.telefono}</h5>
                        </div>
                        <div>
                            <p>Correo electrónico</p>
                            <h5>{data.cliente.propietario.email}</h5>
                        </div>
                        <div>
                            <p>Dirección</p>
                            <h5>{data.cliente.propietario.direccion}</h5>
                        </div>
                    </div>
                </div>

                <div className="representante_legal-container">
                    <div className="title-container">
                        <h3>Datos del representante legal</h3>
                    </div>
                    <div className='inline_form_group-two invoice_client_container-space'>
                        <div>
                            <p>Explotador</p>
                            <h5>{data.cliente.explotador}</h5>
                        </div>
                        <div>
                            <p>Representante legal</p>
                            <h5>{data.cliente.representanteLegal.nombre}</h5>
                        </div>
                    </div>

                    <div className='inline_form_group-three'>
                        <div>
                            <p>Dirección</p>
                            <h5>{data.cliente.representanteLegal.direccion}</h5>
                        </div>
                        <div>
                            <p>Teléfono</p>
                            <h5>{data.cliente.representanteLegal.telefono}</h5>
                        </div>
                        <div>
                            <p>Correo electrónico</p>
                            <h5>{data.cliente.representanteLegal.email}</h5>
                        </div>
                    </div>
                </div>


                <div className="datos_aeronave-container">
                    <div className="title-container">
                        <h3>Datos del aeronave</h3>
                    </div>
                    <div className="datos_aeronave">
                        <div className='inline_form_group-four invoice_client_container-space'>
                            <div>
                                <p>Marca</p>
                                <h5>{data.aeronave.datosAeronave.marca}</h5>
                            </div>
                            <div>
                                <p>Modelo</p>
                                <h5>{data.aeronave.datosAeronave.modelo}</h5>
                            </div>
                            <div>
                                <p>Matrícula</p>
                                <h5>{data.aeronave.datosAeronave.matricula}</h5>
                            </div>
                            <div>
                                <p>Número de serie</p>
                                <h5>{data.aeronave.datosAeronave.numeroDeSerie}</h5>
                            </div>
                        </div>
                        <div className="inline_form_group-four invoice_client_container-space">
                            <div>
                                <p>Año de fabricación</p>
                                <h5>{data.aeronave.datosAeronave.anoFabricacion}</h5>
                            </div>
                            <div>
                                <p>Categoría aeronave</p>
                                <h5>{data.aeronave.datosAeronave.categoria}</h5>
                            </div>
                            <div>
                                <p>Horas totales</p>
                                <h5>{data.aeronave.datosAeronave.horasTotales}</h5>
                            </div>
                            <div>
                                <p>Utilización</p>
                                <h5>{data.aeronave.programaDeMantenimiento.utilizacion}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="programa_mantenimiento">
                        <div className="inline_form_group-four invoice_client_container-space">
                            <div>
                                <p>Tipo de inspección</p>
                                <h5>{data.aeronave.programaDeMantenimiento.tipoInspeccion}</h5>
                            </div>
                            <div>
                                <p>Fecha mantenimiento</p>
                                <h5>{data.aeronave.programaDeMantenimiento.fecha}</h5>
                            </div>
                            <div>
                                <p>Horas mantenimiento</p>
                                <h5>{data.aeronave.programaDeMantenimiento.horas}</h5>
                            </div>
                            <div>
                                <p>Categoría mantenimiento</p>
                                <h5>{data.aeronave.programaDeMantenimiento.categoria}</h5>
                            </div>
                        </div>                        
                    </div>
                    <div className="peso_balance">
                        <div className="inline_form_group-four">
                            <div>
                                <p>Peso Bruto (kg)</p>
                                <h5>{data.aeronave.datosAeronave.pesoBruto}</h5>
                            </div>
                            <div>
                                <p>Peso Vacío (kg)</p>
                                <h5>{data.aeronave.datosAeronave.pesoVacio}</h5>
                            </div>
                            <div>
                                <p>Fecha último peso</p>
                                <h5>{data.aeronave.datosAeronave.fechaUltimoPeso}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========= invoice items ============= */}
            <div className="quote_item-box">
                <ul className="list">
                    <li className="list_item">
                        <h4 className="list_item-box-description">Descripción</h4>
                        <h4 className="list_item-box">Cantidad</h4>
                        <h4 className="list_item-box">Precio</h4>
                        <h4 className="list_item-box">Total</h4>
                    </li>

                    {/* ======== invoice item ======= */}


                    {
                        data.items?.map((item, index) => (
                            <li className="list_item" key={index}>
                                <div className="list_item-box-description">
                                    <p>{item.descripcion}</p>
                                </div>
                                <div className="list_item-box">
                                    <p>{item.cantidad}</p>
                                </div>
                                <div className="list_item-box">
                                    <p>${parseInt(data.items[index].precio).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                                <div className="list_item-box">
                                    <h5>${item.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h5>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* ========== grand total ============= */}
            <div className="grand_total">
                <h3>Valor total</h3>
                <h2>${data.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
            </div>



            <div className="final_information-container ">
                <div className="forma_pago invoice_client_container-space">
                    <h4>Forma de pago</h4>
                    <p>{data.formaPago}</p>
                </div>
                <div className="tiempo_reparacion invoice_client_container-space">
                    <h4>Tiempo de reparación</h4>
                    <p>{data.tiempoReparacion}</p>
                </div>

                <div className="observaciones invoice_client_container-space">
                    <h4>Observaciones</h4>
                    <p>{data.observaciones}</p>
                </div>
            </div>

        </div>
    </div>
}

export default InvoiceDetails


export async function getStaticPaths() {

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    const db = client.db();
    const collection = db.collection('cotizaciones');

    const cotizaciones = await collection.find({}, { _id: 1 }).toArray();

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

