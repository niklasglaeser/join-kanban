let currentContact = [];
let mobileStatus = false;
let resizeTimer;
let innerWidth = window.innerWidth;

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
    name: contact.value,
    initial: getInitial(contact.value),
    initial_color: getInitialColor(),
    email: email.value,
    phone: phone.value,
  });
  await setItem("users", JSON.stringify(users));
  currentContact = contact.value;
  resetForm();
  toogleInfo("Contact was created");
  renderContact();
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
  name.value = "";
  email.value = "";
  phone.value = "";
}

function getInitialColor() {
  let randomColor = Math.floor(Math.random() * AVATAR_COLORS.length);
  return AVATAR_COLORS[randomColor];
}

async function renderContact() {
  let contactList = document.getElementById("contact-list");
  let contactYou = document.getElementById("contactYou");
  contactList.innerHTML = "";
  sortContacts();

  let currentSign = null;
  contactYou.innerHTML = generateCardYouHTML(activeUserId);

  for (let i = 0; i < contacts.length; i++) {
    let currentContact = contacts[i];
    let firstLetter = currentContact.name.charAt(0).toUpperCase();

    if (currentSign !== firstLetter) {
      generateHeadline(i, firstLetter);
      currentSign = firstLetter;
    }
    generateCard(i, currentContact, firstLetter);
  }
}

function sortContacts() {
  contacts.sort(function (a, b) {
    return a.name.charAt(0).localeCompare(b.name.charAt(0));
  });
}

function getIdFromContact(currentContact) {
  return contacts.findIndex((obj) => obj.name == `${currentContact}`);
}

function generateHeadline(i, letter) {
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML += generateHeadlineHTML(letter);
}

function generateCard(i, contact, firstLetter) {
  let card = document.getElementById(firstLetter);
  card.innerHTML += generateCardHTML(i, contact);
}

function generateUserDetails(i, array) {
  console.log(array);
  let details = document.getElementById("contactDetails");
  let contactRight = document.getElementById("contact-right");
  if (array) {
    let contact = users[i];
    details.innerHTML = "";
    details.innerHTML = generateUserDetailsHTML(i, contact, array);
  } else {
    let contact = activeUser["contacts"][i];
    details.innerHTML = "";
    details.innerHTML = generateUserDetailsHTML(i, contact);
  }

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
  let contact = activeUser["contacts"][i];
  editContact.innerHTML = "";
  editContact.innerHTML = generateEditCardHTML(i, contact);
}

async function saveEdit(i) {
  let newUser = document.getElementById(`contact${i}`).value;
  let newEmail = document.getElementById(`email${i}`).value;
  let newPhone = document.getElementById(`phone${i}`).value;
  let currentInitialColor = contacts[i].initial_color;

  contacts.splice(i, 1, {
    name: newUser,
    initial: getInitial(newUser),
    initial_color: currentInitialColor,
    email: newEmail,
    phone: newPhone,
  });

  await setItem("users", JSON.stringify(users));
  currentContact = newUser;
  toogleInfo("Contact was edited");
  renderContact();
  generateUserDetails(getIdFromContact(currentContact));
  setCardActive(getIdFromContact(currentContact));
  togglePopupEdit(i);
}

async function deleteUser(id) {
  contacts.splice(id, 1);
  await setItem("users", JSON.stringify(users));
  await init();
  generateUserDetails(0);
  setCardActive(0);
}
