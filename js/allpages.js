/**
 * open SignUp Form
 */
function openSignUpForm() {
  let loginForm = document.getElementById("loginContainer");
  let signUpForm = document.getElementById("signUpContainer");

  loginForm.style.display = "none";
  signUpForm.style.display = "flex";
}


/**
 * close signup form
 */
function closeSignUpForm() {
  let loginForm = document.getElementById("loginContainer");
  let signUpForm = document.getElementById("signUpContainer");

  loginForm.style.display = "flex";
  signUpForm.style.display = "none";
}


/**
 * Changes the password input field's icon based on its value and toggles the visibility of the password.
 * Also updates the password icon when the input value changes.
 * @param {string} inputId - The id of the password input field.
 * @param {string} iconId - The id of the password icon element.
 */
function changePasswordIcon(inputId, iconId) {
  let passwordInput = document.getElementById(inputId);
  let passwordIcon = document.getElementById(iconId);

  if (passwordInput.value.trim() === "") {
    passwordIcon.src = "img/lock.svg";
  } else {
    passwordIcon.src = "img/show-password-icon.svg";
    passwordIcon.onclick = function() {
      togglePasswordVisibility(passwordInput, passwordIcon);
    };
  }

  passwordInput.addEventListener("input", function() {
    if (passwordInput.type === "text" && passwordInput.value.trim() !== "") {
      passwordIcon.src = "img/hide-password-icon.svg";
    }
  });
}


/**
 * toggle password icon for visibility passwort
 * @param {*} passwordInput 
 * @param {*} passwordIcon 
 */
function togglePasswordVisibility(passwordInput, passwordIcon) {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.src = "img/hide-password-icon.svg";
  } else {
    passwordInput.type = "password";
    passwordIcon.src = "img/show-password-icon.svg";
  }
}


/**
 * Compares two password input fields to check if they match.
 * If the confirmation password field is empty, no error message is displayed.
 * If the passwords don't match, an error message is displayed.
 * @param {string} passwordInputId - The id of the password input field.
 * @param {string} confirmPasswordInputId - The id of the confirm password input field.
 * @param {string} errorMessageId - The id of the element where error message should be displayed.
 * @returns {boolean} - Returns true if passwords match, otherwise false.
 */
function comparePasswords(passwordInputId, confirmPasswordInputId, errorMessageId) {
  let passwordInput = document.getElementById(passwordInputId);
  let confirmPasswordInput = document.getElementById(confirmPasswordInputId);
  let errorMessage = document.getElementById(errorMessageId);

  let passwordsMatch = passwordInput.value === confirmPasswordInput.value;
  errorMessage.innerHTML = passwordsMatch ? "" : "Ups! Your passwords don't match";

  return confirmPasswordInput.value.trim() !== "" && passwordsMatch;
}


/**
 * Deletes all users from the users array and updates the remote storage.
 * @returns {Promise<void>}
 */
async function deleteAllUser() {
  users.splice(0, users.length);
  await setItem("users", JSON.stringify(users));
}


/**
 * Deletes a single user from the users array at the specified index and updates the remote storage.
 * @param {number} x - The index of the user to be deleted.
 */
async function deleteOneUser(x) {
  users.splice(x, 1);
  await setItem("users", JSON.stringify(users));
}


/**
 * Deletes all tasks from the tasks array and updates the remote storage.
 */
async function deleteAllTasks() {
  tasks.splice(0, tasks.length);
  await setItem("tasks", JSON.stringify(tasks));
}


/**
 * Deletes a single task from the tasks array at the specified index, updates the remote storage, toogle  popup.
 * @param {number} index - The index of the task to be deleted.
 */
async function deleteOneTask(index) {
  tasks.splice(index, 1);
  await setItem("tasks", JSON.stringify(tasks));
  await updateHTML();
  togglePopup();
}


/**
 * Deletes all contacts from the contacts array and updates the remote storage.
 */
async function deleteAllContacts() {
  contacts.splice(0, contacts.length);
  await setItem("contacts", JSON.stringify(contacts));
}


/**
 * Toggles the dropdown popup.
 */
function toggleDropdown() {
  let dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "flex") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "flex";
  }
}


/**
 * close the dropdown popup.
 * @param {MouseEvent} event - The click event object.
 */
document.addEventListener("click", function (event) {
  let userProfile = document.getElementById("userProfile");
  let dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent && userProfile) {
    if (event.target !== userProfile && event.target !== dropdownContent) {
      dropdownContent.style.display = "none";
    }
  }
});


/**
 * Logout the user by removing userdata from remote storage and redirecting to the index page.
 */
function logout() {
  window.location.href = "./index.html";
  localStorage.removeItem("activeUser");
  localStorage.removeItem("checkLogin");
}

function defaultProgress() {
  progress = "inProgress";
}


/**
 * Redirects the user to the add task page and sets the progress to "inProgress".
 */
function openAddTaskPage() {
  window.location.href = "../pages/addtask.html";
  progress = "inProgress";
}