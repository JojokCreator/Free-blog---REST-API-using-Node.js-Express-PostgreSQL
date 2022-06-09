const usersSection = document.querySelector("#users");
const getUsersButton = document.querySelector("#get-users");
const submitButton = document.querySelector("button[type='submit']");

submitButton.addEventListener("click", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    signIn();
  }
  
  async function signIn() {
    console.log(gatherFormData());
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      credentials:'include',
      cache:'no-cache',
      headers: { "Content-Type": "application/json" },
      redirect: 'manual',
      body: JSON.stringify(gatherFormData()),
    });
    const data = await response.json();
    let accessToken = data.accessToken;
    window.location.href = 'http://localhost:3000/posts'
  }
  
  function gatherFormData() {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value;
    return {
      email,
      password,
    };
  }