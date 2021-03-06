const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const apiUrl = "http://localhost:3000/login";

const formSubmit = (e) => {
  e.preventDefault();
  errorMsg.innerText = ""

  if(usernameInput.value.length != 0 && passwordInput.value.length != 0){
    postData(apiUrl, {
      username: usernameInput.value,
      password: passwordInput.value,
    }).then((res) => {
      if(res.status == 'error') {
          handleErrors(res.reason)
      } else {
          localStorage.setItem('token', res.token)
          window.location.href = 'http://localhost:3000/notes'
      }
    });
  } else {
    errorMsg.innerText = "Username and password must not be empty"
  }

  
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json();
};

const handleErrors = (reason) => {
    errorMsg.innerText = reason
}

const redirectToRegister = () => {
  window.location.href = 'http://localhost:3000/register'
}
