// import { Router } from "express";
import pkg from 'express';
const { Router } = pkg;
import {
  renderArticulos,
  renderAdminArticulos,
  renderArticuloForm,
  nuevoArticulo,
  renderEditarArticuloForm,
  editarArticulo,
  eliminarArticulo,
  enviocarritovista,
  carritoCompras,
  enviarpedido
  
} from "../controllers/articulos.controller.js";
import { isAuthenticated } from "../helpers/auth.js";
import multer from 'multer';


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".png")
  }
})
var uploadimage = multer({
  storage: storage,
})


const router = Router();



router.get("/articulos/articulosListado/", renderArticulos);

// ADMIN ARTICULOS
// LIST
router.get("/articulos/administracionArticulos", isAuthenticated, renderAdminArticulos);
// ALTA GET
router.get("/articulos/altaArticulo", isAuthenticated, renderArticuloForm);
// ALTA POST
router.post("/articulos/nuevoArticulo", isAuthenticated, uploadimage.any() , nuevoArticulo);
// EDICION GET
router.get("/articulos/editarArticulo/:id", isAuthenticated, renderEditarArticuloForm);
// EDICION PUT
router.put("/articulos/editarArticulo/:id", isAuthenticated, editarArticulo);
// ELIMINAR
router.delete("/articulos/eliminarArticulo/:id", isAuthenticated, eliminarArticulo);

// CARRITO
router.post("/articulos/enviocarritovista", enviocarritovista);

router.get("/articulos/carritocompras", carritoCompras);

//update carrito
router.post('/update-cart', (req, res) => {

  console.log('req.body.carrito');
  console.log(req.body.carrito);

let carroski = req.body.carrito;

  // req.session.carrito = req.body.carrito;

  res.json({ success: true, carrito: carroski });
});

router.post('/empty-cart-update', (req, res) => {
  console.log('req.session.carrito');
  console.log(req.session.carrito);

  // req.session.carrito = [];
  let carroski = req.session.carrito;
  res.json({ success: true, carrito: carroski });
});


//ENVIO WSP
router.post("/articulos/enviarpedidowsp", enviarpedido);

export default router;
