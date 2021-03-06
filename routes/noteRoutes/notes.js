var express = require("express");
var router = express.Router();
const path = require("path");
const db = require(path.resolve("db/users.json"));
const authController = require("../../controllers/authController");
const dbController = require("../../controllers/dbController");

// frontend
router.get("/", (req, res) => {
  res.sendFile(path.resolve("public/notes/notes.html"));
});

router.get(
  "/getnotes",
  authController.passport.authenticate("jwt", { session: false }),
  (req, res) => {

    let noteArray = [];
    db.notes.forEach((note) => {
      if (note.username == req.user) {
        noteArray.push(note);
      }
    });
    res.send(JSON.stringify(noteArray));
  }
);

router.post(
  "/setnotes",
  authController.passport.authenticate("jwt", { session: false }),
  (req, res) => {

    // !!!!!!!!!!!!!!!!!!! CHECK IF HAS ONLY SPACES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (req.body.notes !== null && req.body.notes !== "") {
      dbController.addNote(req.body.notes, req.user);
    } else {
      errorHandler(res, "Note can not be empty");
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

/*
router.post("/", (req, res) => {
  
});
*/

module.exports = router;
