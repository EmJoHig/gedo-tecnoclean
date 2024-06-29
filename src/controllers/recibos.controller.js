import Recibo from "../models/Recibo.js";
import User from "../models/User.js";
import Cliente from "../models/Cliente.js";
import Articulo from "../models/Articulo.js";
import { buildPDFCompleto, buildPDFRecibo, buildPDFRemito } from "../helpers/pdfkit.js";
import PDFDocument from "pdfkit-table";

export const renderReciboForm = async (req, res) => {

    const clientesList = await Cliente.find().sort({ _id: "desc" }).lean();
    const articulosList = await Articulo.find().sort({ _id: "desc" }).lean();

    res.render("recibos/altaRecibosPage", { clientesList, articulosList })
};

export const createNewRecibo = async (req, res) => {
    const { numeroref, descripcion, fecha, iva, cliente, arrayArticulosReporte, checkRemito, checkRecibo } = req.body;
    const errors = [];
    if (!numeroref) {
        errors.push({ text: "debe ingresar numeroref." });
    }
    if (!descripcion) {
        errors.push({ text: "debe ingresar descripcion" });
    }
    if (!fecha) {
        errors.push({ text: "debe ingresar fecha." });
    }
    if (!iva) {
        errors.push({ text: "debe ingresar iva" });
    }
    if (errors.length > 0)
        return res.render("recibos/new-recibo", {
            errors,
            numeroref,
            descripcion,
            fecha,
            iva
        });

    const newRecibo = new Recibo({ numeroref, descripcion, fecha, iva });

    // GUARDO EL RECIBO
    await newRecibo.save();


    // OBTENGO DATOS DEL CLIENTE

    const datosCliente = await Cliente.findOne({ _id: cliente }).lean();


    const remitoChecked = !!checkRemito; // true si checkRemito tiene un valor, false si no
    const reciboChecked = !!checkRecibo;

    // console.log("remitoChecked");
    // console.log(remitoChecked);
    // console.log("reciboChecked");
    // console.log(reciboChecked);

    // GENERO EL PDF

    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=documentos-tecnoclean-${numeroref}.pdf`,
    });

    if(remitoChecked && reciboChecked){
        // GENERAR AMBOS
        buildPDFCompleto(newRecibo, datosCliente, arrayArticulosReporte, (data) => stream.write(data), () => stream.end());
        console.log("AMBOS");
    }else if( remitoChecked && !reciboChecked){
        // GENERAR REMITOS
        buildPDFRemito(newRecibo, datosCliente, arrayArticulosReporte, (data) => stream.write(data), () => stream.end());
        console.log("REMITOS");
    }else if(reciboChecked && !remitoChecked){
        // GENERAR RECIBOS
        buildPDFRecibo(newRecibo, datosCliente, arrayArticulosReporte, (data) => stream.write(data), () => stream.end());
        console.log("RECIBOS");
    }else{
        console.log("NINGUNO");
        res.render("recibos/altaRecibosPage");
    }

    // FIN PDF


    //   req.flash("success_msg", "Recibo Added Successfully");

    //debo usar solo un res. 
    //   res.redirect("/recibos");
};

export const renderRecibos = async (req, res) => {

    const recibosList = await Recibo.find().sort({ _id: "desc" }).lean();



    res.render("recibos/recibosPage", { recibosList });
};

export const renderEditForm = async (req, res) => {
    const Recibo = await Recibo.findById(req.params.id).lean();
    if (Recibo.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/recibos");
    }
    res.render("recibos/edit-recibo", { Recibo });
};

export const updateRecibo = async (req, res) => {
    const { title, description } = req.body;
    await Recibo.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Recibo Updated Successfully");
    res.redirect("/recibos");
};

export const deleteRecibo = async (req, res) => {
    await Recibo.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Recibo Deleted Successfully");
    res.redirect("/recibos");
};



// request para generacion PDF
export const generarPDFRequest = async (req, res) => {
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=documentos-tecnoclean.pdf",
    });

    buildPDF(
        (data) => stream.write(data),
        () => stream.end()
    );
};