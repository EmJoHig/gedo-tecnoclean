import PDFDocument from "pdfkit";



export function buildPDFCompleto(newRecibo, datosCliente, arrayArticulosReporte, dataCallback, endCallback) {
    const doc = new PDFDocument();
    const fechaRecibo = new Date(newRecibo.fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // si es null o undefined, asignarle un array vacio
    const articulosArray = arrayArticulosReporte ? JSON.parse(arrayArticulosReporte) : [];
    // const articulosArray = JSON.parse(arrayArticulosReporte);

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    const logoRemitoPath = './src/public/images/logo-remito.png';
    // INIT RECIBO
    // Configurar la cabecera
    const logoPath = './src/public/images/logo-tc-docs.png';
    doc.image(logoPath, 50, 20, { width: 100 });
    doc.fontSize(15).text('RECIBO', 60, 30, { align: 'center' });
    doc.fontSize(10).text(`REF: ${newRecibo.numeroref}`, 410, 30, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(10).text(`Fecha: ${fechaRecibo}`, { align: 'right' });
    doc.moveDown(3);
    doc.fontSize(8).text(`CUIT: 1234567878910111213`, 150, 70, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`I. I. B. B.: lo que sea esto`, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`Inicio de Actividades: 01/06/2022`, { align: 'right' });
    doc.moveDown(7);
    const logoReciboPath = './src/public/images/logo-recibo.png';
    doc.image(logoReciboPath, 282, 45, { width: 35, align: 'center' });
    doc.moveDown(1);
    const endX = doc.page.width - 50;
    doc.moveTo(50, 120).lineTo(endX, 120).stroke();
    doc.moveDown(1);

    // Configurar el contenido
    // DATOS CLIENTE
    doc.fontSize(10).text(`Cliente: ${datosCliente.nombre}`, 50, 140, { align: 'left' });
    doc.fontSize(10).text(`CUIT: ${datosCliente.cuit}`, 180, 140);
    doc.moveDown(2);
    doc.fontSize(10).text(`IVA: ${newRecibo.iva}`, 50, 160, { align: 'left' });
    doc.fontSize(10).text(`Domicilio: ${datosCliente.domicilio}`, 180, 160);
    doc.moveDown(2);

    // ARTICULOS
    doc.fontSize(10).text(`ARTICULOS `, 50);
    doc.moveDown(2);
    doc.fontSize(10).text(`Codigo `, 50, 210);
    doc.fontSize(10).text(`Descripcion`, 200, 210);
    doc.fontSize(10).text(`Cantidad `, 450, 210);
    // doc.moveTo(50, 220).lineTo(endX, 220).stroke();
    doc.moveDown(1);

    let widthcol = 210;
    articulosArray.forEach((articulo) => {
        widthcol = widthcol + 20;	
        doc.fontSize(10).text(`${articulo.codigo}`, 50, widthcol);
        doc.fontSize(10).text(`${articulo.descripcion}`,200, widthcol);
        doc.fontSize(10).text(`${articulo.cantidad} lts`, 450, widthcol);
    });

    doc.moveDown(5);

    // FOOTER
    doc.fontSize(10).text(`Firma: `, 440, 310);
    doc.moveDown(2);
    doc.fontSize(10).text(`Aclaración: `, 440, 330);
    doc.moveDown(2);
    // FIN RECIBO


    // SEPARADOR DE DOCUMENTOS
    const endX2 = doc.page.width - 50;
    doc.moveTo(50, 360).lineTo(endX2, 360).stroke();
    // INIT REMITO
    // Configurar la cabecera
    doc.image(logoPath, 50, 410, { width: 100 });
    doc.fontSize(15).text('REMITO', 60, 410, { align: 'center' });
    doc.fontSize(10).text(`REF: ${newRecibo.numeroref}`, 410, 410, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(10).text(`Fecha: ${fechaRecibo}`, { align: 'right' });
    doc.moveDown(3);
    doc.fontSize(8).text(`CUIT: 1234567878910111213`, 150, 450, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`I. I. B. B.: `, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`Inicio de Actividades: 01/06/2022`, { align: 'right' });
    doc.moveDown(7);
    doc.image(logoRemitoPath, 282, 425, { width: 35, align: 'center' });
    doc.moveDown(1);
    const endX3 = doc.page.width - 50;
    doc.moveTo(50, 490).lineTo(endX3, 490).stroke();
    doc.moveDown(1);

    // Configurar el contenido
    // DATOS CLIENTE
    doc.fontSize(10).text(`Cliente: ${datosCliente.nombre}`, 50, 510, { align: 'left' });
    doc.fontSize(10).text(`CUIT: ${datosCliente.cuit}`, 180, 510);
    doc.moveDown(2);
    doc.fontSize(10).text(`IVA: ${newRecibo.iva}`, 50, 530, { align: 'left' });
    doc.fontSize(10).text(`Domicilio: ${datosCliente.domicilio}`, 180, 530);
    doc.moveDown(2);

    // ARTICULOS
    // doc.fontSize(10).text(`ARTICULO                     Descripcion                     Cantidad `, 50);
    // doc.moveDown(1);
    // doc.fontSize(10).text(`001-002           Jabón Baja Espuma Tecno SKIP             1 lts`, 50);
    // doc.fontSize(10).text(`002-002           Jabón Baja Espuma Tecno SKIP             2 lts`, 50);
    // doc.fontSize(10).text(`003-002           Jabón Baja Espuma Tecno SKIP             3 lts`, 50);
    // doc.fontSize(10).text(`004-002           Jabón Baja Espuma Tecno SKIP             4 lts`, 50);
    // doc.fontSize(10).text(`005-002           Jabón Baja Espuma Tecno SKIP             5 lts`, 50);
    // doc.moveDown(5);

    // ARTICULOS
    doc.fontSize(10).text(`ARTICULOS `, 50);
    doc.moveDown(2);
    doc.fontSize(10).text(`Codigo `, 50, 580);
    doc.fontSize(10).text(`Descripcion`, 200, 580);
    doc.fontSize(10).text(`Cantidad `, 450, 580);
    // doc.moveTo(50, 220).lineTo(endX, 220).stroke();
    doc.moveDown(1);

    let widthcol2 = 580;
    articulosArray.forEach((articulo) => {
        widthcol2 = widthcol2 + 20;	
        doc.fontSize(10).text(`${articulo.codigo}`, 50, widthcol2);
        doc.fontSize(10).text(`${articulo.descripcion}`,200, widthcol2);
        doc.fontSize(10).text(`${articulo.cantidad} lts`, 450, widthcol2);
    });

    doc.moveDown(5);

    // FOOTER
    doc.fontSize(10).text(`Firma: `, 440, 670);
    doc.moveDown(2);
    doc.fontSize(10).text(`Aclaración: `, 440, 690);
    doc.moveDown(2);
    doc.end();
}




// PDF REMITO
export function buildPDFRemito(newRecibo, datosCliente, arrayArticulosReporte, dataCallback, endCallback) {
    const doc = new PDFDocument();
    const fechaRecibo = new Date(newRecibo.fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // si es null o undefined, asignarle un array vacio
    const articulosArray = arrayArticulosReporte ? JSON.parse(arrayArticulosReporte) : [];
    // const articulosArray = JSON.parse(arrayArticulosReporte);

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    // Configurar la cabecera
    const logoPath = './src/public/images/logo-tc-docs.png';
    doc.image(logoPath, 50, 20, { width: 100 });
    doc.fontSize(15).text('REMITO', 60, 30, { align: 'center' });
    doc.fontSize(10).text(`REF: ${newRecibo.numeroref}`, 410, 30, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(10).text(`Fecha: ${fechaRecibo}`, { align: 'right' });
    doc.moveDown(3);
    doc.fontSize(8).text(`CUIT: 1234567878910111213`, 150, 70, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`I. I. B. B.: lo que sea esto`, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`Inicio de Actividades: 01/06/2022`, { align: 'right' });
    doc.moveDown(7);
    const logoRemitoPath = './src/public/images/logo-remito.png';
    doc.image(logoRemitoPath, 282, 45, { width: 35, align: 'center' });
    doc.moveDown(1);
    const endX = doc.page.width - 50;
    doc.moveTo(50, 120).lineTo(endX, 120).stroke();
    doc.moveDown(1);

    // Configurar el contenido
    // DATOS CLIENTE
    doc.fontSize(10).text(`Cliente: ${datosCliente.nombre}`, 50, 140, { align: 'left' });
    doc.fontSize(10).text(`CUIT: ${datosCliente.cuit}`, 180, 140);
    doc.moveDown(2);
    doc.fontSize(10).text(`IVA: ${newRecibo.iva}`, 50, 160, { align: 'left' });
    doc.fontSize(10).text(`Domicilio: ${datosCliente.domicilio}`, 180, 160);
    doc.moveDown(2);

    // ARTICULOS
    doc.fontSize(10).text(`ARTICULOS `, 50);
    doc.moveDown(2);
    doc.fontSize(10).text(`Codigo `, 50, 210);
    doc.fontSize(10).text(`Descripcion`, 200, 210);
    doc.fontSize(10).text(`Cantidad `, 450, 210);
    // doc.moveTo(50, 220).lineTo(endX, 220).stroke();
    doc.moveDown(1);

    let widthcol = 210;
    articulosArray.forEach((articulo) => {
        widthcol = widthcol + 20;	
        doc.fontSize(10).text(`${articulo.codigo}`, 50, widthcol);
        doc.fontSize(10).text(`${articulo.descripcion}`,200, widthcol);
        doc.fontSize(10).text(`${articulo.cantidad} lts`, 450, widthcol);
    });

    doc.moveDown(5);

    // FOOTER
    doc.fontSize(10).text(`Firma: `, 440, 310);
    doc.moveDown(2);
    doc.fontSize(10).text(`Aclaración: `, 440, 330);
    doc.moveDown(2);

    // SEPARADOR DE DOCUMENTOS
    const endX2 = doc.page.width - 50;
    doc.moveTo(50, 360).lineTo(endX2, 360).stroke();

    // Configurar la cabecera
    doc.image(logoPath, 50, 410, { width: 100 });
    doc.fontSize(15).text('REMITO', 60, 410, { align: 'center' });
    doc.fontSize(10).text(`REF: ${newRecibo.numeroref}`, 410, 410, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(10).text(`Fecha: ${fechaRecibo}`, { align: 'right' });
    doc.moveDown(3);
    doc.fontSize(8).text(`CUIT: 1234567878910111213`, 150, 450, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`I. I. B. B.: `, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`Inicio de Actividades: 01/06/2022`, { align: 'right' });
    doc.moveDown(7);
    doc.image(logoRemitoPath, 282, 425, { width: 35, align: 'center' });
    doc.moveDown(1);
    const endX3 = doc.page.width - 50;
    doc.moveTo(50, 490).lineTo(endX3, 490).stroke();
    doc.moveDown(1);

    // DATOS CLIENTE
    doc.fontSize(10).text(`Cliente: ${datosCliente.nombre}`, 50, 510, { align: 'left' });
    doc.fontSize(10).text(`CUIT: ${datosCliente.cuit}`, 180, 510);
    doc.moveDown(2);
    doc.fontSize(10).text(`IVA: ${newRecibo.iva}`, 50, 530, { align: 'left' });
    doc.fontSize(10).text(`Domicilio: ${datosCliente.domicilio}`, 180, 530);
    doc.moveDown(2);

    // ARTICULOS
    doc.fontSize(10).text(`ARTICULOS `, 50);
    doc.moveDown(2);
    doc.fontSize(10).text(`Codigo `, 50, 580);
    doc.fontSize(10).text(`Descripcion`, 200, 580);
    doc.fontSize(10).text(`Cantidad `, 450, 580);
    // doc.moveTo(50, 220).lineTo(endX, 220).stroke();
    doc.moveDown(1);

    let widthcol2 = 580;
    articulosArray.forEach((articulo) => {
        widthcol2 = widthcol2 + 20;	
        doc.fontSize(10).text(`${articulo.codigo}`, 50, widthcol2);
        doc.fontSize(10).text(`${articulo.descripcion}`,200, widthcol2);
        doc.fontSize(10).text(`${articulo.cantidad} lts`, 450, widthcol2);
    });

    doc.moveDown(5);

    // FOOTER
    doc.fontSize(10).text(`Firma: `, 440, 670);
    doc.moveDown(2);
    doc.fontSize(10).text(`Aclaración: `, 440, 690);
    doc.moveDown(2);
    doc.end();
}




// PDF RECIBO
export function buildPDFRecibo(newRecibo, datosCliente, arrayArticulosReporte, dataCallback, endCallback) {
    const doc = new PDFDocument();
    const fechaRecibo = new Date(newRecibo.fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // si es null o undefined, asignarle un array vacio
    const articulosArray = arrayArticulosReporte ? JSON.parse(arrayArticulosReporte) : [];
    // const articulosArray = JSON.parse(arrayArticulosReporte);

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    // Configurar la cabecera
    const logoPath = './src/public/images/logo-tc-docs.png';
    doc.image(logoPath, 50, 20, { width: 100 });
    doc.fontSize(15).text('RECIBO', 60, 30, { align: 'center' });
    doc.fontSize(10).text(`REF: ${newRecibo.numeroref}`, 410, 30, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(10).text(`Fecha: ${fechaRecibo}`, { align: 'right' });
    doc.moveDown(3);
    doc.fontSize(8).text(`CUIT: 1234567878910111213`, 150, 70, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`I. I. B. B.: lo que sea esto`, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`Inicio de Actividades: 01/06/2022`, { align: 'right' });
    doc.moveDown(7);
    const logoReciboPath = './src/public/images/logo-recibo.png';
    doc.image(logoReciboPath, 282, 45, { width: 35, align: 'center' });
    doc.moveDown(1);
    const endX = doc.page.width - 50;
    doc.moveTo(50, 120).lineTo(endX, 120).stroke();
    doc.moveDown(1);

    // Configurar el contenido
    // DATOS CLIENTE
    doc.fontSize(10).text(`Cliente: ${datosCliente.nombre}`, 50, 140, { align: 'left' });
    doc.fontSize(10).text(`CUIT: ${datosCliente.cuit}`, 180, 140);
    doc.moveDown(2);
    doc.fontSize(10).text(`IVA: ${newRecibo.iva}`, 50, 160, { align: 'left' });
    doc.fontSize(10).text(`Domicilio: ${datosCliente.domicilio}`, 180, 160);
    doc.moveDown(2);

    // ARTICULOS
    doc.fontSize(10).text(`ARTICULOS `, 50);
    doc.moveDown(2);
    doc.fontSize(10).text(`Codigo `, 50, 210);
    doc.fontSize(10).text(`Descripcion`, 200, 210);
    doc.fontSize(10).text(`Cantidad `, 450, 210);
    // doc.moveTo(50, 220).lineTo(endX, 220).stroke();
    doc.moveDown(1);

    let widthcol = 210;
    articulosArray.forEach((articulo) => {
        widthcol = widthcol + 20;	
        doc.fontSize(10).text(`${articulo.codigo}`, 50, widthcol);
        doc.fontSize(10).text(`${articulo.descripcion}`,200, widthcol);
        doc.fontSize(10).text(`${articulo.cantidad} lts`, 450, widthcol);
    });

    doc.moveDown(5);

    // FOOTER
    doc.fontSize(10).text(`Firma: `, 440, 310);
    doc.moveDown(2);
    doc.fontSize(10).text(`Aclaración: `, 440, 330);
    doc.moveDown(2);

    // SEPARADOR DE DOCUMENTOS
    const endX2 = doc.page.width - 50;
    doc.moveTo(50, 360).lineTo(endX2, 360).stroke();
    
    // Configurar la cabecera
    doc.image(logoPath, 50, 410, { width: 100 });
    doc.fontSize(15).text('RECIBO', 60, 410, { align: 'center' });
    doc.fontSize(10).text(`REF: ${newRecibo.numeroref}`, 410, 410, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(10).text(`Fecha: ${fechaRecibo}`, { align: 'right' });
    doc.moveDown(3);
    doc.fontSize(8).text(`CUIT: 1234567878910111213`, 150, 450, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`I. I. B. B.: `, { align: 'right' });
    doc.moveDown(0.1);
    doc.fontSize(8).text(`Inicio de Actividades: 01/06/2022`, { align: 'right' });
    doc.moveDown(7);
    doc.image(logoReciboPath, 282, 425, { width: 35, align: 'center' });
    doc.moveDown(1);
    const endX3 = doc.page.width - 50;
    doc.moveTo(50, 490).lineTo(endX3, 490).stroke();
    doc.moveDown(1);

    // DATOS CLIENTE
    doc.fontSize(10).text(`Cliente: ${datosCliente.nombre}`, 50, 510, { align: 'left' });
    doc.fontSize(10).text(`CUIT: ${datosCliente.cuit}`, 180, 510);
    doc.moveDown(2);
    doc.fontSize(10).text(`IVA: ${newRecibo.iva}`, 50, 530, { align: 'left' });
    doc.fontSize(10).text(`Domicilio: ${datosCliente.domicilio}`, 180, 530);
    doc.moveDown(2);

    // ARTICULOS
    doc.fontSize(10).text(`ARTICULOS `, 50);
    doc.moveDown(2);
    doc.fontSize(10).text(`Codigo `, 50, 580);
    doc.fontSize(10).text(`Descripcion`, 200, 580);
    doc.fontSize(10).text(`Cantidad `, 450, 580);
    // doc.moveTo(50, 220).lineTo(endX, 220).stroke();
    doc.moveDown(1);

    let widthcol2 = 580;
    articulosArray.forEach((articulo) => {
        widthcol2 = widthcol2 + 20;	
        doc.fontSize(10).text(`${articulo.codigo}`, 50, widthcol2);
        doc.fontSize(10).text(`${articulo.descripcion}`,200, widthcol2);
        doc.fontSize(10).text(`${articulo.cantidad} lts`, 450, widthcol2);
    });

    doc.moveDown(5);

    // FOOTER
    doc.fontSize(10).text(`Firma: `, 440, 670);
    doc.moveDown(2);
    doc.fontSize(10).text(`Aclaración: `, 440, 690);
    doc.moveDown(2);
    doc.end();
}



