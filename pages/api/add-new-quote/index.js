import { MongoClient } from "mongodb";

async function handler(req, res) {

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    if (req.method === 'POST') {

        const informacionCliente = {
            propietario: {
                nombre: req.body.nombreCliente,
                direccion: req.body.direccionCliente,
                telefono: req.body.telefonoCliente,
                email: req.body.emailCliente,
                lugarOperaciones: req.body.lugarOperaciones,
                cedula: req.body.cedula
            },
            explotador: req.body.explotador,
            representanteLegal: {
                nombre: req.body.nombreRepresentanteLegal,
                direccion: req.body.direccionRepresentanteLegal,
                telefono: req.body.telefonoRepresentanteLegal,
                email: req.body.emailRepresentanteLegal
            },
            facturas: [],
            cotizaciones: [], 
            ordenes: []
        }

        const informacionAeronave = {
            datosAeronave: {
                matricula: req.body.matriculaAeronave,
                marca: req.body.marcaAeronave,
                modelo: req.body.modeloAeronave,
                numeroDeSerie: req.body.numeroDeSerieAeronave,
                anoFabricacion: req.body.anoFabricacionAeronave,
                categoria: req.body.categoriaAeronave,
                horasTotales: req.body.horasTotalesAeronave,
                pesoBruto: req.body.pesoBrutoAeronave,
                pesoVacio: req.body.pesoVacioAeronave,
                fechaUltimoPeso: req.body.fechaUltimoPesoAeronave
            },
            programaDeMantenimiento: {
                tipoInspeccion: req.body.tipoInspeccion,
                fecha: req.body.fechaMantenimiento,
                horas: req.body.horasMantenimiento,
                categoria: req.body.categoriaMantenimiento,
                utilizacion: req.body.utilizacion
            },
            facturas: [],
            cotizaciones: [], 
            ordenes: []
        }

        const cotizacion = {
            fechaRecepcion: req.body.fechaRecepcion,
            fechaEntrega: req.body.fechaEntrega,
            items: req.body.items,
            total: req.body.total,
            clienteId: "",
            aeronaveId: "",
            tiempoReparacion: req.body.tiempoReparacion, 
            formaPago: req.body.formaPago,
            observaciones: req.body.observaciones
        }


        const db = client.db()
        const clientes = db.collection('clientes')
        const aeronaves = db.collection('aeronaves')
        const cotizaciones = db.collection('cotizaciones')
        const ordenes = db.collection('ordenes')



        /* await cotizaciones.deleteMany({})
        await clientes.deleteMany({})
        await aeronaves.deleteMany({})
        await ordenes.deleteMany({}) */



        /* COMPROBAR QUE NO EXISTE CLIENTE */
        const cedulaClienteString = req.body.cedula;
        const criterioBusquedaCliente = { "propietario.cedula": cedulaClienteString.toString() };
        const cliente = await clientes.findOne(criterioBusquedaCliente)
        if (!cliente) {
            await clientes.insertOne(informacionCliente)
        }

        /* COMPROBAR QUE NO EXISTA AERONAVE */
        const matriculaAeronaveString = req.body.matriculaAeronave;
        const criterioBusquedaAeronave = { "datosAeronave.matricula": matriculaAeronaveString.toString() }
        const aeronave = await aeronaves.findOne(criterioBusquedaAeronave)
        if (!aeronave) {
            await aeronaves.insertOne(informacionAeronave)
        }

        /* AÑADIR ID DE COTIZACION AL CLIENTE */
        await cotizaciones.insertOne(cotizacion)


        const ultimaCotizacion = await cotizaciones.find({}).sort({ _id: -1 }).limit(1).toArray();

        await clientes.updateOne(criterioBusquedaCliente,
            {
                $push: {
                    "cotizaciones": ultimaCotizacion[0]._id
                }
            })

        /* AÑADIR ID DE COTIZACION A LA AERONAVE */

        await aeronaves.updateOne(criterioBusquedaAeronave,
            {
                $push: {
                    "cotizaciones": ultimaCotizacion[0]._id
                }
            })

        /* AÑADIR ID DE CLIENTE Y AERONAVE A LA COTIZACION */
        const ultimoCliente = await clientes.find({}).sort({ _id: -1 }).limit(1).toArray();
        const ultimaAeronave = await aeronaves.find({}).sort({ _id: -1 }).limit(1).toArray();
        const criterioBusquedaCotizacion = { "_id": ultimaCotizacion[0]._id }

        await cotizaciones.updateOne(criterioBusquedaCotizacion,
            {
                $set: {
                    "clienteId": ultimoCliente[0]._id,
                    "aeronaveId": ultimaAeronave[0]._id
                }
            })

        res.status(200).json({ message: 'Cotización añadida' })

        client.close();
    }
}

export default handler;