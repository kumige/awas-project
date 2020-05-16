const contentDiv = document.getElementById("content");
const apiUrl = "http://localhost:3000";

let noteData;

const loadData = () => {
    getData(`${apiUrl}/notes/getnotes`)
    .then(data => {
      console.log('data', data); 
      if(data == "Unauthorized") {
          window.location.href = "http://localhost:3000"
      }
    });
};

async function getData(apiUrl) {
    
    const response = await fetch(apiUrl, {
      method: 'get', 
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
    });
    return response.text(); // parses JSON response into native JavaScript objects
  }

loadData();
