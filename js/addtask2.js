/**
 * Hides editing icons
 * @param {Element} entryDiv - The entry div of the subtask
 */
function hideIcons(entryDiv) {
  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "none";
  let deleteIcon = entryDiv.querySelector(".delete-icon");
  deleteIcon.style.display = "none";
}


/**
 * Shows editing icons
 * @param {Element} entryDiv - The entry div of the subtask
 */
function showIcons(entryDiv) {
  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "none";
  let deleteIcon = entryDiv.querySelector(".delete-icon");
  deleteIcon.style.display = "inline";
  let saveIcon = entryDiv.querySelector(".save-icon");
  saveIcon.style.display = "inline";
}


/**
 * Handles input for subtask
 * @param {Element} subTaskInput - The input element for the subtask
 * @param {Element} saveIcon - The save icon element
 */
function handleInput(subTaskInput, saveIcon) {
  subTaskInput.addEventListener("input", function() {
    if (subTaskInput.value.trim() === "") {
      saveIcon.style.display = "none";
    } else {
      saveIcon.style.display = "inline";
    }
  });
}


/**
 * Saves the changes made to the subtask after editing it
 * @param {Event} event - The click event triggering the save action
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

  resetSubtask(entryDiv);
}


/**
 * Resets the subtask input field and icons to their default state
 * @param {HTMLElement} entryDiv - The entry div containing the subtask
 */
function resetSubtask(entryDiv) {
  let subTaskInput = entryDiv.querySelector("li input");
  subTaskInput.readOnly = true;
  subTaskInput.style.backgroundColor = "";
  let saveIcon = entryDiv.querySelector(".save-icon");
  saveIcon.style.display = "none";
  let editIcon = entryDiv.querySelector(".edit-icon");
  editIcon.style.display = "inline";
}


/**
 * Adds hover effect to subtask entry
 * @param {Event} event - The mouseenter event triggering the hover effect
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
   * Removes hover effect from subtask entry
   * @param {Event} event - The mouseleave event removing the hover effect
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
 * Deletes a subtask entry
 * @param {Event} event - The click event triggering the delete action
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
 * Checks for value of title, dueDate and category and then adds a new task
 */
async function addNewTask() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionInput").value;
  let dueDate = document.getElementById("dueDateInput").value;
  let titleError = !title ? "A Title is required!" : "";
  let dueDateError = !dueDate ? "A Due Date is required!" : "";
  let categoryError = !category ? "A Category must be selected!" : "";
  handleInputError("titleInput", titleError);
  handleInputError("dueDateInput", dueDateError);
  handleInputError("categorySelect", categoryError);

  if (titleError || dueDateError || categoryError) {
    return;
  }

  let newTask = createNewTask(title, description, dueDate);
  await saveTask(newTask);
  resetAddTaskForm();
  redirectToBoardPage();
}


/**
 * Checks for value of title, dueDate and category and then adds a new task
 */
async function addNewTaskBoard() {
  let title = document.getElementById("titleInput").value;
  let description = document.getElementById("descriptionInput").value;
  let dueDate = document.getElementById("dueDateInput").value;
  let titleError = !title ? "A Title is required!" : "";
  let dueDateError = !dueDate ? "A Due Date is required!" : "";
  let categoryError = !category ? "A Category must be selected!" : "";
  handleInputError("titleInput", titleError);
  handleInputError("dueDateInput", dueDateError);
  handleInputError("categorySelect", categoryError);

  if (titleError || dueDateError || categoryError) {
    return;
  }

  let newTask = createNewTask(title, description, dueDate);
  await saveTask(newTask);
  resetAddTaskForm();
  updateHTML();
  openAddTaskPopUp();
}


/**
 * Handles error for input fields
 * @param {string} inputId - The id of the input field
 * @param {string} errorMessage - The error message to display or an empty string to remove the error message
 */
function handleInputError(inputId, errorMessage) {
  let errorElement = document.getElementById(`error${inputId}`);
  let inputElement = document.getElementById(inputId);

  errorElement.innerHTML = errorMessage;
  inputElement.style.borderColor = errorMessage ? "red" : "#D1D1D1";
}


/**
 * Creates a new task object by getting all the values from the addtask options
 * @param {string} title - The title of the task
 * @param {string} description - The description of the task
 * @param {string} dueDate - The due date of the task
 * @returns {Object} The new task object
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
 * Saves a task to the remote Storage
 * @param {Object} task - The task to be saved
 */
async function saveTask(task) {
  tasks.push(task);
  await setItem("tasks", JSON.stringify(tasks));
}


/**
 * Redirects to the board page
 */
function redirectToBoardPage() {
  window.location.href = "../pages/board.html";
}


/**
 * Resets the title input field
 */
function resetTitleInput() {
  let titleInput = document.getElementById("titleInput");
  titleInput.value = "";
  titleInput.style.borderColor = "#D1D1D1";
  document.getElementById("errortitleInput").innerHTML = "";
}


/**
 * Resets the description input field
 */
function resetDescriptionInput() {
  document.getElementById("descriptionInput").value = "";
}


/**
 * Resets the assignedTo array and updates the Initials
 */
function resetAssignedTo() {
  assignedTo = [];
  renderAssignedToArray();
}


/**
 * Resets the due date input field
 */
function resetDueDateInput() {
  document.getElementById("dueDateInput").value = "";
  document.getElementById("dueDateInput").style.borderColor = "#D1D1D1";

  document.getElementById("errordueDateInput").innerHTML = "";
}


/**
 * Resets the priority to the defualt medium and updates the buttons
 */
function resetPriority() {
  changePriority("mediumButton", "medium");
  let mediumButton = document.getElementById("mediumButton");
  mediumButton.classList.add("medium");
  mediumButton.querySelector("img").src =
    "../img/medium-button-icon-active.svg";
}


/**
 * Resets the category to empty and update the placeholder
 */
function resetCategory() {
  category = "";
  let categorySelect = document.getElementById("categorySelect");
  categorySelect.innerHTML = 'Select task category <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
  document.getElementById("errorcategorySelect").innerHTML = "";
  categorySelect.style.borderColor = "#D1D1D1";
}


/**
 * Resets the subtasks array and updates the subtasks List
 */
function resetSubtasks() {
  subtasks = [];
  document.getElementById("subtasksList").innerHTML = "";
}


/**
 * Resets the assignment List and updates the assignment Dropdown
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
 * Hides the Category Dropdown list
 */
function resetCategoryDropdownList() {
  document.getElementById("categoryDropdownList").style.display = "none";
}


/**
 * Resets the add task form by calling individual reset functions
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
 * Prevents the Form from submitting by pressing enter by disabling default behaviour
 */
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
});


/**
 * Provides the ability to press Enter when in the description to go to a new line
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

