import express from "express";
import Component from "../models/Component.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newComponent = new Component(req.body);
    await newComponent.save();
    res.status(201).json(newComponent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ error: "Componente no encontrado" });
    res.json(component);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updated = await Component.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Componente no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Component.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Componente no encontrado" });
    res.json({ message: "Componente eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
