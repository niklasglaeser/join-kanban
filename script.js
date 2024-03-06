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
 * Init the page by loading users and preparing various pages.
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

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
    tasks = JSON.parse(await getItem("tasks"));
    getActiveUser();
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function getActiveUser() {
  activeUser = users[activeUserId];
  return activeUser;
}

function setActiveUsername() {
  let user = document.getElementById("setActiveUsername");
  let userMobil = document.getElementById("setActiveUsernameMobil");
  user.innerHTML = "";
  user.innerHTML = activeUser["name"];
  userMobil.innerHTML = activeUser["name"];
}

function setActiveInitial() {
  let userProfile = document.getElementById("userProfile");
  userProfile.innerHTML = "";
  userProfile.innerHTML = activeUser["initial"];
}

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

function preparePrivacyPage() {
  if (ACTIVEPATH.includes("privacypolicy.html")) {
    setActiveInitial();
    activeLink();
  }
}

function prepareLegalPage() {
  if (ACTIVEPATH.includes("legalnotice.html")) {
    setActiveInitial();
    activeLink();
  }
}

function prepareHelpPage() {
  if (ACTIVEPATH.includes("help.html")) {
    setActiveInitial();
    activeLink();
  }
}

async function guestLogin() {
  await localStorage.setItem("checkLogin", JSON.stringify(true));
  await localStorage.setItem("activeUser", JSON.stringify(0));
  window.location.href = "pages/summary.html";
}

function openSignUpForm() {
  let loginForm = document.getElementById("loginContainer");
  let signUpForm = document.getElementById("signUpContainer");

  loginForm.style.display = "none";
  signUpForm.style.display = "flex";
}

function closeSignUpForm() {
  let loginForm = document.getElementById("loginContainer");
  let signUpForm = document.getElementById("signUpContainer");

  loginForm.style.display = "flex";
  signUpForm.style.display = "none";
}

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

async function deleteAllUser() {
  users.splice(0, users.length);
  await setItem("users", JSON.stringify(users));
}

async function deleteOneUser(x) {
  users.splice(x, 1);
  await setItem("users", JSON.stringify(users));
}

async function deleteAllTasks() {
  tasks.splice(0, tasks.length);
  await setItem("tasks", JSON.stringify(tasks));
}

async function deleteOneTask(index) {
  tasks.splice(index, 1);
  await setItem("tasks", JSON.stringify(tasks));
  await updateHTML();
  togglePopup();
}

async function deleteAllContacts() {
  contacts.splice(0, contacts.length);
  await setItem("contacts", JSON.stringify(contacts));
}

function toggleDropdown() {
  let dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "flex") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "flex";
  }
}

document.addEventListener("click", function (event) {
  let userProfile = document.getElementById("userProfile");
  let dropdownContent = document.getElementById("dropdownContent");

  if (event.target !== userProfile && event.target !== dropdownContent) {
    dropdownContent.style.display = "none";
  }
});

function logout() {
  window.location.href = "./index.html";
  localStorage.removeItem("activeUser");
  localStorage.removeItem("checkLogin");
}


function defaultProgress() {
  progress = "inProgress";
}

function openAddTaskPage() {
  window.location.href = "../pages/addtask.html";
  progress = "inProgress";
}