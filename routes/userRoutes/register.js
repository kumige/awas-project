var express = require("express");
var router = express.Router();
const path = require("path");
const db = require(path.resolve("db/users.json"));
const authController = require("../../controllers/authController");
const dbController = require("../../controllers/dbController");

// frontend
router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/register/register.html"));
});

router.post(
  "/",
  (req, res) => {
      if(req.body.username != null && req.body.password != null) {
        const dbResponse = dbController.registerUser(req.body)
        dbResponse.then(data => {
            console.log("db res", data)
            if(data === true) {
                res.send(JSON.stringify(data));
            } else {
                errorHandler(res, "user already exists")
            }
        })
        
      } else {
          errorHandler(res, "invalid parameters")
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
