const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.post("/", userCtrl.createUser);
router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserById);
router.get("/username/:username", userCtrl.getUserByUsername);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
router.post("/activate", userCtrl.activateUser);

module.exports = router;
