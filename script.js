let users = [];
let contacts = [];
let tasks = [
  {
    id: 0,
    title: "Einkauf erledigen",
    description: "Besorge Lebensmittel und andere benötigte Artikel",
    assignedTo: ["NG", "NG", "ME", "GU", "SM", "XG", "AG", "TZ", "XI"],
    initial_color: [
      "#FC71FF",
      "#FF5EB3",
      "#6E52FF",
      "#9327FF",
      "#00BEE8",
      "#00BEE8",
      "#FF745E",
      "#FFA35E",
      "#FC71FF",
    ],
    dueDate: "2024-02-20",
    prio: "low",
    category: "Hausarbeit",
    subtask: ["Mehl"],
    subtaskdone: ["Wasser", "Bier", "Pizza"],
    progress: "todo",
  },
  {
    id: 1,
    title: "Auto waschen",
    description: "Reinige das Auto gründlich von außen und innen",
    assignedTo: ["NG", "NG", "ME"],
    initial_color: [""],
    dueDate: "2024-02-20",
    prio: "urgent",
    category: "Hausarbeit",
    subtask: [],
    subtaskdone: [],
    progress: "todo",
  },
  {
    id: 2,
    title: "Dokumente sortieren",
    description: "Sortiere wichtige Dokumente und Papiere",
    assignedTo: ["NG", "NG", "ME"],
    initial_color: [""],
    dueDate: "2024-02-20",
    prio: "low",
    category: "Organisation",
    subtask: [],
    subtaskdone: [],
    progress: "done",
  },
  {
    id: 3,
    title: "Sport treiben",
    description: "Mache eine halbe Stunde lang Sportübungen",
    assignedTo: ["NG", "NG", "ME"],
    initial_color: [""],
    dueDate: "2024-02-20",
    prio: "medium",
    category: "Gesundheit",
    subtask: [],
    subtaskdone: [],
    progress: "inProgress",
  },
  {
    id: 4,
    title: "Geburtstagsgeschenk kaufen",
    description: "Besorge ein Geschenk für den bevorstehenden Geburtstag",
    assignedTo: ["NG", "NG", "ME"],
    initial_color: [""],
    dueDate: "2024-02-20",
    prio: "urgent",
    category: "Einkauf",
    subtask: [],
    subtaskdone: [],
    progress: "awaitFeedback",
  },
  {
    id: 5,
    title: "Rechnungen bezahlen",
    description:
      "Bezahle ausstehende Rechnungen und Überprüfe den Zahlungsstatus",
    assignedTo: ["NG", "NG", "ME", "GH"],
    initial_color: [""],
    dueDate: "2024-02-20",
    prio: "medium",
    category: "Finanzen",
    subtask: [],
    subtaskdone: [],
    progress: "todo",
  },
];

let activeUserId = JSON.parse(localStorage.getItem("activeUser"));
let activeUser = "";

const ACTIVEPATH = window.location.href;

async function init() {
  console.log("%cJoin by GROUP28", "color:blue; font-size:24px");
  await includeHTML();
  await activeLink();
  await loadUsers();

  prepareSummaryPage();
  prepareAddtaskPage();
  prepareBoardPage();
  prepareContactsPage();
}

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
    // tasks = JSON.parse(localStorage.getItem("tasks"));
    // tasks = JSON.parse(await getItem("tasks"));
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
  user.innerHTML = "";
  user.innerHTML = activeUser["name"];
}

function setActiveInitial() {
  let userProfile = document.getElementById("userProfile");
  userProfile.innerHTML = "";
  userProfile.innerHTML = activeUser["initial"];
}

function prepareSummaryPage() {
  if (ACTIVEPATH.includes("summary.html")) {
    welcomeMessage();
    setActiveUsername();
    setActiveInitial();
  }
}

function prepareAddtaskPage() {
  if (ACTIVEPATH.includes("addtask.html")) {
    setActiveInitial();
    renderAssignmentContacts(users);
  }
}

function prepareBoardPage() {
  if (ACTIVEPATH.includes("board.html")) {
    setActiveInitial();
    updateHTML();
  }
}

function prepareContactsPage() {
  contacts = activeUser["contacts"];

  if (ACTIVEPATH.includes("contacts.html")) {
    renderContact();
    setActiveInitial();
    checkWindowSize();
  }
}

function guestLogin() {
  localStorage.setItem("activeUser", JSON.stringify(0));
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
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage.innerHTML = "Ups! your password don't match";
  } else {
    errorMessage.innerHTML = "";
  }
}

async function deleteAllUser() {
  users.splice(0, users.length);
  await setItem("users", JSON.stringify(users));
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
