import Articulo from "../models/Articulo.js";
import Familia from "../models/Familia.js";

import fs from "fs";

import express from 'express';
const app = express();
app.use(express.json());

// LIST catalogo
export const renderArticulos = async (req, res) => {
  
  let searchOptions = {};
  let familia = req.query.familia;
  let articulos = null;

  if (familia != undefined && familia == 'all' ){
      articulos = await Articulo.find().lean();
  } else 
  if (familia != undefined && familia != ''){
    let flia = await Familia.findOne({ codigo: familia }).lean(); 
    searchOptions.familiaArticulo = flia._id;
    articulos = await Articulo.find(searchOptions).lean();
  } else {
    articulos = await Articulo.find().limit(12).lean();
  }

  let carritoDeCompras = [];
  //req.session.carrito = [];

  if (JSON.stringify(req.session.carrito) === JSON.stringify({})) {
    req.session.carrito = [];
  } else {
    carritoDeCompras = req.session.carrito;
  }

  if(carritoDeCompras === undefined){
    carritoDeCompras = [];
  }
  console.log('carritoDeCompras');
  console.log(carritoDeCompras);

  res.render("articulos/articulosListado", { articulos, carritoDeCompras });

};


// ADMIN ARTICULOS

// 
export const renderAdminArticulos = async (req, res) => {
  
  //esto ANDABA
  // let searchOptions = {};
  // let familia = req.query.familia;
  // let articulos = null;

  // if (familia != undefined && familia == 'all' ){
  //     articulos = await Articulo.find().lean();
  // } else 
  // if (familia != undefined && familia != ''){
  //   let flia = await Familia.findOne({ codigo: familia }).lean(); 
  //   searchOptions.familiaArticulo = flia._id;
  //   articulos = await Articulo.find(searchOptions).lean();
  // } else {
  //   articulos = await Articulo.find().limit().lean();
  // }
  //esto ANDABA fin


  let articulos = await Articulo.find().lean();
  
  res.render("articulos/administracionArticulos", { articulos });

};


// ALTA ARTICULO
export const renderArticuloForm = async (req, res) => {

  // const familias = await Familia.find();
  res.render("articulos/altaArticulo")
}

export const nuevoArticulo = async (req, res) => {
  const { codigo, descripcion } = req.body;

  //esto dejarlo que anda
  // console.log('req files');
  // console.log(req.files[0]);
  // let binaryData = fs.readFileSync(req.files[0].path);
  // var base64String = new Buffer.from(binaryData).toString("base64");

  // const imagen = base64String;


  const errors = [];
  if (!codigo) {
    errors.push({ text: "Please Write a descripcion." });
  }
  if (!descripcion) {
    errors.push({ text: "Please Write a descripcion." });
  }
  if (errors.length > 0)
    return res.render("articulos/altaArticulo", {
      errors,
      codigo,
      descripcion,
    });

  const nuevo = new Articulo({ codigo, descripcion});//, imagen });
  await nuevo.save();
  req.flash("success_msg", "Articulo Added Successfully");
  res.redirect("/articulos/administracionArticulos");
};


export const renderEditarArticuloForm = async (req, res) => {
  const articulo = await Articulo.findById(req.params.id).lean();
  res.render("articulos/editarArticulo", { articulo });
};

export const editarArticulo = async (req, res) => {
  const { codigo, descripcion } = req.body;
  await Articulo.findByIdAndUpdate(req.params.id, { codigo, descripcion });
  req.flash("success_msg", "Articulo Updated Successfully");
  res.redirect("/articulos/administracionArticulos");
};

export const eliminarArticulo = async (req, res) => {

  try {
    await Articulo.findByIdAndDelete(req.params.id);
    console.log("paso por eliminarArticulo");
    res.json({ success: true, message: "Articulo Deleted Successfully" });
    console.log("retorno el json");
  } catch (error) {
    res.json({ success: false, message: "Error deleting articulo" });
  }
};


// CARRITO
// export const carritoCompras = async (req, res) => {

//   const familias = await Familia.find();

//   const carritoData = req.query.carrito;
    
//     console.log(req.query);
    
//     console.log(carritoData);

//     console.log(JSON.stringify(carritoData, null, 2));

//   // const carritoObj = JSON.parse(req.query.carrito);
  
// //   carritoData.forEach(producto => {
// //     if (producto && producto._id) {
// //         console.log('ID del producto en el carrito:', producto._id);
// //     }
// // });


//   res.render("articulos/carritoCompras", { familias })
// }



export const enviocarritovista = async (req, res) => {
  
  const cartcompras = JSON.parse(req.body.cartcompras);
  const lista = cartcompras.cartcomprasData;

  // const cartcompras = JSON.parse(req.session.carrito);

  // console.log('cartcompras');
  // console.log(cartcompras);

  req.session.carrito = lista;
  // console.log('req.session.carrito');
  // console.log(req.session.carrito);

  // const cartcomprasArray = [];

  // for (const key in lista) {
  //   if (cartcomprasData.hasOwnProperty(key)) {
  //     const item = cartcomprasData[key];
  //     const descripcion = item.descripcion;
  //     const cantidad = item.cantidad;
  //     console.log(`ID: ${key}, Descripción: ${descripcion}, Cantidad: ${cantidad}`);
  //   }
  // }

  res.render("articulos/carritoCompras", { listaDePedidos: lista });
};


export const carritoCompras = async (req, res) => {

  // console.log('DIRECTO VISTA');
  // const lista = req.session.carrito;

  // console.log('req.session.carrito');
  // console.log(req.session.carrito);
  
  // res.render("articulos/carritoCompras", { lista });
};


//envio wsp

export const enviarpedido = async (req, res) => {
  
  const listaDePedidos = JSON.parse(req.body.lista);
  console.log('listaDePedidos');
  console.log(listaDePedidos);

  res.render("articulos/carritoCompras", { listaDePedidos });
};