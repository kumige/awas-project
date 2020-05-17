const registerUrl = "http://localhost:3000/register"

const register = (e) => {
    e.preventDefault()

    const userData = {
        username: document.getElementById('usernameInput').value,
        password: document.getElementById('passwordInput').value
    }

    const req = postData(registerUrl, userData)
    req.then(res => {
        console.log(res)
        if(res == true)  {
            window.location.href = "http://localhost:3000/login"
        }
    })
}

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