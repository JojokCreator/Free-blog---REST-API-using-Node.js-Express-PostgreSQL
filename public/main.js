// This is used to decodes the web tokens to get the email address and user name
import { jwtDecode } from "./jwt-decode.js";

const divLogin = document.querySelector(".div-login");
const newPost = document.querySelector(".sidebar");
const pStatus = document.getElementById("login-status");
const logoutBtn = document.getElementById("logout");
const signInBtn = document.getElementById("signInBtn");

const submitButtonPosts = document.querySelector("#submitPost");
const submitButton = document.querySelector("#submitLogin");
const postsSection = document.querySelector("#posts");

submitButton.addEventListener("click", handleSubmit);
submitButtonPosts.addEventListener("click", handleSubmitPost);
logoutBtn.addEventListener("click", deleteToken);

//These are selectors to show or hide UI elements depending if the user is logged in.
let showLoginPanel = (bShow) => {
  bShow ? divLogin.style.display = "flex" : divLogin.style.display = "none";
}
let showNewPostPanel = (bShow) => {
  bShow ? newPost.style.display = "flex" : newPost.style.display = "none";
}
let showLogout = (bShow) => {
  bShow ? logoutBtn.style.display = "flex" : logoutBtn.style.display = "none";
}
let ShowSignIn = (bShow) => {
  bShow ? signInBtn.style.display = "flex" : signInBtn.style.display = "none";
}
// Hides the Logout button and Add a new post panel initially
showLogout(false)
showNewPostPanel(false)

// Checks to see if user is already logged in e.g has an access token
let accessToken = await fetchRefreshToken();
if (accessToken.refreshToken) {
  const jwtDecoded = jwtDecode(accessToken.refreshToken);
  document.querySelector("#user_id").value = jwtDecoded.user_id;
  showLoginPanel(false);
  showNewPostPanel(true)
  showLogout(true)
  ShowSignIn(false)
  getPosts(accessToken.accessToken)
}

//function to generate refresh token
async function fetchRefreshToken(){
  const res = await fetch(`http://localhost:3000/auth/refresh_token`,{
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  });  
  const jsonResponse = await res.json();
  return jsonResponse;
}

// GETS the posts from the server if token is valid
async function getPosts(token) {
  const response = await fetch("http://localhost:3000/posts/", {
  headers: {
    'Authorization': 'Bearer ' + token,
  }
  });
  const data = await response.json();
  const posts = (data.payload)
  posts.forEach(renderPosts)}

//renders the posts on the page
function renderPosts(posts) {
  const article = createPostsView(posts);
  postsSection.appendChild(article);
}

//sets up the layout of the post
function createPostsView({ post_id, post_body, post_title, date }) {
  const article = document.createElement("article");
  const h2 = document.createElement("h2");
  h2.innerText = post_title;
  const p = document.createElement("p");
  p.innerText = post_body;
  const p2 = document.createElement("p2");
  var d = new Date(date);
  p2.innerText = d.toLocaleString() + " - " + post_id ;
  article.appendChild(h2);
  article.appendChild(p);
  article.appendChild(p2);
  return article;
}
//Sign In button handler
function handleSubmit(event) {
    event.preventDefault();
    signIn();
}

//Gets the form data from login page
function gatherFormData() {
  const email = document.querySelector("#email").value
  const password = document.querySelector("#password").value;
  return {
    email,
    password,
  };
}
  
//Sign in function send POST request to get token
async function signIn() {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    credentials:'include',
    cache:'no-cache',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
  if (data.error) {
    pStatus.innerText = data.error;
    return;
  }
  accessToken = data.accessToken
  const jwtDecoded = jwtDecode(accessToken);
  alert(`Login Successful! Your id is ${jwtDecoded.user_id} & Your email is ${jwtDecoded.email}`);
  document.querySelector("#user_id").value = jwtDecoded.user_id;
  
  //sets up the logged in view
  showLoginPanel(false);
  showNewPostPanel(true)
  showLogout(true)
  ShowSignIn(false)
  getPosts(accessToken)
}
console.log(accessToken)
//Runs create a post function
async function handleSubmitPost(event) {
    event.preventDefault();
    if (accessToken.refreshToken){
    createPost(accessToken.accessToken);}
    else {
    createPost(accessToken)
    }
}
  
// The actual create a post function using access token
async function createPost(token) {
    await fetch("http://localhost:3000/posts/", {
    method: "POST",
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gatherPostData()),
  });
  location.reload();
}

//gets the post data from the form
function gatherPostData() {
  const post_title = document.querySelector("#posttitle").value;
  const post_body = document.querySelector("#postbody").value;
  const user_id = document.querySelector("#user_id").value;
  return {
    post_title,
    post_body,
    user_id,
  };
}

//logs the user out Deletes the token
async function deleteToken(){
  const res = await fetch("http://localhost:3000/auth/refresh_token",{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  });  
  location.reload();
  return await res.json();
}