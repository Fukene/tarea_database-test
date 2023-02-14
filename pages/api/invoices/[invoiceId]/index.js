import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {

    const data = JSON.parse(req.body)

    const { invoiceId } = req.query

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    
    const db = client.db();
    const facturas = db.collection('facturas');
    const clientes = db.collection('clientes');
    const ordenes = db.collection('ordenes');
    const aeronaves = db.collection('aeronaves');

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
        await facturas.deleteOne({ _id: ObjectId(invoiceId) });

        res.status(200).json({ message: 'Factura eliminada' });
        client.close();
    }



    if (req.method === 'PUT') {

        await ordenes.insertOne(modeloInformacion)
        const ultimaOrden = await ordenes.find({}).sort({ _id: -1 }).limit(1).toArray()
        

        await clientes.updateOne({
            facturas: {
                $elemMatch: {
                    $eq: ObjectId(invoiceId)
                }
            }
        }, {
            $push: {
                ordenes: ultimaOrden[0]._id
            }
        },);

        await clientes.updateOne({
            facturas: {
                $elemMatch: {
                    $eq: ObjectId(invoiceId)
                }
            }
        }, {
            $pull: {
                facturas: { $eq: ObjectId(invoiceId) }
            }
        })

        await aeronaves.updateOne({
            facturas: {
                $elemMatch: {
                    $eq: ObjectId(invoiceId)
                }
            }
        }, {
            $push: {
                ordenes: ultimaOrden[0]._id
            }
        },);

        await aeronaves.updateOne({
            facturas: {
                $elemMatch: {
                    $eq: ObjectId(invoiceId)
                }
            }
        }, {
            $pull: {
                facturas: { $eq: ObjectId(invoiceId) }
            }
        })

        await facturas.deleteOne({ _id: ObjectId(invoiceId) })


        res.status(200).json({ message: 'Orden añadida' })

        client.close();
    }

}

export default handler