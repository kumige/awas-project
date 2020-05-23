var express = require("express");
var router = express.Router();
const path = require("path");
const db = require(path.resolve("db/users.json"));
const authController = require("../../controllers/authController");

// frontend
router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/login/login.html"));
});

router.post(
  "/",
  authController.passport.authenticate("local"),
  (req, res) => {
      if(req.user.error != undefined) {
        errorHandler(res, req.user.error)
      } else {
        res.send(req.user);
      }
  }
  
);

const errorHandler = (res, reason) => {
  res.send(`
    {
        "status": "error",
        "reason": "${reason}"
    }
    `);
};

module.exports = router;
