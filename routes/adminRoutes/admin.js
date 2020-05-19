var express = require("express");
var router = express.Router();
const path = require("path");
const db = require(path.resolve("db/users.json"));
const authController = require("../../controllers/authController");

// frontend
router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/admin/admin.html"));
});

router.get(
  "/getnotes",
  authController.passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const currentUser = db.users.filter((x) => x.username === req.user);
    console.log(currentUser[0].admin);
    if (currentUser[0].admin) {
      //console.log('req.user', req.user)
      res.send(JSON.stringify(db.notes));
    } else {
      res.send("Unauthorized");
    }
  }
);

module.exports = router;
