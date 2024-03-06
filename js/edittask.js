/**
 * Array to store assigned contacts for editing.
 * @type {Array}
 */
let assignedToEdit = [];

/**
 * Stores the priority for editing.
 * @type {string}
 */
let prioEdit = "";

/**
 * Stores the button ID for editing.
 * @type {string}
 */
let buttonIdEdit = "";

/**
 * Array to store subtasks for editing.
 * @type {Array}
 */
let subtasksEdit = [];


/**
 * Changes the priority of a task.
 * @param {string} buttonIdEdit - The id of the button.
 * @param {string} priority - The priority value.
 */
function changePriorityEdit(buttonIdEdit, priority) {
  let img;
  let buttons = document.querySelectorAll(".prio-selection-container-edit div");
  let button = document.getElementById(buttonIdEdit);
  let isActive = button.classList.contains(priority);

  buttons.forEach((btn) => {
    btn.classList.remove("urgent", "medium", "low");
    img = btn.querySelector("img");
    img.src = `../img/${btn.id.split("ButtonEdit")[0]}-button-icon.svg`;
  });

  if (!isActive) {
    button.classList.add(priority);
    img = button.querySelector("img");
    img.src = `../img/${priority}-button-icon-active.svg`;
    prioEdit = priority;
  }
}


/**
 * Toggles the assignment dropdown menu.
 */
function toggleAssignmentDropdownEdit() {
  let assignmentDropdownEdit = document.getElementById("assignmentDropdownListEdit");
  if (assignmentDropdownEdit.style.display === "flex") {
    assignmentDropdownEdit.style.display = "none";
    renderAssignedToEdit();
  } else {
    assignmentDropdownEdit.style.display = "flex";
  }
}


/**
 * Renders assigned contacts to an array.
 * @param {Array} tasks - The tasks array.
 * @param {number} i - The index of the task.
 */
function renderAssignedToArrayEdit(tasks, i) {
  let initial = document.getElementById("renderedAssignedToContactsEdit");
  let totalHTML = "";

  if (tasks[i] && tasks[i].assignedTo) {
    const assignedTo = tasks[i].assignedTo;
    for (let j = 0; j < assignedTo.length; j++) {
      const element = assignedTo[j];
      const color = assignedTo[j]["initial_color"];
      if (j < 5) {
        totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color:${color}">${element.initial}</div>`;
      }
    }
    if (assignedTo.length > 5) {
      totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color: var(--grey)">+${assignedTo.length - 5}</div>`;
    }
  }
  initial.innerHTML = totalHTML;
}


/**
 * Renders assigned contacts.
 */
function renderAssignedToEdit() {
  let initial = document.getElementById("renderedAssignedToContactsEdit");
  let totalHTML = "";

  assignedToEdit.forEach((user, index) => {
    const color = user.initial_color;
    if (index < 5) {
      totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color:${color}">${user.initial}</div>`;
    }
  });

  if (assignedToEdit.length > 5) {
    totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color: var(--grey)">+${assignedToEdit.length - 5}</div>`;
  }
  initial.innerHTML = totalHTML;
}


/**
 * Renders assignment contacts for editing.
 * @param {number} i - The index of the task.
 */
async function renderAssignmentContactsEdit(i) {
  let assignmentDropdownListEdit = document.getElementById("assignmentDropdownListEdit");
  assignmentDropdownListEdit.innerHTML = "";

  assignedToEdit = [];

  for (const user of users) {
    const { name, initial, initial_color, id } = user;
    const assignedTasks = tasks[i].assignedTo;
    const isAssigned = assignedTasks.some((task) => task.id === id);
    const isSelected = isAssigned ? "selected" : "";

    if (isAssigned) {
      assignedToEdit.push(assignedTasks.find((task) => task.id === id));
    }

    const userHtml = assignmentContactsTemplateEdit(name, initial, initial_color, id, isSelected);
    assignmentDropdownListEdit.innerHTML += userHtml;
  }
}


/**
 * Generates HTML template for assignment contacts.
 * @param {string} name - The name of the contact.
 * @param {string} initial - The initial of the contact.
 * @param {string} initial_color - The color of the initial.
 * @param {number} id - The ID of the contact.
 * @param {string} isSelected - The selected status.
 * @returns {string} - The generated HTML template.
 */
function assignmentContactsTemplateEdit(name, initial, initial_color, id, isSelected) {
  return `
        <div class="assignment-dropdown-list-entry-edit ${isSelected}" onclick="selectAssignmentEdit(this, ${id})">
            <div class="contact-option-edit">
                <div id="${id}" style="background-color:${initial_color}">${initial}</div>
                <span>${name}</span>
            </div>
            <img src="../img/${isSelected ? "checked-button" : "check-button"}.svg">
        </div>
      `;
}


/**
 * Selects or deselects an assignment.
 * @param {HTMLElement} entry - The entry element.
 * @param {number} id - The ID of the contact.
 */
function selectAssignmentEdit(entry, id) {
  let isSelected = entry.classList.toggle("selected");
  id = id - 1;
  let { initial_color } = users[id];
  id = id + 1;
  let name = entry.querySelector(".contact-option-edit span").textContent;
  let initial = entry.querySelector(".contact-option-edit div").textContent;
  let index = assignedToEdit.findIndex((user) => user.id === id);

  if (isSelected) {
    assignedToEdit.push({ name, initial, initial_color, id });
    entry.style.backgroundColor = "#2A3647";
    entry.querySelector("img").src = "../img/checked-button.svg";
  } else {
    assignedToEdit.splice(index, 1);
    entry.style.backgroundColor = "";
    entry.querySelector("img").src = "../img/check-button.svg";
  }
}


/**
 * Activates subtask editor.
 */
function acitivateSubtaskEditorEdit() {
  let imageContainerEdit = document.getElementById("imageContainerEdit");
  let subTaskInputEdit = document.getElementById("subTaskInputEdit");

  if (subTaskInputEdit.value.trim() !== "") {
    imageContainerEdit.innerHTML = `<img src="../img/x-icon-subtasks.svg" onclick="clearSubtaskInputEdit()"> <img src="../img/check-icon-subtasks.svg" onclick="addSubtaskToListEdit()">`;
  } else {
    imageContainerEdit.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInputEdit()">`;
  }

  subTaskInputEdit.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addSubtaskToListEdit();
    }
  });
}


/**
 * Focuses on the subtask input.
 */
function focusSubtaskInputEditor() {
  let subTaskInputEdit = document.getElementById("subTaskInputEdit");
  subTaskInputEdit.focus();
}


/**
 * Clears the subtask input.
 */
function clearSubtaskInputEdit() {
  let subTaskInputEdit = document.getElementById("subTaskInputEdit");
  subTaskInputEdit.value = "";

  let imageContainerEdit = document.getElementById("imageContainerEdit");
  imageContainerEdit.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">`;
}


/**
 * Adds a subtask to the list.
 */
function addSubtaskToListEdit() {
  let subTaskInputEdit = document.getElementById("subTaskInputEdit");
  let subTaskValueEdit = subTaskInputEdit.value.trim();

  if (subTaskValueEdit !== "") {
    let subtasksListEdit = document.getElementById("subtasksListEdit");
    addSubtaskEntryEdit(subtasksListEdit, subTaskValueEdit);

    subtasksEdit.push(subTaskValueEdit);

    subTaskInputEdit.value = "";
    let imageContainerEdit = document.getElementById("imageContainerEdit");
    imageContainerEdit.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInputEdit()">`;
  }
}


/**
 * Adds a subtask entry to the list.
 * @param {HTMLElement} subtasksListEdit - The subtasks list element.
 * @param {string} subTaskValueEdit - The value of the subtask.
 */
function addSubtaskEntryEdit(subtasksListEdit, subTaskValueEdit) {
  subtasksListEdit.innerHTML += `
      <div class="subtasks-list-entry-edit" onmouseenter="addHoverToSubtaskEdit(event)" onmouseleave="removeHoverFromSubtaskEdit(event)">
          <li><input type="text" value="${subTaskValueEdit}" readonly id="subtaskEditInputEdit"></li>
          <div id="subtaskIconsEdit">
              <img onclick="editSubtaskEdit(event)" class="edit-icon-edit" src="../img/edit-subtasks-icon.svg" style="display: none;">
              <img onclick="deleteSubtaskEdit(event)" class="delete-icon-edit" src="../img/delete-subtask-icon.svg" style="display: none;">
              <img onclick="saveSubtaskEdit(event)" class="save-icon-edit" src="../img/save-subtask-icon.svg" style="display: none;">
          </div>
      </div>
    `;
}


/**
 * Renders subtasks for editing.
 * @param {number} i - The index of the task.
 */
function renderSubtasksEdit(i) {
  let subtasksListEdit = document.getElementById("subtasksListEdit");
  subtasksListEdit.innerHTML = "";

  if (tasks[i] && tasks[i].subtasks) {
    tasks[i].subtasks.forEach((subTaskValueEdit) => {
      addSubtaskEntryEdit(subtasksListEdit, subTaskValueEdit);
      subtasksEdit.push(subTaskValueEdit);
    });
  }
}


/**
 * Edits a subtask.
 * @param {Event} event - The event object.
 */
function editSubtaskEdit(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry-edit");
  let subTaskInputEdit = entryDiv.querySelector("li input");
  entryDiv.onmouseenter = null;
  entryDiv.onmouseleave = null;

  subTaskInputEdit.style.backgroundColor = "white";
  subTaskInputEdit.readOnly = false;
  subTaskInputEdit.focus();

  let editIconEdit = entryDiv.querySelector(".edit-icon-edit");
  editIconEdit.style.display = "none";
  let deleteIconEdit = entryDiv.querySelector(".delete-icon-edit");
  deleteIconEdit.style.display = "inline";
  let saveIconEdit = entryDiv.querySelector(".save-icon-edit");
  saveIconEdit.style.display = "inline";
}


/**
 * Adds hover effect to a subtask.
 * @param {Event} event - The event object.
 */
function addHoverToSubtaskEdit(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry-edit");
  entryDiv.style.backgroundColor = "";

  let deleteIconEdit = entryDiv.querySelector(".delete-icon-edit");
  deleteIconEdit.style.display = "inline";

  let editIconEdit = entryDiv.querySelector(".edit-icon-edit");
  editIconEdit.style.display = "inline";
}


/**
 * Removes hover effect from a subtask.
 * @param {Event} event - The event object.
 */
function removeHoverFromSubtaskEdit(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry-edit");
  entryDiv.style.backgroundColor = "";

  let deleteIconEdit = entryDiv.querySelector(".delete-icon-edit");
  deleteIconEdit.style.display = "none";

  let editIconEdit = entryDiv.querySelector(".edit-icon-edit");
  editIconEdit.style.display = "none";
}


/**
 * Deletes a subtask.
 * @param {Event} event - The event object.
 */
function deleteSubtaskEdit(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry-edit");
  let subTaskValueEdit = entryDiv.querySelector("li input").value;

  const index = subtasksEdit.indexOf(subTaskValueEdit);
  if (index !== -1) {
    subtasksEdit.splice(index, 1);
  }

  for (let i = 0; i < tasks.length; i++) {
    const subtasksDone = tasks[i].subtasksdone;
    const subtaskIndex = subtasksDone.indexOf(subTaskValueEdit);
    if (subtaskIndex !== -1) {
      subtasksDone.splice(subtaskIndex, 1);
    }
  }
  entryDiv.parentNode.removeChild(entryDiv);
}