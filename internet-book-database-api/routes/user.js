const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');

router.get("/", UserController.getUsers)

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.put("/:username", UserController.updateUser)

router.delete("/:id", UserController.deleteUser);

module.exports = router;
