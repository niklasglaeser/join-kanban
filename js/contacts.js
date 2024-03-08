/**
 * Temp array for current contact
 * @type {Array}
 */
let currentContact = [];

/**
 * toggle mobile status.
 * @type {boolean}
 */
let mobileStatus = false;

/**
 * Timer used for handling window resize events.
 * @type {number}
 */
let resizeTimer;

/**
 * Stores the inner width of the window.
 * @type {number}
 */
let innerWidth = window.innerWidth;


/**
 * Check Window size for mobileStatus
 */
async function checkWindowSize() {
  innerWidth = window.innerWidth;
  if (innerWidth < 990) {
    mobileStatus = true;
  } else {
    mobileStatus = false;
    generateUserDetailsClose();
  }
}


/**
 * Function called when the window is resized.
 */
window.onresize = function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(checkWindowSize, 450);
};


/**
 * push new contact to user json - reset form and set new contact to "active"
 */
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


/**
 * get firstletter from username
 * @param {string}
 * @returns
 */
function getInitial(username) {
  let name = username.split(" ");
  let initial = name[1]
    ? (name[0][0] + name[1][0]).toUpperCase()
    : name[0][0].toUpperCase();
  return initial;
}


/**
 * get random color from AVATAR_COLORS array
 * @returns hex farbcode
 */
function getInitialColor() {
  let randomColor = Math.floor(Math.random() * AVATAR_COLORS.length);
  return AVATAR_COLORS[randomColor];
}


/**
 * reset input form
 */

function resetForm() {
  contact.value = "";
  email.value = "";
  phone.value = "";
}


/**
 * sort and render contactlist with firstletter headline
 */
async function renderContact() {
  contacts = activeUser["contacts"];
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";
  sortContacts();

  let currentSign = null;

  for (let i = 0; i < contacts.length; i++) {
    let currentContact = contacts[i];
    let firstLetter = currentContact.name.charAt(0).toUpperCase();

    if (currentSign !== firstLetter) {
      generateHeadline(firstLetter);
      currentSign = firstLetter;
    }
    generateCard(i, currentContact, firstLetter);
  }
}


/**
 * sort contacts by alphabet
 */
function sortContacts() {
  contacts.sort(function (a, b) {
    return a.name.charAt(0).localeCompare(b.name.charAt(0));
  });
}


/**
 * Find index of a contact in array based on the contacts name
 * @param {string}
 * @returns {number} the index of the contact
 */
function getIdFromContact(currentContact) {
  return contacts.findIndex((obj) => obj.name == `${currentContact}`);
}


/**
 * generate headline for contactlist
 * @param {string}
 */
function generateHeadline(letter) {
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML += generateHeadlineHTML(letter);
}


/**
 * generate card for contact in first letter section
 * @param {number}
 * @param {object}
 * @param {string}
 */
function generateCard(i, contact, firstLetter) {
  let card = document.getElementById(firstLetter);
  card.innerHTML += generateCardHTML(i, contact);
}


/**
 * generate card details for contact
 * @param {number}
 */
function generateUserDetails(i) {
  let details = document.getElementById("contactDetails");
  let contactRight = document.getElementById("contact-right");
  let contact = activeUser["contacts"][i];
  details.innerHTML = "";
  details.innerHTML = generateUserDetailsHTML(i, contact);

  if (mobileStatus) {
    contactRight.style.display = "block";
    contactRight.style.position = "absolute";
  }
}


/**
 * set current contact to "active"
 * @param {number}
 */
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


/**
 * close details page
 */
function generateUserDetailsClose() {
  let contactRight = document.getElementById("contact-right");
  contactRight.style.display = "";
  contactRight.style.position = "";
}


/**
 * toggle popup and overlay.
 */
function togglePopup() {
  let overlay = document.getElementById("overlay");
  let popup = document.getElementById("popup");

  if (popupVisible(overlay, popup)) {
    hidePopup(overlay, popup);
  } else {
    showPopup(overlay, popup);
  }
}


/**
 * toggle popupEdit and overlay.
 */
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


/**
 * slide in message
 * @param {string} message
 */
function toogleInfo(message) {
  let info = document.getElementById("info");
  info.innerHTML = `<div class="infoButton">${message}</div>`;
  info.classList.add("info-slideIn");
  setTimeout(() => {
    info.classList.remove("info-slideIn");
  }, 2000);
}


/**
 * slide in delete warn user
 * @param {number}
 */
function toogleDeleteWarn(i) {
  let info = document.getElementById("info");
  info.innerHTML = toogleDeleteWarnHTML(i);
  info.classList.add("info-slideIn");
}


/**
 * slide in edit contact info
 */
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


/**
 * Checks if the popup and overlay visible.
 * @param {HTMLElement}
 * @param {HTMLElement}
 * @returns {boolean} True or false
 */
function popupVisible(overlay, popup) {
  return (
    overlay.classList.contains("overlay-show") &&
    popup.classList.contains("popup-slideIn")
  );
}


/**
 * Hides the popup and overlay.
 * @param {HTMLElement}
 * @param {HTMLElement}
 */
function hidePopup(overlay, popup) {
  overlay.classList.remove("overlay-show");
  overlay.classList.add("d-none");
  popup.classList.remove("popup-slideIn");
}


/**
 * Shows the popup and overlay.
 * @param {HTMLElement}
 * @param {HTMLElement}
 */
function showPopup(overlay, popup) {
  overlay.classList.add("overlay-show");
  overlay.classList.remove("d-none");
  popup.classList.add("popup-slideIn");
}


/**
 * delete contact und hide popup
 * @param {number}
 */
function confirmDeleteUser(i) {
  deleteUser(i);
  info.classList.remove("info-slideIn");
  hidePopup(overlay, popupEdit);
}


/**
 * close delete popup
 */
function cancelDelete() {
  let info = document.getElementById("info");
  info.classList.remove("info-slideIn");
}


/**
 * render contact in edit popup
 * @param {number}
 */
function generateEditCard(i) {
  let editContact = document.getElementById("editContact");
  let contact = activeUser["contacts"][i];
  editContact.innerHTML = "";
  editContact.innerHTML = generateEditCardHTML(i, contact);
}


/**
 * save changes from contact and push to array, close popup
 * @param {number}
 */
async function saveEdit(i) {
  let newUser = document.getElementById(`contact${i}`).value;
  let newEmail = document.getElementById(`email${i}`).value;
  let newPhone = document.getElementById(`phone${i}`).value;

  contacts[i].name = newUser;
  contacts[i].initial = getInitial(newUser);
  contacts[i].email = newEmail;
  contacts[i].phone = newPhone;

  await setItem("users", JSON.stringify(users));
  currentContact = newUser;
  toogleInfo("Contact was edited");
  renderContact();
  generateUserDetails(getIdFromContact(currentContact));
  setCardActive(getIdFromContact(currentContact));
  togglePopupEdit(i);
}


/**
 * delete contact
 * @param {number}
 */
async function deleteUser(id) {
  contacts.splice(id, 1);
  await setItem("users", JSON.stringify(users));
  await init();
  await generateUserDetails(0);
  await new Promise(resolve => setTimeout(resolve, 500)); 
  await setCardActive(0);
}


document.addEventListener("click", (event) => {
  if (event.target.id === "popup" || event.target.id === "popupEdit") {
    hidePopup(overlay, popup);
    hidePopup(overlay, popupEdit);
  }
});
