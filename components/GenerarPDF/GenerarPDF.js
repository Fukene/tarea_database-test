
import { useEffect, useState } from "react";
import PlantillaCotizacion from "../PlantillaCotizacion/PlantillaCotizacion";
import PlantillaFactura from "../PlantillaFactura/PlantillaFactura"
import PlantillaOrden from "../PlantillaOrden/PlantillaOrden"
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function GenerarPDF(data) {

    const [isClient, setIsClient] = useState(false)
    const [cotizacion, setCotizacion] = useState()
    const [factura, setFactura] = useState()
    const [orden, setOrden] = useState()

    useEffect(() => {
        setIsClient(true);

        switch (data.tipo) {
            case 'cotizacion':
                setCotizacion(true)
                break;
            case 'factura':
                setFactura(true)
                break;
            case 'orden':
                setOrden(true)
                break;
        }
    }, [])

    

    return (
        <>
            {isClient && cotizacion && (
                <div>
                    <PDFDownloadLink document={<PlantillaCotizacion cotizacion={data.data} />} fileName={'cotizacion.pdf'} >
                        <button className="print_btn">Imprimir</button>
                    </PDFDownloadLink>
                </div>
            )}

            {isClient && factura && (
                <div>
                    <PDFDownloadLink document={<PlantillaFactura factura={data.data} />} fileName={'factura.pdf'} >
                        <button className="print_btn">Imprimir</button>
                    </PDFDownloadLink>
                </div>
            )}
            
            {isClient && orden && (
                <div>
                    <PDFDownloadLink document={<PlantillaOrden orden={data.data} />} fileName={'orden.pdf'} >
                        <button className="print_btn">Imprimir</button>
                    </PDFDownloadLink>
                </div>
            )}
        </>
    )
}