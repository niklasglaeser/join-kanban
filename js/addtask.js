/**
 * Array to store assigned contacts.
 * @type {Array}
 */
let assignedTo = [];


/**
 * set standard Priority of the task.
 * @type {string}
 */
let prio = "medium";


/**
 * initiate Category of the task.
 * @type {string}
 */
let category = "";


/**
 * Array to store subtasks.
 * @type {Array}
 */
let subtasks = [];


/**
 * defualt Progress status of the task.
 * @type {string}
 */
let progress = "todo";


/**
 * Set minimum date for due date input field to current date.
 */
dueDateInput.min = new Date().toISOString().split("T")[0];


/**
 * Change the clear button icon to an alternative one on hover.
 */
function changeClearButtonIcon() {
  let icon = document.getElementById("clearButtonIcon");
  icon.src = "../img/clear-button-icon-alternative.svg";
}


/**
 * Change the clear button icon back to the original one.
 */
function changeClearButtonIconBack() {
  let icon = document.getElementById("clearButtonIcon");
  icon.src = "../img/clear-button-icon.svg";
}


/**
 * Change the clear button icon to an alternative one on hover for mobile view.
 */
function changeClearButtonIconMobile() {
  let icon = document.getElementById("clearButtonIconMobile");
  icon.src = "../img/clear-button-icon-alternative.svg";
}


/**
 * Change the clear button icon back to the original one for mobile view.
 */
function changeClearButtonIconBackMobile() {
  let icon = document.getElementById("clearButtonIconMobile");
  icon.src = "../img/clear-button-icon.svg";
}


/**
 * Toggle the assignment dropdown menu on Click
 */
function toggleAssignmentDropdown() {
  let assignmentDropdown = document.getElementById("assignmentDropdownList");
  if (assignmentDropdown.style.display === "flex") {
    assignmentDropdown.style.display = "none";
    renderAssignedToArray();
  } else {
    assignmentDropdown.style.display = "flex";
  }
}


/**
 * Close assignment dropdown menu when clicking outside.
 * @param {Event} event - The click event.
 */
document.addEventListener("click", function (event) {
  let assignmentSelect = document.getElementById("assignmentSelect");
  let assignmentDropdown = document.getElementById("assignmentDropdownList");
  let dropdownIcon = document.getElementById("dropdownIcon");
  if (
    event.target !== assignmentSelect &&
    event.target !== assignmentDropdown &&
    event.target !== dropdownIcon &&
    !assignmentDropdown.contains(event.target) &&
    !event.target.classList.contains("assignment-dropdown-list-entry")
  ) {
    assignmentDropdown.style.display = "none";
    renderAssignedToArray();
  }
});


/**
 * Render assigned contacts as initials when the assignment dropdown is closed
 */
function renderAssignedToArray() {
  let initial = document.getElementById("renderedAssignedToContacts");
  let totalHTML = "";

  for (let i = 0; i < assignedTo.length; i++) {
    const element = assignedTo[i];
    const color = assignedTo[i]["initial_color"];
    if (i < 5) {
      totalHTML += `<div class="cardInitialAssignedToAddTask" style="background-color:${color}">${element.initial}</div>`;
    }
  }
  if (assignedTo.length > 5) {
    totalHTML += `<div class="cardInitialAssignedToAddTask" style="background-color: var(--grey)">+${
      assignedTo.length - 5
    }</div>`;
  }
  initial.innerHTML = totalHTML;
}


/**
 * Toggle the category dropdown menu on Click
 */
function toggleCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropdownList");
  if (categoryDropdown.style.display === "flex") {
    categoryDropdown.style.display = "none";
  } else {
    categoryDropdown.style.display = "flex";
  }
}


/**
 * Close category dropdown menu when clicking outside.
 * @param {Event} event - The click event.
 */
document.addEventListener("click", function (event) {
  let categorySelect = document.getElementById("categorySelect");
  let categoryDropdown = document.getElementById("categoryDropdownList");
  let dropdownIconCategory = document.getElementById("dropdownIconCategory");

  if (
    event.target !== categoryDropdown &&
    event.target !== categorySelect &&
    event.target !== dropdownIconCategory
  ) {
    categoryDropdown.style.display = "none";
  }
});


/**
 * Generates HTML template for the Assignment Dropdown
 * @param {string} name - The name of the contact.
 * @param {string} initial - The initial of the contact.
 * @param {string} initial_color - The background color of the initial.
 * @param {number} id - The ID of the contact.
 * @returns {string} The HTML template for Assignment Dropdown
 */
function assignmentContactsTemplate(name, initial, initial_color, id) {
  return `
    <div class="assignment-dropdown-list-entry" onclick="selectAssignment(this, ${id})">
        <div class="contact-option">
            <div id="${id}" style="background-color:${initial_color}">${initial}</div>
            <span>${name}</span>
        </div>
        <img src="../img/check-button.svg">
    </div>
  `;
}


/**
 * Renders all the Users in to the Assignment Dropdown when the page is loaded
 * @param {Array<Object>} users - An array of user objects.
 */
async function renderAssignmentContacts(users) {
  let assignmentDropdownList = document.getElementById("assignmentDropdownList");
  assignmentDropdownList.innerHTML = "";

  users.forEach((user) => {
    const { name, initial, initial_color, id } = user;
    const userHtml = assignmentContactsTemplate(name, initial, initial_color, id);
    assignmentDropdownList.innerHTML += userHtml;
  });
}


/**
 * Handles selection of assignment contact and adds/removes from the assignedTo Array
 * @param {HTMLElement} entry - The clicked Assignment Dropdown list entry
 * @param {number} id - The ID of the selected contact
 */
function selectAssignment(entry, id) {
  let isSelected = entry.classList.toggle("selected");
  id = id - 1;
  let { initial_color } = users[id];
  id = id + 1;
  let name = entry.querySelector(".contact-option span").textContent;
  let initial = entry.querySelector(".contact-option div").textContent;
  let index = assignedTo.findIndex((user) => user.name === name && user.initial === initial);

  if (isSelected) {
    assignedTo.push({ name, initial, initial_color, id });
    entry.style.backgroundColor = "#2A3647";
    entry.querySelector("img").src = "../img/checked-button.svg";
  } else {
    assignedTo.splice(index, 1);
    entry.style.backgroundColor = "";
    entry.querySelector("img").src = "../img/check-button.svg";
  }
}


/**
 * Changes priority and updates the buttons accordingly
 * @param {string} buttonId - The ID of the clicked priority button
 * @param {string} priority - The priority selection
 */
function changePriority(buttonId, priority) {
  let img;
  let buttons = document.querySelectorAll(".prio-selection-container div");
  let button = document.getElementById(buttonId);
  let isActive = button.classList.contains(priority);

  buttons.forEach((btn) => {
    btn.classList.remove("urgent", "medium", "low");
    img = btn.querySelector("img");
    img.src = `../img/${btn.id.split("Button")[0]}-button-icon.svg`;
  });

  if (!isActive) {
    button.classList.add(priority);
    img = button.querySelector("img");
    img.src = `../img/${priority}-button-icon-active.svg`;
    prio = priority;
  }
}


/**
 * Sets category and updates placeholder
 * @param {string} selectedCategory - The selected category
 */
function setCategory(selectedCategory) {
  category = selectedCategory;

  let categorySelect = document.getElementById("categorySelect");

  if (category === "User Story") {
    categorySelect.innerHTML =
      'User Story <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
  } else if (category === "Technical Task") {
    categorySelect.innerHTML =
      'Technical Task <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
  }

  toggleCategoryDropdown();
}


/**
 * Activates the Subtask Input Field and changes the Icons in the Input Field
 */
function activateSubtaskEditor() {
  let imageContainer = document.getElementById("imageContainer");
  let subTaskInput = document.getElementById("subTaskInput");

  if (subTaskInput.value.trim() !== "") {
    imageContainer.innerHTML = `<img src="../img/x-icon-subtasks.svg" onclick="clearSubtaskInput()"> <img src="../img/check-icon-subtasks.svg" onclick="addSubtaskToList()">`;
  } else {
    imageContainer.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">`;
  }

  subTaskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addSubtaskToList();
    }
  });
}


/**
 * Focuses on subtask input field
 */
function focusSubtaskInput() {
  let subTaskInput = document.getElementById("subTaskInput");
  subTaskInput.focus();
}


/**
 * Clears subtask input field
 */
function clearSubtaskInput() {
  let subTaskInput = document.getElementById("subTaskInput");
  subTaskInput.value = "";

  let imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">`;
}


/**
 * Adds subtask to the subtask list
 */
function addSubtaskToList() {
  let subTaskInput = document.getElementById("subTaskInput");
  let subTaskValue = subTaskInput.value.trim();

  if (subTaskValue !== "") {
    let subtasksList = document.getElementById("subtasksList");
    addSubtaskEntry(subtasksList, subTaskValue);

    subtasks.push(subTaskValue);

    subTaskInput.value = "";
    let imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">`;
  }
}


/**
 * Generates the HTML for adding a new subtask entry to the subtasks list
 * @param {HTMLElement} subtasksList - The list element where the subtask entry will be added
 * @param {string} subTaskValue - The value of the subtask
 */
function addSubtaskEntry(subtasksList, subTaskValue) {
  subtasksList.innerHTML += `
    <div class="subtasks-list-entry" onmouseenter="addHoverToSubtask(event)" onmouseleave="removeHoverFromSubtask(event)">
        <li><input type="text" value="${subTaskValue}" readonly id="subtaskEditInput"></li>
        <div id="subtaskIcons">
            <img onclick="editSubtask(event)" class="edit-icon" src="../img/edit-subtasks-icon.svg" style="display: none;">
            <img onclick="deleteSubtask(event)" class="delete-icon" src="../img/delete-subtask-icon.svg" style="display: none;">
            <img onclick="saveSubtask(event)" class="save-icon" src="../img/save-subtask-icon.svg" style="display: none;">
        </div>
    </div>
  `;
}


/**
 * Activates editing of a subtask
 * @param {Event} event - The click on the edit icon
 */
function editSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  let subTaskInput = entryDiv.querySelector("li input");
  entryDiv.onmouseenter = null;
  entryDiv.onmouseleave = null;

  subTaskInput.style.backgroundColor = "white";
  subTaskInput.readOnly = false;
  subTaskInput.focus();

  showIcons(entryDiv);

  let saveIcon = entryDiv.querySelector(".save-icon");
  handleInput(subTaskInput, saveIcon);
}


