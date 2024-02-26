let assignedTo = [];
let prio = "medium";
let category = "";
let subtasks = [];

dueDateInput.min = new Date().toISOString().split("T")[0];

function changeClearButtonIcon() {
  let icon = document.getElementById("clearButtonIcon");

  icon.src = "../img/clear-button-icon-alternative.svg";
}


function changeClearButtonIconBack() {
  let icon = document.getElementById("clearButtonIcon");

  icon.src = "../img/clear-button-icon.svg";
}


function changeClearButtonIconMobile() {
  let icon = document.getElementById("clearButtonIconMobile");

  icon.src = "../img/clear-button-icon-alternative.svg";
}


function changeClearButtonIconBackMobile() {
  let icon = document.getElementById("clearButtonIconMobile");

  icon.src = "../img/clear-button-icon.svg";
}


function toggleAssignmentDropdown() {
  let assignmentDropdown = document.getElementById("assignmentDropdownList");
  if (assignmentDropdown.style.display === "flex") {
    assignmentDropdown.style.display = "none";
    renderAssignedToArray();
  } else {
    assignmentDropdown.style.display = "flex";
  }
}


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


function renderAssignedToArray() {
  let initial = document.getElementById("renderedAssignedToContacts");
  let totalHTML = "";

  for (let i = 0; i < assignedTo.length; i++) {
    const element = assignedTo[i];
    const color = assignedTo[i]["initial_color"];
    if (i < 5) {
      totalHTML += `<div class="cardInitialAssignedTo" style="background-color:${color}">${element.initial}</div>`;
    }
  }
  if (assignedTo.length > 5) {
    totalHTML += `<div class="cardInitialAssignedTo" style="background-color: var(--grey)">+${
      assignedTo.length - 5
    }</div>`;
  }
  initial.innerHTML = totalHTML;
}


function toggleCategoryDropdown() {
  let categoryDropdown = document.getElementById("categoryDropdownList");
  if (categoryDropdown.style.display === "flex") {
    categoryDropdown.style.display = "none";
  } else {
    categoryDropdown.style.display = "flex";
  }
}


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


function assignemtContactsTemplate(name, initial, initial_color, id) {
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


async function renderAssignmentContacts(users) {
  let assignmentDropdownList = document.getElementById("assignmentDropdownList");
  assignmentDropdownList.innerHTML = "";

  users.forEach((user) => {
    const { name, initial, initial_color, id } = user;
    const userHtml = assignemtContactsTemplate(
      name,
      initial,
      initial_color,
      id
    );
    assignmentDropdownList.innerHTML += userHtml;
  });
}


function selectAssignment(entry, id) {
  let isSelected = entry.classList.toggle("selected");
  id = id - 1;
  let { initial_color } = users[id];
  let name = entry.querySelector(".contact-option span").textContent;
  let initial = entry.querySelector(".contact-option div").textContent;
  let index = assignedTo.findIndex((user) => user.name === name && user.initial === initial);

  if (isSelected) {
    assignedTo.push({ name, initial, initial_color });
    entry.style.backgroundColor = "#2A3647";
    entry.querySelector("img").src = "../img/checked-button.svg";
  } else {
    assignedTo.splice(index, 1);
    entry.style.backgroundColor = "";
    entry.querySelector("img").src = "../img/check-button.svg";
  }
}


function changePriority(buttonId, priority) {
  let img;
  let buttons = document.querySelectorAll(".prio-selection-container div");
  let button = document.getElementById(buttonId);
  let isActive = button.classList.contains(priority);

  buttons.forEach(btn => {
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


function setCategory(selectedCategory) {
  category = selectedCategory;

  let categorySelect = document.getElementById("categorySelect");

  if (category === "User Story") {
    categorySelect.innerHTML =
      'User Task <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
  } else if (category === "Technical Task") {
    categorySelect.innerHTML =
      'Technical Task <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
  }

  toggleCategoryDropdown();
}


function acitivateSubtaskEditor() {
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


function focusSubtaskInput() {
  let subTaskInput = document.getElementById("subTaskInput");
  subTaskInput.focus();
}

function clearSubtaskInput() {
  let subTaskInput = document.getElementById("subTaskInput");
  subTaskInput.value = "";

  let imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">`;
}


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


function editSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  let subTaskInput = entryDiv.querySelector("li input");
  entryDiv.onmouseenter = null;
  entryDiv.onmouseleave = null;

  subTaskInput.style.backgroundColor = "white";
  subTaskInput.readOnly = false;
  subTaskInput.focus();

  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "none";
  let deleteIcon = entryDiv.querySelector(".delete-icon");
  deleteIcon.style.display = "inline";
  let saveIcon = entryDiv.querySelector(".save-icon");
  saveIcon.style.display = "inline";
}

function saveSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  let subTaskInput = entryDiv.querySelector("li input");
  let subTaskValue = subTaskInput.value.trim();

  entryDiv.onmouseenter = addHoverToSubtask;
  entryDiv.onmouseleave = removeHoverFromSubtask;

  const index = subtasks.indexOf(subTaskInput.value);
  if (index !== -1) {subtasks[index] = subTaskValue;}

  subTaskInput.readOnly = true;
  subTaskInput.style.backgroundColor = "";

  let saveIcon = entryDiv.querySelector(".save-icon");
  saveIcon.style.display = "none";
  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "inline";
}

function addHoverToSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  entryDiv.style.backgroundColor = "#f0f0f0";

  let deleteIcon = entryDiv.querySelector(".delete-icon");
  deleteIcon.style.display = "inline";

  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "inline";
}

function removeHoverFromSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  entryDiv.style.backgroundColor = "";

  let deleteIcon = entryDiv.querySelector(".delete-icon");
  deleteIcon.style.display = "none";

  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "none";
}

function deleteSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  let subTaskValue = entryDiv.querySelector("li input").value;

  const index = subtasks.indexOf(subTaskValue);
  if (index !== -1) {
    subtasks.splice(index, 1);
  }

  entryDiv.parentNode.removeChild(entryDiv);
}


async function addNewTask() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionInput").value;
  let dueDate = document.getElementById("dueDateInput").value;

  if (!title) {
    handleTitleError();
    return;
  }
  if (!category) {
    handleCategoryError();
    return;
  }

  let newTask = createNewTask(title, description, dueDate);
  await saveTask(newTask);
  redirectToBoardPage();
}


function handleTitleError() {
  let errorTitle = document.getElementById("errorTitle");
  let titleInput = document.getElementById("titleInput");
  let errorCategory = document.getElementById("requiredCategoryMessage");
  let categoryInput = document.getElementById("categorySelect");

  errorTitle.innerHTML = `A Title is required!`;
  titleInput.style.borderColor = "red";
  errorCategory.innerHTML = ``;
  categoryInput.style.borderColor = "#D1D1D1";
}


function handleCategoryError() {
  let errorTitle = document.getElementById("errorTitle");
  let titleInput = document.getElementById("titleInput");
  let errorCategory = document.getElementById("requiredCategoryMessage");
  let categoryInput = document.getElementById("categorySelect");

  errorTitle.innerHTML = ``;
  titleInput.style.borderColor = "#D1D1D1";
  errorCategory.innerHTML = `A Category must be selected!`;
  categoryInput.style.borderColor = "red";
}


function createNewTask(title, description, dueDate) {
  let cleanedTitle = title.trim() === "" ? null : title;
  let cleanedDescription = description.trim() === "" ? null : description;
  let cleanedDueDate = dueDate.trim() === "" ? null : dueDate;

  return {
    id: tasks.length,
    title: cleanedTitle,
    description: cleanedDescription,
    assignedTo,
    dueDate: cleanedDueDate,
    prio,
    category,
    subtasks,
    subtaskdone: [],
    progress: "todo",
  };
}



async function saveTask(task) {
  tasks.push(task);
  await setItem("tasks", JSON.stringify(tasks));
}


function redirectToBoardPage() {
  window.location.href = "/pages/board.html";
}


function resetTitleInput() {
  let titleInput = document.getElementById("titleInput");
  titleInput.value = "";
  titleInput.style.borderColor = "#D1D1D1";
  document.getElementById("errorTitle").innerHTML = "";
}


function resetDescriptionInput() {
  document.getElementById("descriptionInput").value = "";
}


function resetAssignedTo() {
  assignedTo = [];
  renderAssignedToArray();
}


function resetDueDateInput() {
  document.getElementById("dueDateInput").value = "";
}


function resetPriority() {
  changePriority("mediumButton", "medium");
  let mediumButton = document.getElementById("mediumButton");
  mediumButton.classList.add("medium");
  mediumButton.querySelector("img").src = "../img/medium-button-icon-active.svg";
}


function resetCategory() {
  category = "";
  let categorySelect = document.getElementById("categorySelect");
  categorySelect.innerHTML = 'Select task category <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
  document.getElementById("requiredCategoryMessage").innerHTML = "";
  categorySelect.style.borderColor = "#D1D1D1";
}


function resetSubtasks() {
  subtasks = [];
  document.getElementById("subtasksList").innerHTML = "";
}


function resetAssignmentDropdownList() {
  let assignmentDropdownList = document.getElementById("assignmentDropdownList");
  assignmentDropdownList.style.display = "none";
  let contactOptions = document.querySelectorAll(".assignment-dropdown-list-entry");
  contactOptions.forEach((option) => {
    option.classList.remove("selected");
    option.style.backgroundColor = "";
    option.querySelector("img").src = "../img/check-button.svg";
  });
}


function resetCategoryDropdownList() {
  document.getElementById("categoryDropdownList").style.display = "none";
}


function resetAddTaskForm() {
  resetTitleInput();
  resetDescriptionInput();
  resetAssignedTo();
  resetDueDateInput();
  resetPriority();
  resetCategory();
  resetSubtasks();
  resetAssignmentDropdownList();
  resetCategoryDropdownList();
}


document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  let descriptionInput = document.getElementById("descriptionInput");

  descriptionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      let cursorPos = this.selectionStart;
      let newValue =
        this.value.slice(0, cursorPos) + "\n" + this.value.slice(cursorPos);
      this.value = newValue;
      this.setSelectionRange(cursorPos + 1, cursorPos + 1);
    }
  });
});



