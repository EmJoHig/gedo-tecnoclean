// import { Router } from "express";
import pkg from 'express';
const { Router } = pkg;
import {
  renderReciboForm,
  createNewRecibo,
  renderRecibos,
  renderEditForm,
  updateRecibo,
  deleteRecibo,
  generarPDFRequest,
} from "../controllers/recibos.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// New Recibo
router.get("/recibos/alta-recibos", isAuthenticated, renderReciboForm);

router.post("/recibos/nuevo-recibo", isAuthenticated, createNewRecibo);

// All Recibos
router.get("/recibos", isAuthenticated, renderRecibos);

// Edit Recibos
router.get("/recibos/edit/:id", isAuthenticated, renderEditForm);

router.put("/recibos/edit-Recibo/:id", isAuthenticated, updateRecibo);

// Delete Recibos
router.delete("/recibos/delete/:id", isAuthenticated, deleteRecibo);


// pdf recibos
router.get("/recibos/descargarpdfrecibos", isAuthenticated, generarPDFRequest);

export default router;
