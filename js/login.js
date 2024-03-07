/**
 * check email/password the same in json. set UserId to localStorage
 */
function login() {
  let email = document.getElementById("emailInputLogin");
  let password = document.getElementById("passwordInputLogin");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );

  let errorLogin = document.getElementById("errorLogin");

  if (user) {
    localStorage.setItem("activeUser", JSON.stringify(getUserId(user)));
    localStorage.setItem("checkLogin", JSON.stringify(true));
    window.location.href = "pages/summary.html";
  } else {
    errorLogin.innerHTML = "Email or Password is wrong! Try again.";
  }
}


/**
 * get the index from active User
 * @param {object}
 * @returns index
 */
function getUserId(user) {
  return users.findIndex((u) => u.email === user.email);
}

// function getUserId(user) {
//   let activeUser = user.email;

//   for (let i = 0; i < users.length; i++) {
//     if (users[i].email === activeUser) {
//       return i;
//     }
//   }
// }
