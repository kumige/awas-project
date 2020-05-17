const contentDiv = document.getElementById("content");
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
      dataElement.append(response[0].note);
    }
  });
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

loadData();
