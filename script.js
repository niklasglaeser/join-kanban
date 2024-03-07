/**
 * Array to store user data.
 * @type {Array}
 */
let users = [];

/**
 * Array to store contact data.
 * @type {Array}
 */
let contacts = [];

/**
 * Array to store task data.
 * @type {Array}
 */
let tasks = [];

/**
 * ID of the active user retrieved from local storage.
 * @type {string}
 */
let activeUserId = JSON.parse(localStorage.getItem("activeUser"));

/**
 * Details of the active user.
 * @type {string}
 */
let activeUser = "";

/**
 * Login status from local storage.
 * @type {boolean}
 */
let checkLogin = JSON.parse(localStorage.getItem("checkLogin"));

/**
 * Current path of the page.
 * @constant {string}
 */
const ACTIVEPATH = window.location.href;

/**
 * Init the page and loading users
 */
async function init() {
  await loadUsers();
  await includeHTML();

  prepareSummaryPage();
  prepareAddtaskPage();
  prepareBoardPage();
  prepareContactsPage();
  preparePrivacyPage();
  prepareLegalPage();
  prepareHelpPage();
}

/**
 * Checks if a registered user is logged in.
 * @returns {Promise<void>} A promise that resolves if a registered user is logged in, and rejects otherwise.
 */
async function checkRegUser() {
  return new Promise((resolve, reject) => {
    let backgroundNotLogin = document.getElementById("backgroundNotLogin");
    if (!checkLogin) {
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 5000);
      backgroundNotLogin.classList.remove("d-none");
      reject();
    } else {
      resolve();
    }
  });
}

/**
 * Includes HTML files into the document based on the elements with the attribute 'w3-include-html'.
 * @returns {Promise<void>} A promise that resolves when all HTML files are successfully included, or rejects if any file is not found.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * set 'active' class to the navigation and footer links based on the current active path.
 */
function activeLink() {
  let activeLinks = document.querySelectorAll("nav a, footer a");

  if (ACTIVEPATH == "/") {
    activeLinks[0].classList.add("active");
  } else {
    for (let i = 0; i < activeLinks.length; i++) {
      let link = activeLinks[i];
      if (link.href.includes(ACTIVEPATH)) {
        link.classList.add("active");
      }
    }
  }
}

/**
 * Loads users and tasks data from remote storage and sets the active user.
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
    tasks = JSON.parse(await getItem("tasks"));
    getActiveUser();
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Retrieves the active user from the 'users' array based on the 'activeUserId'.
 * @returns {Object} The active user object.
 */
async function getActiveUser() {
  activeUser = users[activeUserId];
  return activeUser;
}

/**
 * Sets the active user's name on summary page
 */
function setActiveUsername() {
  let user = document.getElementById("setActiveUsername");
  let userMobil = document.getElementById("setActiveUsernameMobil");
  user.innerHTML = "";
  user.innerHTML = activeUser["name"];
  userMobil.innerHTML = activeUser["name"];
}

/**
 * Sets the active user's initial in header.
 */
function setActiveInitial() {
  let userProfile = document.getElementById("userProfile");
  userProfile.innerHTML = "";
  userProfile.innerHTML = activeUser["initial"];
}

/**
 * Prepares loading  summary page
 *
 */
async function prepareSummaryPage() {
  if (ACTIVEPATH.includes("summary.html")) {
    try {
      await checkRegUser();
      await activeLink();
      await welcomeMessage();
      await setActiveUsername();
      await setActiveInitial();
      await loadOpenTodos();
      await taskUrgentDeadline();
    } catch {}
  }
}

/**
 * Prepares loading  addtask page
 *
 */
async function prepareAddtaskPage() {
  if (ACTIVEPATH.includes("addtask.html")) {
    try {
      await checkRegUser();
      await setActiveInitial();
      await activeLink();
      await renderAssignmentContacts(users);
    } catch {}
  }
}

/**
 * Prepares loading  board page
 *
 */
async function prepareBoardPage() {
  if (ACTIVEPATH.includes("board.html")) {
    try {
      await checkRegUser();
      await setActiveInitial();
      await activeLink();
      await updateHTML();
      await renderAssignmentContacts(users);
    } catch {}
  }
}

/**
 * Prepares loading  contacts page
 *
 */
async function prepareContactsPage() {
  if (ACTIVEPATH.includes("contacts.html")) {
    try {
      await checkRegUser();
      await renderContact();
      await activeLink();
      await setActiveInitial();
      await checkWindowSize();
    } catch {}
  }
}

/**
 * Prepares loading  privacy page
 *
 */
function preparePrivacyPage() {
  if (ACTIVEPATH.includes("privacypolicy.html")) {
    setActiveInitial();
    activeLink();
  }
}

/**
 * Prepares loading  legal page
 *
 */
function prepareLegalPage() {
  if (ACTIVEPATH.includes("legalnotice.html")) {
    setActiveInitial();
    activeLink();
  }
}

/**
 * Prepares loading  help page
 *
 */
function prepareHelpPage() {
  if (ACTIVEPATH.includes("help.html")) {
    setActiveInitial();
    activeLink();
  }
}

/**
 * set guestUser index grom users array
 */
async function guestLogin() {
  await localStorage.setItem("checkLogin", JSON.stringify(true));
  await localStorage.setItem("activeUser", JSON.stringify(0));
  window.location.href = "pages/summary.html";
}

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
    passwordIcon.onclick = function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.src = "img/hide-password-icon.svg";
      } else {
        passwordInput.type = "password";
        passwordIcon.src = "img/show-password-icon.svg";
      }
    };
  }

  passwordInput.addEventListener("input", function () {
    if (passwordInput.type === "text" && passwordInput.value.trim() !== "") {
      passwordIcon.src = "img/hide-password-icon.svg";
    }
  });
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
function comparePasswords(
  passwordInputId,
  confirmPasswordInputId,
  errorMessageId
) {
  let passwordInput = document.getElementById(passwordInputId);
  let confirmPasswordInput = document.getElementById(confirmPasswordInputId);
  let errorMessage = document.getElementById(errorMessageId);

  if (confirmPasswordInput.value.trim() === "") {
    errorMessage.innerHTML = "";
    return false;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage.innerHTML = "Ups! your password don't match";
    return false;
  } else {
    errorMessage.innerHTML = "";
    return true;
  }
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

  if (event.target !== userProfile && event.target !== dropdownContent) {
    dropdownContent.style.display = "none";
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
