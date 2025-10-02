const Role = require("../models/Role");

// Create
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all
exports.getRoles = async (req, res) => {
  try {
    const { name } = req.query;
    let query = { isDelete: false };
    if (name) query.name = { $regex: name, $options: "i" };
    const roles = await Role.find(query);
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || role.isDelete) return res.status(404).json({ error: "Not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) return res.status(404).json({ error: "Not found" });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft Delete
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, { isDelete: true }, { new: true });
    if (!role) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
