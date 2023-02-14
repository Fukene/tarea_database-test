import React from "react"
import { Document, Page, Text, View, Image } from "@react-pdf/renderer"


const Plantilla = (data) => {

    const { factura } = data
    const { cliente } = factura
    const { aeronave } = factura
    const valorTotal = factura.items.reduce((actual, siguiente) => actual + siguiente.total, 0)
    const iva = valorTotal * 0.19
    const valorSinIVa = valorTotal - (iva)

    /* STYLES */
    const color = {
        colorPrimario: '#04248c',
        colorFondoGris: "#4A4849",
        colorFondo: '#dbdff5',
        colorTest: "#E7F24B",
        colorTexto: "#22417D",
        colorTextoDifuminado: "#5A6163",
        colorTextoBlanco: "#EAF7FE"
    }

    const styles = {
        todo: {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontSize: 8,
        },
        logoContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "flex-end",
            width: "100vw",
            margin: "10px 20px 50px 0px",
            zIndex: "-1",
            position: "absolute"
        },
        rellenarLogo: {
            top: 0,
            left: 0,
            width: "100vw",
            height: "110px",
            backgroundColor: color.colorPrimario,
            zIndex: "1"
        },
        image: {
            width: '250px',
            height: '110px'
        },
        headerContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "120px",
            margin: "50px 20px 0px 20px",
        },
        headerContainerDiv: {
            height: "120px"
        },
        customerInformation: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            padding: "0px 10px",
            marginLeft: "10px",
            height: "60%",
            width: "60%",
            backgroundColor: color.colorFondoGris,
            color: color.colorTextoBlanco,
            borderRadius: "2px",
            fontSize: 8,
            fontWeight: "bold"
        },
        nombreCliente: {
            fontSize: 13,
            marginBottom: "2px"
        },
        titleContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "60%",
            columnGap: "15px",
            margin: "0px 15px",
        },
        detailsTitle: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "start",
            width: "100%",
            margin: "0px 20px"
        },
        padding: {
            padding: "5px 0px"
        },
        numeroCotizacion: {
            backgroundColor: color.colorFondo,
            padding: "5px 10px",
            borderRadius: "2px",

        },
        title: {
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            fontSize: 24,
            color: color.colorTextoDifuminado
        },
        tableHeaders: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "30px 10px 0px 10px"
        },
        itemHeader: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50px",
            fontSize: "10px",
            color: color.colorTexto
        },
        descripcionHeader: {
            width: "150px",
            fontSize: "10px",
            color: color.colorTexto
        },
        cantidadHeader: {
            width: "50px",
            fontSize: "10px",
            color: color.colorTexto

        },
        valorHeader: {
            width: "50px",
            fontSize: "10px",
            color: color.colorTexto
        },
        totalHeader: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            width: "70px",
            fontSize: "10px",
            color: color.colorTexto
        },
        tableContent: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "0px 10px"
        },
        itemValue: {
            width: "50px"
        },
        descripcionValue: {
            width: "150px"
        },
        cantidadValue: {
            display: "flex",
            flexDirection: "row-reverse",
            width: "40px"
        },
        valorValue: {
            display: "flex",
            flexDirection: "row-reverse",
            width: "50px"
        },
        totalValue: {
            display: "flex",
            flexDirection: "row-reverse",
            width: "70px"
        },
        linea: {
            borderBottom: "1px solid #272F3D",
            margin: "5px 10px"
        },
        lineaDelgada: {
            borderBottom: "1px solid #7089B3",
            margin: "5px 10px"
        },
        detailsPaymentContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "30px 30px"
        },
        detailsPaymentColumn: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: color.colorFondo,
            borderRadius: "2px",
            padding: "5px 10px"
        },
        datosAeronaveTitle: {
            marginBottom: "5px",
            fontSize: 10,
        },
        valoresAeronave: {
            fontSize: 10,

        },
        paymentMethods: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: "20px"
        },
        paymentDetails: {
            display: "flex",
            flexDirection: "column",
            width: "30%"
        },
        paymentDetailsDiv: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        grandTotal: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "5px",
            backgroundColor: color.colorFondoGris,
            color: color.colorTextoBlanco,
            fontSize: "12px",
            padding: "5px",
            borderRadius: "2px"
        },
        footer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "absolute",
            top: "680px",
            width: "95vw",
            padding: "10px 0px 0px 10px",
            margin: "0px 35px"
        },
        observacionesContainer: {
            width: "90%"
        },
        contactContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            justifyContent: "space-between",
            marginTop: "30px",
            marginLeft: "5px"
        },
        margin: {
            marginLeft: "20px",
            marginRight: "20px"
        },
        lineaVertical: {
            borderLeft: "1px solid black",
            height: "100%",
            width: "1px"
        }


    }

    return (
        <Document>
            <Page size="A4">
                <View style={styles.todo}>
                    <View className="body">
                        <View style={styles.logoContainer}>
                            <View>
                                <Image style={styles.image} src="/images/logoTareaAeropinturaSinFondo.png" alt="Logo de Tarea Training" priority />
                            </View>
                        </View>
                        <View style={styles.rellenarLogo}></View>
                        <View style={styles.headerContainer} >
                            <View style={styles.customerInformation}>
                                <View>
                                    <Text style={styles.nombreCliente}>{cliente.propietario.nombre}</Text>
                                </View>
                                <View>
                                    <Text>{cliente.propietario.cedula}</Text>
                                </View>
                                <View>
                                    <Text>{cliente.propietario.direccion}</Text>
                                </View>
                                <View>
                                    <Text>{cliente.propietario.email}</Text>
                                </View>
                                <View>
                                    <Text>{cliente.propietario.telefono}</Text>
                                </View>
                            </View>
                            <View style={styles.titleContainer}>
                                <View style={styles.title} >
                                    <Text>Factura</Text>
                                </View>
                                <View style={styles.detailsTitle}>
                                    <View style={styles.numeroCotizacion}>
                                        <Text>Número factura</Text>
                                        <Text style={{ fontSize: "10px" }}>{factura.id.substr(18, 24).toUpperCase()}</Text>
                                    </View>
                                    <View style={styles.padding}>
                                        <Text>Fecha emisión</Text>
                                        <Text>{factura.fechaRecepcion}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.margin}>
                            <View style={styles.tableHeaders} >
                                <View style={styles.itemHeader} >
                                    <Text >Item</Text>
                                </View>
                                <View >
                                    <Text style={styles.descripcionHeader}>Descripción</Text>
                                </View>
                                <View >
                                    <Text style={styles.cantidadHeader}>Cantidad</Text>
                                </View>
                                <View>
                                    <Text style={styles.valorHeader}>Precio</Text>
                                </View>
                                <View >
                                    <Text style={styles.totalHeader}>Total</Text>
                                </View>
                            </View>
                            <View style={styles.linea}></View>
                            {factura.items?.map((item, i) => (
                                <View key={i}>
                                    <View style={styles.tableContent}>
                                        <View style={styles.itemValue} >
                                            <Text>{item.nombre}</Text>
                                        </View>
                                        <View style={styles.descripcionValue} >
                                            <Text>{item.descripcion}</Text>
                                        </View>
                                        <View style={styles.cantidadValue} >
                                            <Text>{item.cantidad}</Text>
                                        </View>
                                        <View style={styles.valorValue} >
                                            <Text>{item.precio}</Text>
                                        </View>
                                        <View style={styles.totalValue}>
                                            <Text>{item.total}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.lineaDelgada}></View>
                                </View>
                            ))}
                        </View>
                        <View style={styles.detailsPaymentContainer}>
                            <View style={styles.detailsPaymentColumn}>
                                <View style={styles.datosAeronaveTitle}>
                                    <Text>Datos Aeronave</Text>
                                </View>
                                <View style={styles.paymentMethods}>
                                    <View>
                                        <Text>Matrícula</Text>
                                        <Text style={styles.valoresAeronave}>{aeronave.datosAeronave.matricula}</Text>
                                    </View>
                                    <View>
                                        <Text>Marca</Text>
                                        <Text style={styles.valoresAeronave}>{aeronave.datosAeronave.marca}</Text>
                                    </View>
                                    <View>
                                        <Text>Modelo</Text>
                                        <Text style={styles.valoresAeronave}>{aeronave.datosAeronave.modelo}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.paymentDetails}>
                                <View style={styles.paymentDetailsDiv}>
                                    <Text>Sub total</Text>
                                    <Text>{valorSinIVa}</Text>
                                </View>
                                <View style={styles.paymentDetailsDiv}>
                                    <Text>IVA</Text>
                                    <Text>{iva}</Text>
                                </View>
                                <View style={styles.grandTotal} className="grand_total">
                                    <Text>Total</Text>
                                    <Text>{valorTotal}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.observacionesContainer}>
                            <View>
                                <Text>Observaciones</Text>
                            </View>
                            <View>
                                <Text>{factura.observaciones}</Text>
                            </View>
                        </View>
                        <View style={styles.contactContainer}>
                            <View style={styles.sign} >
                                <View>
                                    <Text>Luis Hernando Fuquene</Text>
                                </View>
                                <View>
                                    <Text>Tarea Aeropintura</Text>
                                </View>
                            </View>
                            <View style={styles.lineaVertical}></View>
                            <View style={styles.tareaDetails} >
                                <View>
                                    <Text>Autopista Norte Km 16</Text>
                                </View>
                                <View>
                                    <Text>Vía Guaymaral Hangares Aviopartes</Text>
                                </View>
                                <View>
                                    <Text>Bogotá</Text>
                                </View>
                            </View>
                            <View style={styles.lineaVertical}></View>
                            <View style={styles.contactDetails}>
                                <View>
                                    <Text>+57 305 3029429</Text>
                                </View>
                                <View>
                                    <Text>tarea.aeropintura@gmail.com</Text>
                                </View>
                                <View>
                                    <Text>@tarea.aeropintura</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Plantilla