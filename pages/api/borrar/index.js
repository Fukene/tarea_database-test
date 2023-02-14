import { MongoClient } from "mongodb";

async function handler(req, res) {

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    const db = client.db();
    const facturas = db.collection('facturas')
    const ordenes = db.collection('ordenes')
    const clientes = db.collection('clientes')
    const aeronaves = db.collection('aeronaves')
    const cotizaciones = db.collection('cotizaciones')

    await facturas.deleteMany({})
    await ordenes.deleteMany({})
    await clientes.deleteMany({})
    await aeronaves.deleteMany({})
    await cotizaciones.deleteMany({})

    if (req.method === 'DELETE') {

        res.status(200).json({ message: 'Eliminado' })
        client.close()
    }

}

export default handler