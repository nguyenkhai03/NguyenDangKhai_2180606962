const User = require("../models/User");

// Create
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all
exports.getUsers = async (req, res) => {
  try {
    const { username, fullName } = req.query;
    let query = { isDelete: false };

    if (username) query.username = { $regex: username, $options: "i" };
    if (fullName) query.fullName = { $regex: fullName, $options: "i" };

    const users = await User.find(query).populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user || user.isDelete) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username, isDelete: false }).populate("role");
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft Delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isDelete: true }, { new: true });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Activate User
exports.activateUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username, isDelete: false });
    if (!user) return res.status(404).json({ error: "Invalid information" });

    user.status = true;
    await user.save();

    res.json({ message: "User activated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
