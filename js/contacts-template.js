const AVATAR_COLORS = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#00BEE8",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];

function generateHeadlineHTML(letter) {
  return `
  <div class="" id=${letter}>
    <div class="contactsFirstLetter">${letter}</div>
    <div class="contactsFirstLetterHeadline"></div>
  </div>
`;
}

function generateCardHTML(i, contact) {
  return `
  <a onclick="generateUserDetails(${i}); setCardActive(${i})" >
  <div class="contactNameWrapper" id="contactId${i}">
  <div class="contactName-Initial" style="background-color:${contact.initial_color}"> ${contact.initial}</div>
  <div class="contactInfo">
    <p class="contactName">${contact.contact}</p>
    <p class="contactEmail">${contact.email}</p>
  </div>
  </div>
  </a>
  `;
}

function generateUserDetailsHTML(i, contact) {
  return `
<div class="contact-right-container">
  <div class="contactInitial" >
    <div style="background-color: ${contact.initial_color}">${contact.initial}</div>
  </div>
  <div class="contact-right-name">
    <p >${contact.contact} </p>
    <div class="contact-right-name-action">
    <a onclick="togglePopupEdit(${i})" class="pointer"><img src="../img/edit.svg" alt="">EDIT</a>
    <a onclick="toogleDeleteWarn(${i})" class="pointer"><img src="../img/delete.svg" alt="">DELETE</a>
    </div>
  </div>
</div>
<div>
  <div class="contact-right-details-headline">Contact Information</div>
  <div class="font-16 black">Email</div>
  <div class="contact-right-details-email"><a href='mailto:${contact.email}'>${contact.email}</a></div>
  <div class="font-16 black">Phone</div>
  <div class="contact-right-details-phone"> ${contact.phone}</div>
</div>
<div class="addContactMobile" onclick="toogleInfoEditMobile()">
  <img src="../img/edit-more.svg" alt="">
</div>
<div id="popupHelper" class="d-none" onclick="toogleInfoEditMobile()">
<div id="edit-more" class="edit-more" onclick="toogleInfoEditMobile()">
  <div class="contact-right-name-action-mobile">
  <div onclick="togglePopupEdit(${i})" class="pointer"><img src="../img/edit.svg" alt="">Edit</div>
  <div onclick="toogleDeleteWarn(${i})" class="pointer"><img src="../img/delete.svg" alt="">Delete</div>
</div>
</div>
</div>
`;
}

function toogleDeleteWarnHTML(i) {
  return `
  <div id="infoDelete" class="infoButtonDelete">
    <span>Delete ${contacts[i].contact}?</span>
    <span></span>
    <div>
      <a onclick="confirmDeleteUser(${i})" class="pointer">YES <img src="../img/check.svg" alt=""></a>
      <a onclick="cancelDelete()" class="pointer">NO <img src="../img/close-btn-white.svg" alt=""></a>
    </div>
  </div>`;
}

function generateEditCardHTML(i, contact) {
  return `
  <div class="overlay-add-contact-person" >
    <div class="contactInitialEdit" style="background-color:${contact.initial_color}">${contact.initial}</div>
  </div>
  <div class="overlay-add-contact-input">
    <form onsubmit="saveEdit(${i}); return false" class="addContactForm">
      <div class="addContactInput" id="contactName${i}">
        <input id="contact${i}" type="text" placeholder="Name" value="${contact.contact}" class="contact-input">
        <img src="../img/person-icon.svg" alt="">
      </div>
      <div class="addContactInput">
        <input id="email${i}" type="text" placeholder="Email" value="${contact.email}" class="contact-input">
        <img src="../img/mail.svg" alt="">
      </div>
      <div class="addContactInput">
        <input id="phone${i}" type="tel" placeholder="Phone" value="${contact.phone}" class="contact-input">
        <img src="../img/phone.svg" alt="">
      </div>
      <div class="addContactBtn">
        <button class="addContactBtnCancel" type="button" onclick="toogleDeleteWarn(${i})">Delete
        </button>
        <button class="addContactBtnCreate" type="submit">Save
          <img src="../img/check.svg" alt="">
        </button>
      </div>
    </form>
  </div>
`;
}
