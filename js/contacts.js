// let contacts = [];
// let users = [];
let currentContact = [];
let mobileStatus = false;
let resizeTimer;
let innerWidth = window.innerWidth;
// const ACTIVEPATH = window.location.pathname;

async function init() {
  // await includeHTML();
  // await loadcontacts();
  await renderContact();
  await checkWindowSize();
  // activeLink();
}

async function loadcontacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.warn("User konnten nicht geladen werden ");
  }
}

// function activeLink() {
//   let activeLinks = document.querySelectorAll("nav a, footer a");

//   if (ACTIVEPATH == "/") {
//     activeLinks[0].classList.add("active");
//   } else {
//     for (let i = 0; i < activeLinks.length; i++) {
//       let link = activeLinks[i];
//       if (link.href.includes(ACTIVEPATH)) {
//         link.classList.add("active");
//       }
//     }
//   }
// }

async function checkWindowSize() {
  innerWidth = window.innerWidth;
  if (innerWidth < 990) {
    mobileStatus = true;
  } else {
    mobileStatus = false;
    generateUserDetailsClose();
  }
}

window.onresize = function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(checkWindowSize, 450);
};

async function addContact() {
  contacts.push({
    contact: contact.value,
    initial: getInitial(contact.value),
    initial_color: getInitialColor(),
    email: email.value,
    phone: phone.value,
  });
  await setItem("contacts", JSON.stringify(contacts));
  currentContact = contact.value;
  resetForm();
  toogleInfo("Contact was created");
  generateUserDetails(getIdFromContact(currentContact));
  setCardActive(getIdFromContact(currentContact));
}

function getInitial(username) {
  let name = username.split(" ");
  let initial = name[1]
    ? (name[0][0] + name[1][0]).toUpperCase()
    : name[0][0].toUpperCase();
  return initial;
}

function resetForm() {
  contact.value = "";
  email.value = "";
  phone.value = "";
}

function getInitialColor() {
  let randomColor = Math.floor(Math.random() * AVATAR_COLORS.length);
  return AVATAR_COLORS[randomColor];
}

async function renderContact() {
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";
  sortContacts();

  let currentSign = null;
  for (let i = 0; i < contacts.length; i++) {
    let currentContact = contacts[i];
    let firstLetter = currentContact.contact.charAt(0).toUpperCase();

    if (currentSign !== firstLetter) {
      generateHeadline(i, firstLetter);
      currentSign = firstLetter;
    }
    generateCard(i, currentContact, firstLetter);
  }
}

function sortContacts() {
  contacts.sort(function (a, b) {
    return a.contact.charAt(0).localeCompare(b.contact.charAt(0));
  });
}

function getIdFromContact(currentContact) {
  return contacts.findIndex((obj) => obj.contact == `${currentContact}`);
}

function generateHeadline(i, letter) {
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML += generateHeadlineHTML(letter);
}

function generateCard(i, contact, firstLetter) {
  let card = document.getElementById(firstLetter);
  card.innerHTML += generateCardHTML(i, contact);
}

function generateUserDetails(i) {
  let details = document.getElementById("contactDetails");
  let contactRight = document.getElementById("contact-right");
  let contact = contacts[i];
  details.innerHTML = "";
  details.innerHTML = generateUserDetailsHTML(i, contact);

  if (mobileStatus) {
    contactRight.style.display = "block";
    contactRight.style.position = "absolute";
  }
}

function generateUserDetailsClose() {
  let contactRight = document.getElementById("contact-right");
  contactRight.style.display = "";
  contactRight.style.position = "";
}

function setCardActive(i) {
  let allContactNames = document.querySelectorAll(".contactNameWrapperActive");
  if (window.innerWidth > 990) {
    for (let j = 0; j < allContactNames.length; j++) {
      allContactNames[j].classList.remove("contactNameWrapperActive");
    }
    let activeContact = document.getElementById(`contactId${i}`);
    if (activeContact) {
      activeContact.classList.add("contactNameWrapperActive");
    }
  }
}

function togglePopup() {
  let overlay = document.getElementById("overlay");
  let popup = document.getElementById("popup");

  if (popupVisible(overlay, popup)) {
    hidePopup(overlay, popup);
  } else {
    showPopup(overlay, popup);
  }
}

function popupVisible(overlay, popup) {
  return (
    overlay.classList.contains("overlay-show") &&
    popup.classList.contains("popup-slideIn")
  );
}

function hidePopup(overlay, popup) {
  overlay.classList.remove("overlay-show");
  overlay.classList.add("d-none");
  popup.classList.remove("popup-slideIn");
}

function showPopup(overlay, popup) {
  overlay.classList.add("overlay-show");
  overlay.classList.remove("d-none");
  popup.classList.add("popup-slideIn");
}

function togglePopupEdit(i) {
  let overlay = document.getElementById("overlay");
  let popupEdit = document.getElementById("popupEdit");

  if (popupVisible(overlay, popupEdit)) {
    hidePopup(overlay, popupEdit);
  } else {
    showPopup(overlay, popupEdit);
    generateEditCard(i);
  }
}

function toogleInfo(message) {
  let info = document.getElementById("info");
  info.innerHTML = `<div class="infoButton">${message}</div>`;
  info.classList.add("info-slideIn");
  setTimeout(() => {
    info.classList.remove("info-slideIn");
  }, 2000);
}

function toogleDeleteWarn(i) {
  let info = document.getElementById("info");
  info.innerHTML = toogleDeleteWarnHTML(i);
  info.classList.add("info-slideIn");
}

function toogleInfoEditMobile() {
  let editPopup = document.getElementById("edit-more");
  let popupHelper = document.getElementById("popupHelper");

  if (editPopup.classList.contains("edit-more-slideIn")) {
    editPopup.classList.remove("edit-more-slideIn");
    popupHelper.classList.add("d-none");
  } else {
    popupHelper.classList.remove("d-none");
    editPopup.classList.add("edit-more-slideIn");
  }
}

function confirmDeleteUser(i) {
  deleteUser(i);
  info.classList.remove("info-slideIn");
  hidePopup(overlay, popupEdit);
}

function cancelDelete() {
  let info = document.getElementById("info");
  info.classList.remove("info-slideIn");
}

function generateEditCard(i) {
  let editContact = document.getElementById("editContact");
  let contact = contacts[i];
  editContact.innerHTML = "";
  editContact.innerHTML = generateEditCardHTML(i, contact);
}

async function saveEdit(i) {
  let newUser = document.getElementById(`contact${i}`).value;
  let newEmail = document.getElementById(`email${i}`).value;
  let newPhone = document.getElementById(`phone${i}`).value;
  let currentInitialColor = contacts[i].initial_color;

  contacts.splice(i, 1, {
    contact: newUser,
    initial: getInitial(newUser),
    initial_color: currentInitialColor,
    email: newEmail,
    phone: newPhone,
  });

  await setItem("contacts", JSON.stringify(contacts));
  currentContact = newUser;
  toogleInfo("Contact was edited");
  renderContact();
  generateUserDetails(getIdFromContact(currentContact));
  setCardActive(getIdFromContact(currentContact));
  togglePopupEdit(i);
}

async function deleteUser(id) {
  contacts.splice(id, 1);
  await setItem("contacts", JSON.stringify(contacts));
  await init();
  generateUserDetails(0);
}

// async function includeHTML() {
//   let includeElements = document.querySelectorAll("[w3-include-html]");
//   for (let i = 0; i < includeElements.length; i++) {
//     const element = includeElements[i];
//     file = element.getAttribute("w3-include-html");
//     let resp = await fetch(file);
//     if (resp.ok) {
//       element.innerHTML = await resp.text();
//     } else {
//       element.innerHTML = "Page not found";
//     }
//   }
// }