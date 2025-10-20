import mongoose from "mongoose";

const buildSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  },

  
  components: [
    {
      component: { type: mongoose.Schema.Types.ObjectId, ref: "Component", required: true },
      quantity: { type: Number, default: 1, min: 1 }
    }
  ],


  totalPrice: { type: Number, default: 0, min: 0 },

  createdAt: { type: Date, default: Date.now }
});


buildSchema.pre("save", function (next) {
  if (this.components && this.components.length > 0) {

  }
  next();
});

export default mongoose.model("Build", buildSchema);
