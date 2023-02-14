import { MongoClient } from "mongodb";

async function handler(req, res) {

    const { tipoBusqueda, id } = req.query

    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    const db = client.db()
    const coleccion = db.collection(tipoBusqueda)


    let query;

    if (tipoBusqueda === 'clientes') {
        query = { "propietario.cedula": id }
    } else {
        query = { "datosAeronave.matricula": id }
    }

    const datosEncontrados = await coleccion.find(query).toArray()
    
    res.status(200).json({ message: "Datos encontrados", datosEncontrados: datosEncontrados})
    client.close()
}

export default handler