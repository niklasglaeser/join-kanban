/**
 * Saves the edited subtask.
 * @param {Event} event - The click event triggering the save action.
 */
function saveSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  let subTaskInput = entryDiv.querySelector("li input");
  let subTaskValue = subTaskInput.value.trim();
  entryDiv.onmouseenter = addHoverToSubtask;
  entryDiv.onmouseleave = removeHoverFromSubtask;
  let originalSubtaskValue = subTaskInput.defaultValue.trim();

  const index = subtasks.indexOf(originalSubtaskValue);
  if (index !== -1) {
    subtasks[index] = subTaskValue;
  }

  subTaskInput.readOnly = true;
  subTaskInput.style.backgroundColor = "";
  let saveIcon = entryDiv.querySelector(".save-icon");
  saveIcon.style.display = "none";
  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "inline";
}


/**
 * Adds hover effect to a subtask entry.
 * @param {Event} event - The mouseenter event triggering the hover effect.
 */
function addHoverToSubtask(event) {
    let entryDiv = event.target.closest(".subtasks-list-entry");
    entryDiv.style.backgroundColor = "";
  
    let deleteIcon = entryDiv.querySelector(".delete-icon");
    deleteIcon.style.display = "inline";
  
    let editIcon = entryDiv.querySelector(".edit-icon");
    editIcon.style.display = "inline";
}

  

/**
   * Removes hover effect from a subtask entry.
   * @param {Event} event - The mouseleave event removing the hover effect.
   */
function removeHoverFromSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  entryDiv.style.backgroundColor = "";

  let deleteIcon = entryDiv.querySelector(".delete-icon");
  deleteIcon.style.display = "none";

  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "none";
}


/**
 * Deletes a subtask entry.
 * @param {Event} event - The click event triggering the delete action.
 */
function deleteSubtask(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry");
  let subTaskValue = entryDiv.querySelector("li input").value;

  const index = subtasks.indexOf(subTaskValue);
  if (index !== -1) {
    subtasks.splice(index, 1);
  }

  entryDiv.parentNode.removeChild(entryDiv);
}


/**
 * Adds a new task and performs necessary actions.
 */
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
  resetAddTaskForm();
  redirectToBoardPage();
}


/**
 * Adds a new task on the board and performs necessary actions.
 */
async function addNewTaskBoard() {
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
  resetAddTaskForm();
  openAddTaskPopUp();
  updateHTML();
}


/**
 * Handles error when no title is provided.
 */
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


/**
 * Handles error when no category is selected.
 */
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


/**
 * Creates a new task object.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} dueDate - The due date of the task.
 * @returns {Object} The new task object.
 */
function createNewTask(title, description, dueDate) {
  let cleanedTitle = title.trim() === "" ? "" : title;
  let cleanedDescription = description.trim() === "" ? "" : description;
  let cleanedDueDate = dueDate.trim() === "" ? "" : dueDate;

  return {
    id: Date.now(),
    title: cleanedTitle,
    description: cleanedDescription,
    assignedTo,
    dueDate: cleanedDueDate,
    prio,
    category,
    subtasks,
    subtasksdone: [],
    progress,
  };
}


/**
 * Saves a task to the tasks list.
 * @param {Object} task - The task to be saved.
 */
async function saveTask(task) {
  tasks.push(task);
  await setItem("tasks", JSON.stringify(tasks));
}


/**
 * Redirects to the board page.
 */
function redirectToBoardPage() {
  window.location.href = "/pages/board.html";
}


/**
 * Resets the title input field.
 */
function resetTitleInput() {
  let titleInput = document.getElementById("titleInput");
  titleInput.value = "";
  titleInput.style.borderColor = "#D1D1D1";
  document.getElementById("errorTitle").innerHTML = "";
}


/**
 * Resets the description input field.
 */
function resetDescriptionInput() {
  document.getElementById("descriptionInput").value = "";
}


/**
 * Resets the assignedTo array and updates UI.
 */
function resetAssignedTo() {
  assignedTo = [];
  renderAssignedToArray();
}


/**
 * Resets the due date input field.
 */
function resetDueDateInput() {
  document.getElementById("dueDateInput").value = "";
}


/**
 * Resets the priority to medium and updates UI.
 */
function resetPriority() {
  changePriority("mediumButton", "medium");
  let mediumButton = document.getElementById("mediumButton");
  mediumButton.classList.add("medium");
  mediumButton.querySelector("img").src =
    "../img/medium-button-icon-active.svg";
}


/**
 * Resets the category to empty and updates UI.
 */
function resetCategory() {
  category = "";
  let categorySelect = document.getElementById("categorySelect");
  categorySelect.innerHTML =
    'Select task category <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
  document.getElementById("requiredCategoryMessage").innerHTML = "";
  categorySelect.style.borderColor = "#D1D1D1";
}

/**
 * Resets the subtasks array and updates UI.
 */
function resetSubtasks() {
  subtasks = [];
  document.getElementById("subtasksList").innerHTML = "";
}

/**
 * Resets the assignment dropdown list and updates UI.
 */
function resetAssignmentDropdownList() {
  let assignmentDropdownList = document.getElementById(
    "assignmentDropdownList"
  );
  assignmentDropdownList.style.display = "none";
  let contactOptions = document.querySelectorAll(
    ".assignment-dropdown-list-entry"
  );
  contactOptions.forEach((option) => {
    option.classList.remove("selected");
    option.style.backgroundColor = "";
    option.querySelector("img").src = "../img/check-button.svg";
  });
}


/**
 * Resets the category dropdown list and updates UI.
 */
function resetCategoryDropdownList() {
  document.getElementById("categoryDropdownList").style.display = "none";
}


/**
 * Resets the add task form by calling individual reset functions.
 */
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


/**
 * Handles the keydown event when the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
});


/**
 * Handles the keydown event for the description input when the DOM content is loaded.
 */
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