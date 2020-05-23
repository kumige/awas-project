const db = require("../db/users.json");
const path = require("path");
const fs = require("fs");
let dbSaveSuccess = false;

const registerUser = async (userData) => {
  const userFilter = db.users.filter((x) => x.username === userData.username);

  // Check if username exists
  if (userFilter.length == 0) {
    const userObj = {
      username: userData.username.toString(),
      password: userData.password.toString(),
      admin: userData.admin,
    };

    //const lengthBeforePrepend = db.users.length;
    db.users.push(userObj);

    // Write to json db
    const promise = writeToDB();

    return promise.then((result) => {
      return result;
    });
  } else {
    dbSaveSuccess = false;
    return dbSaveSuccess;
  }
};

const addNote = async (note, user) => {
  db.notes.push({ username: user.toString(), note: note.toString() });

  const promise = writeToDB();

  return promise.then((result) => {
    return result;
  });
};

const writeToDB = () => {
  return (p = new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, "../db/users.json"),
      JSON.stringify(db, null, 2),
      (err) => {
        // if (lengthBeforePrepend < db.users.length && err == null) {
        if (err == null) {
          dbSaveSuccess = true;
          resolve(true);
        } else {
          console.log(err);
          reject(err);
        }
      }
    );
  }));
};

module.exports = {
  registerUser,
  addNote,
};
