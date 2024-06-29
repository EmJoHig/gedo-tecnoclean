import Cliente from "../models/Cliente.js";





export const renderClienteForm = (req, res) => res.render("clientes/altaClientePage");

export const createNewCliente = async (req, res) => {
  console.log("req.body");
    console.log(req.body);

  const { nombre, cuit, domicilio } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({ text: "Please Write a nombre." });
  }
  if (!cuit) {
    errors.push({ text: "Please Write a cuit" });
  }
  if (!domicilio) {
    errors.push({ text: "Please Write a domicilio" });
  }
  if (errors.length > 0)
    return res.render("clientes/altaClientePage", {
      errors,
      nombre,
      cuit,
      domicilio,
    });

    console.log("req.body");
    console.log(req.body);

  const newCliente = new Cliente({ nombre, cuit, domicilio });
  await newCliente.save();
  res.redirect("/clientes"); // EN LOS REDIRECT DEBO LLAMAR A LA RUTA QUE ESTA EN routes/clientes.routes.js
};

export const renderClientes = async (req, res) => {
  const clientes = await Cliente.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("clientes/clientesPage", { clientes }); // EN LOS RENDER DEBO LLAMAR A LA RUTA QUE ESTA EN views/clientes/clientesPage.hbs
};

export const renderEditForm = async (req, res) => {
  const cliente = await Cliente.findById(req.params.id).lean();
  res.render("clientes/editarClientePage", { cliente });
};

export const updateCliente = async (req, res) => {
  const { nombre, cuit, domicilio } = req.body;
  await Cliente.findByIdAndUpdate(req.params.id, { nombre, cuit, domicilio });
  req.flash("success_msg", "Cliente Updated Successfully");
  res.redirect("/clientes");
};

export const deleteCliente = async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Cliente Deleted Successfully");
  res.redirect("/clientes");
};
