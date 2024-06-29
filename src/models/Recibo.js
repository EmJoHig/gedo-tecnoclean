import mongoose from "mongoose";

const ReciboSchema = new mongoose.Schema(
  {
    numeroref: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: { 
      type: Date, 
      default: Date.now, 
    },
    iva: {
      type: String,
      required: true,
    },
    // nombrecli: {
    //   type: String,
    //   required: true,
    // },
    // cuitclie: {
    //   type: String,
    //   required: true,
    // },
    // domiciliocli: {
    //   type: String,
    //   required: true,
    // },

    // user: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recibo", ReciboSchema);
