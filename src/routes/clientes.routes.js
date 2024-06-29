// import { Router } from "express";
import pkg from 'express';
const { Router } = pkg;
import {
  renderClienteForm,
  createNewCliente,
  renderClientes,
  renderEditForm,
  updateCliente,
  deleteCliente,
} from "../controllers/clientes.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get("/clientes/alta-cliente", isAuthenticated, renderClienteForm);

router.post("/clientes/nuevo-cliente", isAuthenticated, createNewCliente);

router.get("/clientes", isAuthenticated, renderClientes);

router.get("/clientes/editarCliente/:id", isAuthenticated, renderEditForm);

router.put("/clientes/editarCliente/:id", isAuthenticated, updateCliente);

router.delete("/clientes/eliminarCliente/:id", isAuthenticated, deleteCliente);

export default router;
