let demoJsonContacts;
let demoContacts = [];
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

/**
 * compare password, check email is not registered, generate User und psuh to array
 */
async function register() {
  if (
    comparePasswords(
      "passwordInputSignup",
      "confirmPasswordInputSignup",
      "errorConfirmPassword"
    )
  ) {
    if (checkEmail()) {
      errorConfirmEmail.innerText =
        "This E-mail address is already registered.";
      return;
    }
    signUpFormButton.disabled = true;
    let nextId = getNextId();
    let newUser = {
      id: nextId,
      name: nameInputSignup.value,
      email: emailInputSignup.value,
      password: passwordInputSignup.value,
      initial: getInitial(nameInputSignup.value),
      initial_color: getInitialColor(),
      contacts: [],
      tasks: [],
    };
    users.push(newUser);
    await generateDemoContacts(nextId);
    await setItem("users", JSON.stringify(users));
    window.location.href = "index.html";
    resetForm();
  }
}

/**
 * checks if email is already registered
 * @returns true or false
 */
function checkEmail() {
  if (users.find((user) => user.email == emailInputSignup.value)) return true;
}

/**
 * reset input form
 */
function resetForm() {
  nameInputSignup.value = "";
  emailInputSignup.value = "";
  passwordInputSignup.value = "";
  signUpFormButton.disabled = false;
}

/**
 * get next id
 * @returns number
 */
function getNextId() {
  return users.length + 1;
}

/**
 * get firstletter from username
 * @param {string} username
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
 * get democontacts from json and copy to user -> contacts
 * @param {number} userId
 */
async function generateDemoContacts(userId) {
  await loadDemoContacts();
  demoJsonContacts.forEach((contact) => {
    let { name, email, phone } = contact;
    users
      .find((user) => user.id === userId)
      .contacts.push({
        name: name,
        initial: getInitial(name),
        initial_color: getInitialColor(),
        email: email,
        phone: phone,
      });
  });
}