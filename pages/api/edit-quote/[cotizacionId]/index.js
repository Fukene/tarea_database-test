import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
    const { cotizacionId } = req.query;
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    const db = client.db();
    const coleccionClientes = db.collection("clientes");
    const coleccionAeronaves = db.collection("aeronaves");
    const coleccionCotizaciones = db.collection("cotizaciones");


    if (req.method === "PUT") {

        await coleccionClientes.updateOne(
            {
                cotizaciones: { $elemMatch: { $eq: ObjectId(cotizacionId) } }
            },
            {
                $set: {
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
                    }
                },
            }
        );

        await coleccionAeronaves.updateOne(
            {
                cotizaciones: { $elemMatch: { $eq: ObjectId(cotizacionId) } }
            },
            {
                $set: {
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
                    }
                },
            }
        );

        await coleccionCotizaciones.updateOne(
            {
                _id: ObjectId(cotizacionId)
            },
            {
                $set: {
                    fechaRecepcion: req.body.fechaRecepcion,
                    fechaEntrega: req.body.fechaEntrega,
                    items: req.body.items,
                    total: req.body.total,
                    tiempoReparacion: req.body.tiempoReparacion,
                    formaPago: req.body.formaPago,
                    observaciones: req.body.observaciones
                },
            }
        );



        res.status(200).json({ message: "Cotización actualizada" });
    }

    client.close();
}

export default handler;