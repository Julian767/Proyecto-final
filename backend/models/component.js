import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    type: {
      type: String,
      enum: ["CPU", "GPU", "RAM", "Storage", "Motherboard", "PSU", "Case"],
      required: true,
    },

    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Evita error de modelo duplicado en hot-reload (nodemon)
export default mongoose.models.Component || mongoose.model("Component", componentSchema);
