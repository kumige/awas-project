const contentDiv = document.getElementById("content");
const toolbar = document.getElementById("toolbar");
const apiUrl = "http://localhost:3000";

let noteData;

const formSubmit = (e) => {
  e.preventDefault();
  postData(`${apiUrl}/notes/setnotes`);
};

const loadData = () => {
  var dataElement = document.getElementById("content");

  getData(`${apiUrl}/notes/getnotes`).then((data) => {
    console.log("data", data);
    if (data == "Unauthorized") {
      window.location.href = "http://localhost:3000";
    } else {
      var response = JSON.parse(data);
      response.forEach((item) => {
        createNote(item.note, dataElement);
      });
      if(response.length > 0) {
        const loggedInAs = document.createElement('span')
        loggedInAs.innerText = `Logged in as ${response[0].username}`
        toolbar.appendChild(loggedInAs)
      }
      
    }
  });
};

const createNote = (note, parent) => {
  const div = document.createElement("div");  
  const p = document.createElement("p");
  p.innerText = note

  div.setAttribute("class", "note")
  p.setAttribute("class", "noteText")

  div.appendChild(p)
  console.log(div)

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

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json();
};

const logOut = (e) => {
  e.preventDefault()

  localStorage.removeItem('token')
  window.location.href = apiUrl
}

loadData();
