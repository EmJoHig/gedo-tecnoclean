import { Int32 } from "mongodb";
import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    cuit: {
      type: String,
      required: true,
      // default: 0,
    },
    domicilio: { 
      type: String,
      required: true,
    },
    // iva: {
    //   type: String,
    //   required: true,
    //   // default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cliente", ClienteSchema);
