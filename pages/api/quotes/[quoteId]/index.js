import {MongoClient, ObjectId} from "mongodb";

async function handler(req, res) {

    const {quoteId} = req.query
    const data = JSON.parse(req.body)

    const client = await MongoClient.connect(process.env.MONGO_URI, {useNewUrlParser: true});

    const db = client.db();
    const cotizaciones = db.collection('cotizaciones');
    const ordenes = db.collection('ordenes')
    const clientes = db.collection('clientes')
    const aeronaves = db.collection('aeronaves')

    const orden = {
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

        await cotizaciones.deleteOne({_id: ObjectId(quoteId)});

        res.status(200).json({message: 'Cotización eliminada'});
        client.close();
    }


    if (req.method === 'PUT') {

        await ordenes.insertOne(orden)
        const ordenId = await ordenes.find({}).sort({_id: -1}).limit(1).toArray()

        await clientes.updateOne({
            cotizaciones: {
                $elemMatch: {
                    $eq: ObjectId(quoteId)
                }
            }
        }, {
            $push: {
                ordenes: ordenId[0]._id
            }
        },);

        await clientes.updateOne({
            cotizaciones: {
                $elemMatch: {
                    $eq: ObjectId(quoteId)
                }
            }
        }, {
            $pull: {
                cotizaciones: {$eq: ObjectId(quoteId)}
            }
        })

        await aeronaves.updateOne({
            cotizaciones: {
                $elemMatch: {
                    $eq: ObjectId(quoteId)
                }
            }
        }, {
            $push: {
                ordenes: ordenId[0]._id
            }
        },);

        await aeronaves.updateOne({
            cotizaciones: {
                $elemMatch: {
                    $eq: ObjectId(quoteId)
                }
            }
        }, {
            $pull: {
                cotizaciones: {$eq: ObjectId(quoteId)}
            }
        })

        await cotizaciones.deleteOne({_id: ObjectId(quoteId)})


        res.status(200).json({message: 'Orden añadida'})

        client.close();
    }

}

export default handler
