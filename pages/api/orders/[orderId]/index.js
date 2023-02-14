import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {

    const { orderId } = req.query
    

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    const db = client.db();
    const cotizaciones = db.collection('cotizaciones');
    const ordenes = db.collection('ordenes')
    const facturas = db.collection('facturas')
    const clientes = db.collection('clientes')
    const aeronaves = db.collection('aeronaves')

    const data = JSON.parse(req.body)
    

    const modeloInformacion = {
        fechaRecepcion: data.fechaRecepcion,
        fechaEntrega: data.fechaEntrega,
        items: data.items,
        total: data.total,
        tiempoReparacion: data.tiempoReparacion,
        formaPago: data.formaPago,
        observaciones: data.observaciones,
        clienteId: ObjectId(data.clienteId),
        aeronaveId: ObjectId(data.aeronaveId)
    }
    

    // eliminar factura

    if (req.method === 'DELETE') {

        await ordenes.deleteOne({ _id: ObjectId(orderId) });

        res.status(200).json({ message: 'Orden eliminada' });
        client.close();
    }

    
    if (req.method === 'PUT' && data.accion == 'convertirACotizacion') {
        
        await cotizaciones.insertOne(modeloInformacion)
        const cotizacionId = await cotizaciones.find({}).sort({ _id: -1 }).limit(1).toArray()

        await clientes.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $push: {
                cotizaciones: cotizacionId[0]._id
            }
        },);

        await clientes.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $pull: {
                ordenes: { $eq: ObjectId(orderId) }
            }
        })

        await aeronaves.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $push: {
                cotizaciones: cotizacionId[0]._id
            }
        },);

        await aeronaves.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $pull: {
                ordenes: { $eq: ObjectId(orderId) }
            }
        })

        await ordenes.deleteOne({ _id: ObjectId(orderId) })


        res.status(200).json({ message: 'Cotización añadida' })

        client.close();
    }


    if (req.method === 'PUT' && data.accion == 'convertirAFactura') {

        await facturas.insertOne(modeloInformacion)
        const facturaId = await facturas.find({}).sort({ _id: -1 }).limit(1).toArray()
        
        await clientes.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $push: {
                facturas: facturaId[0]._id
            }
        },);

        await clientes.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $pull: {
                ordenes: { $eq: ObjectId(orderId) }
            }
        })

        await aeronaves.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $push: {
                facturas: facturaId[0]._id
            }
        },);

        await aeronaves.updateOne({
            ordenes: {
                $elemMatch: {
                    $eq: ObjectId(orderId)
                }
            }
        }, {
            $pull: {
                ordenes: { $eq: ObjectId(orderId) }
            }
        })

        await ordenes.deleteOne({ _id: ObjectId(orderId) })


        res.status(200).json({ message: 'Factura añadida' })

        client.close();
    }
}

export default handler
