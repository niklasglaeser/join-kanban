let users = [];
let letters = [];

async function init() {
  // logoAnimation();
  await loadUsers();
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.warn("User konnten nicht geladen werden ");
  }
}

async function register() {
  users.push({
    user: username.value,
    initial: getInitial(username.value),
    email: email.value,
    password: password.value,
  });
  await setItem("users", JSON.stringify(users));

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
  username.value = "";
  email.value = "";
  password.value = "";
}

async function deleteUser(id) {
  let contact = document.getElementById(`contact${id}`);
  users.splice(id, 1);
  await setItem("users", JSON.stringify(users));
  await initContact();
}

async function deleteAllUser() {
  users.splice(0, users.length);
  await setItem("users", JSON.stringify(users));
}

async function renderContact() {
  let contact = document.getElementById("contact");
  contact.innerHTML = "";

  users.sort(function (a, b) {
    return a.user.charAt(0).localeCompare(b.user.charAt(0));
  });

  let currentSign = null;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let firstLetter = user.user.charAt(0).toUpperCase();

    if (currentSign !== firstLetter) {
      generateHeadline(i, firstLetter);
      currentSign = firstLetter;
    }
    generateCard(i, user, firstLetter);
  }
}

function generateHeadline(i, letter) {
  contact.innerHTML += `
    <div class="text-danger p-5" id=${letter}><h3>${letter}</h3></div>
  `;
}

function generateCard(i, user, firstLetter) {
  let contact = document.getElementById(firstLetter);
  contact.innerHTML += `
  <div id="contact${i}" class="d-flex gap-4 align-items-center">
  <p class="text-success text-center">${user.initial}</p>
  <div class="g-col-6">
  <p class="text-success">${user.user}</p>
  <p class="fs-6 text">${user.email}</p>
  </div>
  <i onClick="deleteUser(${i})" class="fa-solid fa-trash text-black link"></i>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit${i}">EDIT</button>
  <!-- Modal -->
  <div class="modal fade" id="edit${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${user.user}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input id="contactName${i}" value="${user.user}">Dein Name </input>
          <input id="contactMail${i}" value="${user.email}">Dein EMail </input>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="saveEdit(${i})">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  `;
}

async function saveEdit(i) {
  let newUser = document.getElementById(`contactName${i}`).value;
  let newEmail = document.getElementById(`contactMail${i}`).value;

  users.splice(i, 1, {
    user: newUser,
    email: newEmail,
    initial: getInitial(newUser),
  });

  await setItem("users", JSON.stringify(users));
  var myModalEl = document.getElementById(`edit${i}`);
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
  initContact();
}

async function initContact() {
  await init();
  await renderContact();
}
