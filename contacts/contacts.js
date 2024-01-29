let contacts = [];
let currentContact = [];

async function init() {
  await includeHTML();
  await loadcontacts();
  await renderContact();
}

async function loadcontacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.warn("User konnten nicht geladen werden ");
  }
}

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
  toogleInfo();
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
  contactList.innerHTML += `
    <div class="" id=${letter}>
      <div class="contactsFirstLetter">${letter}</div>
      <div class="contactsFirstLetterHeadline"></div>
    </div>
  `;
}

function generateCard(i, contact, firstLetter) {
  let card = document.getElementById(firstLetter);
  card.innerHTML += `
  <a onclick="generateUserDetails(${i}); setCardActive(${i})" id="contactId${i}" 
  <div class="contactNameWrapper ">
  <div class="contactName-Initial" style="background-color:${contact.initial_color}"> ${contact.initial}</div>
  <div>
  <div class="contactName" >${contact.contact}</div>
  <div class="contactEmail">${contact.email}</div>
  </div
  </div>
  </a>
  `;
}

function setCardActive(i) {
  let allContactNames = document.querySelectorAll(".contactNameWrapperActive");
  for (let j = 0; j < allContactNames.length; j++) {
    allContactNames[j].classList.remove("contactNameWrapperActive");
  }
  let activeContact = document.getElementById(`contactId${i}`);
  if (activeContact) {
    activeContact.classList.add("contactNameWrapperActive");
  }
}

function generateUserDetails(i) {
  let details = document.getElementById("contactDetails");
  let contact = contacts[i];
  details.innerHTML = "";

  details.innerHTML = /*HTML*/ `
  <div class="contact-right-container">
    <div class="contactInitial" >
      <div style="background-color: ${contact.initial_color}">${contact.initial}</div>
    </div>
    <div class="contact-right-name">
      <p >${contact.contact} </p>
      <div class="contact-right-name-action">
      <a onclick="togglePopupEdit(${i})" class="pointer"><img src="./images/edit.svg" alt="">EDIT</a>
      <a onclick="deleteUser(${i})" class="pointer"><img src="./images/delete.svg" alt="">DELETE</a>
      </div>
    </div>
  </div>
  <div>
    <div class="contact-right-details-headline">Contact Information</div>
    <div class="font-16-bold-black">Email</div>
    <div class="contact-right-details-email">${contact.email}</div>
    <div class="font-16-bold-black">Phone</div>
    <div class="contact-right-details-phone"> ${contact.phone}</div>
  </div>
`;
}

function togglePopup() {
  let overlay = document.getElementById("overlay");
  let popup = document.getElementById("popup");

  if (overlay.style.display === "block" && popup.style.display === "block") {
    overlay.style.display = "none";
    popup.style.display = "none";
  } else {
    overlay.style.display = "block";
    popup.style.display = "block";
  }
}

function togglePopupEdit(i) {
  let overlay = document.getElementById("overlay");
  let popupEdit = document.getElementById("popupEdit");

  if (
    overlay.style.display === "block" &&
    popupEdit.style.display === "block"
  ) {
    overlay.style.display = "none";
    popupEdit.style.display = "none";
  } else {
    overlay.style.display = "block";
    popupEdit.style.display = "block";
  }
  generateEditCard(i);
}

function generateEditCard(i) {
  let editContact = document.getElementById("editContact");
  let contact = contacts[i];
  editContact.innerHTML = "";
  editContact.innerHTML = /*HTML*/ `
  <div class="overlay-add-contact-person" >
    <div class="contactInitialEdit" style="background-color:${contact.initial_color}">${contact.initial}</div>
  </div>
  <div class="overlay-add-contact-input">
    <form onsubmit="saveEdit(${i});   return false" class="addContactForm">
      <div class="addContactInput" id="contactName${i}">
        <input id="contact${i}" type="text" placeholder="Name" value="${contact.contact}" class="contact-input">
        <img src="./images/addContact-person.svg" alt="">
        <img src="./images/close.svg" alt="" class="addContactFormClose" onclick="togglePopupEdit();">
      </div>
      <div class="addContactInput">
        <input id="email${i}" type="text" placeholder="Email" value="${contact.email}" class="contact-input">
        <img src="./images/addContact-person.svg" alt="">
      </div>
      <div class="addContactInput">
        <input id="phone${i}" type="number" placeholder="Phone" value="${contact.phone}" class="contact-input">
        <img src="./images/addContact-person.svg" alt="">
      </div>
      <div class="addContactBtn">
        <button class="addContactBtnCancel" type="button" onclick="togglePopupEdit()">Delete
          <img src="./images/cancel.svg" alt="">
        </button>
        <button class="addContactBtnCreate" type="submit">Save
          <img src="./images/check.svg" alt="">
        </button>
      </div>
    </form>
  </div>
`;
}

function toogleInfo() {
  let info = document.getElementById("info");
  info.style.display = "block";
  setTimeout(() => {
    info.style.display = "none";
  }, 2050000);
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
  toogleInfo();
  renderContact();
  generateUserDetails(getIdFromContact(currentContact));
  setCardActive(getIdFromContact(currentContact));
  togglePopupEdit(i);
}

async function deleteUser(id) {
  contacts.splice(id, 1);
  await setItem("contacts", JSON.stringify(contacts));
  await init();
  generateUserDetails();
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

async function deleteAllUser() {
  contacts.splice(0, contacts.length);
  await setItem("contacts", JSON.stringify(contacts));
}
