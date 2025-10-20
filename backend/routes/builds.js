import express from "express";
import Build from "../models/Build.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const newBuild = new Build(req.body);
    await newBuild.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const builds = await Build.find()
      .populate("user", "username email")
      .populate("components.component", "name type price");
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const build = await Build.findById(req.params.id)
      .populate("user", "username email")
      .populate("components.component", "name type price");
    if (!build) return res.status(404).json({ error: "Build no encontrada" });
    res.json(build);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updated = await Build.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("user", "username email")
      .populate("components.component", "name type price");
    if (!updated) return res.status(404).json({ error: "Build no encontrada" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Build.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Build no encontrada" });
    res.json({ message: "Build eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
