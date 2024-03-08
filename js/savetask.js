/**
 * Adds hover effect to a subtask in the Edit Popup
 * @param {Event} event - The click event
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
 * Removes hover effect from a subtask in the Edit Popup
 * @param {Event} event - The click event
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
 * Deletes a subtask in the Edit Popup onClick
 * @param {Event} event - The click Event
 */
function deleteSubtaskEdit(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry-edit");
  let subTaskValueEdit = entryDiv.querySelector("li input").value;

  const index = subtasksEdit.indexOf(subTaskValueEdit);
  if (index !== -1) {
    subtasksEdit.splice(index, 1);
  }

  for (let i = 0; i < tasks.length; i++) {
    const subtasksDoneEditArray = subtasksDoneEdit;
    const subtaskIndex = subtasksDoneEditArray.indexOf(subTaskValueEdit);
    if (subtaskIndex !== -1) {
      subtasksDoneEditArray.splice(subtaskIndex, 1);
    }
  }
  entryDiv.parentNode.removeChild(entryDiv);
}


/**
 * Enables the Enter key to create a new line in the description input field of the task edit form.
 */
function enableEnterForNewLineEditTask() {
  document.getElementById("descriptionInputEdit").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const cursorPosition = this.selectionStart;
      const value = this.value;
      const newValue = value.slice(0, cursorPosition) + '\n' + value.slice(cursorPosition);
      this.value = newValue;
      this.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    }
  });
}


/**
 * Saves edited task
 * @param {number} i - The index of the task
 */
async function saveEditTask(i) {
    let titleInputEdit = document.getElementById("titleInputEdit").value;
    let dueDateInputEdit = document.getElementById("dueDateInputEdit").value;
    let titleErrorEdit = !titleInputEdit ? "A Title is required!" : "";
    let dueDateErrorEdit = !dueDateInputEdit ? "A Due Date is required!" : "";
    handleInputError("titleInputEdit", titleErrorEdit);
    handleInputError("dueDateInputEdit", dueDateErrorEdit);

    if (titleErrorEdit || dueDateErrorEdit) {
      return;
    }
    
    saveTitleChange(i);
    saveDescriptionChange(i);
    saveDueDateChange(i);
    savePrioEditChange(i);
    saveAssignedToChangeInput(i);
    saveSubtasksChangeInput(i);
    await setItem("tasks", JSON.stringify(tasks));
    editTask(i);
  }
  
  
/**
   * Saves changes to the title of the task.
   * @param {number} i - The index of the task.
   */
function saveTitleChange(i) {
    let titleChangeInput = document.getElementById("titleInputEdit").value;
    tasks[i].title = titleChangeInput;
  }
  
  
/**
* Saves changes to the description of the task
* @param {number} i - The index of the task
*/
function saveDescriptionChange(i) {
    let descriptionChangeInput = document.getElementById("descriptionInputEdit").value;
    tasks[i].description = descriptionChangeInput;
}
  
  
/**
* Saves changes to the due date of the task
* @param {number} i - The index of the task
*/
function saveDueDateChange(i) {
    let dueDateChangeInput = document.getElementById("dueDateInputEdit").value;
    tasks[i].dueDate = dueDateChangeInput;
}
  
  
/**
* Saves changes to the priority of the task
* @param {number} i - The index of the task
*/
function savePrioEditChange(i) {
    tasks[i].prio = prioEdit;
}
  
  
/**
* Saves changes to the assigned contacts of the task
* @param {number} i - The index of the task
*/
function saveAssignedToChangeInput(i) {
    tasks[i].assignedTo = assignedToEdit;
}
  
  
/**
* Saves changes to the subtasks of the task
* @param {number} i - The index of the task
*/
function saveSubtasksChangeInput(i) {
    tasks[i].subtasks = subtasksEdit;
    tasks[i].subtasksdone = subtasksDoneEdit;
}


/**
 * Updates a subtask in the list
 * @param {string} originalValue - The original value of the subtask
 * @param {string} newValue - The edited value of the subtask
 */
function updateSubtaskInList(originalValue, newValue) {
  const index = subtasksEdit.indexOf(originalValue);
  if (index !== -1) {
    subtasksEdit[index] = newValue;
  }
}


/**
 * Updates a subtask in tasks
 * @param {string} originalValue - The original value of the subtask
 * @param {string} newValue - The new value of the subtask
 */
function updateSubtaskInTasks(originalValue, newValue) {
  for (let i = 0; i < tasks.length; i++) {
    const subtasksDoneEditArray = subtasksDoneEdit;
    const subtaskIndex = subtasksDoneEditArray.indexOf(originalValue);
    if (subtaskIndex !== -1) {
      subtasksDoneEditArray[subtaskIndex] = newValue;
    }
  }
}


/**
 * Disables the subtask input
 * @param {HTMLElement} inputElement - The input element
 */
function disableSubtaskEditInput(inputElement) {
  inputElement.readOnly = true;
  inputElement.style.backgroundColor = "";
}


/**
 * Hides icons for editing subtask
 * @param {HTMLElement} entryDiv - The entry div element
 */
function hideIcons(entryDiv) {
  entryDiv.querySelector(".save-icon-edit").style.display = "none";
  entryDiv.querySelector(".edit-icon-edit").style.display = "none";
  entryDiv.querySelector(".delete-icon-edit").style.display = "none";
}


/**
 * Saves a subtask edit
 * @param {Event} event - the click on the checkmark that triggers the event
 */
function saveSubtaskEdit(event) {
  let entryDiv = event.target.closest(".subtasks-list-entry-edit");
  let subTaskInputEdit = entryDiv.querySelector("li input");
  let subTaskValueEdit = subTaskInputEdit.value.trim();
  let originalSubtaskValueEdit = subTaskInputEdit.defaultValue.trim();

  entryDiv.onmouseenter = addHoverToSubtaskEdit;
  entryDiv.onmouseleave = removeHoverFromSubtaskEdit;

  updateSubtaskInList(originalSubtaskValueEdit, subTaskValueEdit);
  updateSubtaskInTasks(originalSubtaskValueEdit, subTaskValueEdit);

  disableSubtaskEditInput(subTaskInputEdit);
  hideIcons(entryDiv);
}

