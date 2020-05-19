var express = require("express");
var router = express.Router();
const path = require("path");
const login = require("./userRoutes/login");
const register = require("./userRoutes/register");
const notes = require("./noteRoutes/notes");
const admin = require("./adminRoutes/admin");

//backend
router.use("/login", login);
router.use("/register", register);
router.use("/notes", notes);
router.use("/admin", admin);

//frontend
router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

module.exports = router;
