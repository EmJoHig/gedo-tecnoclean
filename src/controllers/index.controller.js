import Articulo from "../models/Articulo.js";
import { isAuthenticated } from "../helpers/auth.js";


export const renderIndex = async (req, res) => {
    const articulos = await Articulo.find().limit(3).lean();
    
    let usuarioLogeado= false;
    if (req.isAuthenticated()) {
      console.log('El usuario está autenticado.');
      usuarioLogeado = true;
    } else {
      console.log('El usuario no está autenticado.');
    }

    res.render("index", { articulos, usuarioLogeado });
};

export const renderAbout = (req, res) => {
  res.render("about");
};
