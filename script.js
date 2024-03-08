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
  if (ACTIVEPATH.includes("privacypolicy.html?extern=yes")) {
    updatePageForExternal();
  } else if (ACTIVEPATH.includes("privacypolicy.html")) {
    setActiveInitial();
    activeLink();
  }
}

/**
 * Prepares loading  legal page
 *
 */
function prepareLegalPage() {
  if (ACTIVEPATH.includes("legalnotice.html?extern=yes")) {
    updatePageForExternal();
  } else if (ACTIVEPATH.includes("legalnotice.html")) {
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