function login() {
  let email = document.getElementById("emailInputLogin");
  let password = document.getElementById("passwordInputLogin");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );

  localStorage.setItem("activeUser", JSON.stringify(getUserId(user)));
  let errorLogin = document.getElementById("errorLogin");

  if (user) {
    window.location.href = "pages/summary.html";
  } else {
    errorLogin.innerHTML = "Email or Password is wrong! Try again.";
  }
}

function getUserId(user) {
  let activeUser = user.email;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === activeUser) {
      return i;
    }
  }
}

function logout() {
  console.log("logout");
  localStorage.removeItem("activeUser");
  window.location.href = "pages/index.html";
}
