const contentDiv = document.getElementById("content");
const toolbar = document.getElementById("toolbar");
const apiUrl = "http://localhost:3000";

let noteData;

const loadData = () => {
  var dataElement = document.getElementById("content");

  getData(`${apiUrl}/admin/getnotes`).then((data) => {
    if (data == "Unauthorized") {
      window.location.href = "http://localhost:3000/notes";
    } else {
      var response = JSON.parse(data);
      response.forEach((item) => {
        createNote(item, dataElement);
      });
      if (response.length > 0) {
        const loggedInAs = document.createElement("span");
        loggedInAs.innerText = `Logged in as ${response[0].username}`;
        toolbar.appendChild(loggedInAs);
      }
    }
  });
};

const createNote = (note, parent) => {
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  const p = document.createElement("p");
  p.innerHTML = note.note;
  p1.innerHTML = note.username;

  div.setAttribute("class", "note");
  p.setAttribute("class", "noteText");
  p1.setAttribute("style", "font-weight: bold;");

  div.appendChild(p1);
  div.appendChild(p);

  parent.append(div);
};

async function getData(apiUrl) {
  const response = await fetch(apiUrl, {
    method: "get",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.text(); // parses JSON response into native JavaScript objects
}

const logOut = (e) => {
  e.preventDefault();

  localStorage.removeItem("token");
  window.location.href = apiUrl;
};

loadData();
