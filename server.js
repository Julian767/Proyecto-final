import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});


const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Item = mongoose.model("Item", itemSchema);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const componentSchema = new mongoose.Schema({
  type: String,
  name: String,
  manufacturer: String,
  specs: Object,
  price: Number,
  imageUrl: String,
});
const Component = mongoose.model("Component", componentSchema);

const buildSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  components: [
    {
      component: { type: mongoose.Schema.Types.ObjectId, ref: "Component" },
      quantity: Number,
    },
  ],
  totalPrice: Number,
});
const Build = mongoose.model("Build", buildSchema);


app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
app.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item no encontrado" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Item no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item no encontrado" });
    res.json({ message: "Item eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post("/api/components", async (req, res) => {
  try {
    const newComponent = new Component(req.body);
    await newComponent.save();
    res.status(201).json(newComponent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/components", async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/components/:id", async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ error: "Componente no encontrado" });
    res.json(component);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

app.put("/api/components/:id", async (req, res) => {
  try {
    const updated = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Componente no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/components/:id", async (req, res) => {
  try {
    const deleted = await Component.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Componente no encontrado" });
    res.json({ message: "Componente eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/builds", async (req, res) => {
  try {
    const newBuild = new Build(req.body);
    await newBuild.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/builds", async (req, res) => {
  try {
    const builds = await Build.find()
      .populate("user", "username email")
      .populate("components.component", "name type price");
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
app.get("/api/builds/:id", async (req, res) => {
  try {
    const build = await Build.findById(req.params.id)
      .populate("user", "username email")
      .populate("components.component", "name type price");
    if (!build) return res.status(404).json({ error: "Build no encontrada" });
    res.json(build);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

app.put("/api/builds/:id", async (req, res) => {
  try {
    const updated = await Build.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("user", "username email")
      .populate("components.component", "name type price");
    if (!updated) return res.status(404).json({ error: "Build no encontrada" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/builds/:id", async (req, res) => {
  try {
    const deleted = await Build.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Build no encontrada" });
    res.json({ message: "Build eliminada" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Conectado a MongoDB");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  });
})
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));
