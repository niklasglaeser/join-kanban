// let users = [];
// let contacts = [];
// let tasks = [];

async function register() {
  signUpFormButton.disabled = true;
  let nextId = getNextId();
  let newUser = {
    id: nextId,
    name: nameInputSignup.value,
    email: emailInputSignup.value,
    password: passwordInputSignup.value,
    initial: getInitial(nameInputSignup.value),
    contacts: [],
    // contacts: getContactsTemplate(nextId),
    tasks: [],
  };
  users.push(newUser);
  await setItem("users", JSON.stringify(users));
  window.location.href = "index.html";
  resetForm();
}

function resetForm() {
  nameInputSignup.value = "";
  emailInputSignup.value = "";
  passwordInputSignup.value = "";
  signUpFormButton.disabled = false;
}

function getNextId() {
  return users.length + 1;
}

/*AUCH IN contact.js*/

function getInitial(username) {
  let name = username.split(" ");
  let initial = name[1]
    ? (name[0][0] + name[1][0]).toUpperCase()
    : name[0][0].toUpperCase();
  return initial;
}
/*AUCH IN contact.js*/

function getContactsTemplate(nextId) {
  return {
    id: nextId,
    contact: "",
    initial: "",
    initial_color: "",
    email: "",
    phone: "",
  };
}
