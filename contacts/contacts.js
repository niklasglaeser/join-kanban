let contacts = [];

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
    email: email.value,
    phone: phone.value,
  });
  await setItem("contacts", JSON.stringify(contacts));

  resetForm();
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

async function renderContact() {
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";
  contacts.sort(function (a, b) {
    return a.contact.charAt(0).localeCompare(b.contact.charAt(0));
  });

  let currentSign = null;

  for (let i = 0; i < contacts.length; i++) {
    let currentContact = contacts[i];
    let firstLetter = currentContact.contact.charAt(0).toUpperCase();

    if (currentSign !== firstLetter) {
      generateHeadline(i, firstLetter);
      currentSign = firstLetter;
      // generateStroke();
    }
    generateCard(i, currentContact, firstLetter);
  }
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

function generateStroke() {
  let contactList = document.getElementById("contact-list");
  contactList.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="354" height="2" viewBox="0 0 354 2" fill="none">
  <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
  </svg>`;
}

function generateCard(i, contact, firstLetter) {
  let card = document.getElementById(firstLetter);
  console.log(contact.contact);
  card.innerHTML += `
  <div id="contactName${i}" class="contactNameWrapper ">
  <div class="contactName-Initial"> ${contact.initial}</div>
  <div>
  <div class="contactName" >${contact.contact}</div>
  <div class="contactEmail">${contact.email}</div>
  </div
  </div>
  `;
}

function on() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("#text").style.left = "50%";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function doNotClose(event) {
  event.stopPropagation();
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
