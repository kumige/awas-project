const registerUrl = "http://localhost:3000/register";
const errorMsg = document.getElementById("errorMsg");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

const register = (e) => {
  e.preventDefault();

  if (usernameInput.value.length != 0 && passwordInput.value.length != 0) {
    const userData = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const req = postData(registerUrl, userData);
    req.then((res) => {
      console.log(res);
      if (res == true) {
        window.location.href = "http://localhost:3000/login";
      } else {
        errorMsg.innerText = "Username taken";
      }
    });
  } else {
    errorMsg.innerText = "Username and password must not be empty";
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
