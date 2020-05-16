var express = require("express");
var router = express.Router();
const path = require("path");
const db = require(path.resolve("db/users.json"));
const authController = require("../../controllers/authController");

// frontend
router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/notes/notes.html"));
});

router.get(
  "/getnotes",
  authController.passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log('req.user', req.user)

    let noteArray = [];
    db.notes.forEach((note) => {
      if (note.username == req.user) {
        noteArray.push(note);
      }
    });
    res.send(JSON.stringify(noteArray));
  }
);

/*
router.post("/", (req, res) => {
  
});
*/

module.exports = router;
