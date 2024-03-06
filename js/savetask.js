/**
 * Saves edited task.
 * @param {number} i - The index of the task.
 */
async function saveEditTask(i) {
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
* Saves changes to the description of the task.
* @param {number} i - The index of the task.
*/
function saveDescriptionChange(i) {
    let descriptionChangeInput = document.getElementById("descriptionInputEdit").value;
    tasks[i].description = descriptionChangeInput;
}
  
  
/**
* Saves changes to the due date of the task.
* @param {number} i - The index of the task.
*/
function saveDueDateChange(i) {
    let dueDateChangeInput = document.getElementById("dueDateInputEdit").value;
    tasks[i].dueDate = dueDateChangeInput;
}
  
  
/**
* Saves changes to the priority of the task.
* @param {number} i - The index of the task.
*/
function savePrioEditChange(i) {
    tasks[i].prio = prioEdit;
}
  
  
/**
* Saves changes to the assigned contacts of the task.
* @param {number} i - The index of the task.
*/
function saveAssignedToChangeInput(i) {
    tasks[i].assignedTo = assignedToEdit;
}
  
  
/**
* Saves changes to the subtasks of the task.
* @param {number} i - The index of the task.
*/
function saveSubtasksChangeInput(i) {
    tasks[i].subtasks = subtasksEdit;
}


/**
 * Updates a subtask in the list.
 * @param {string} originalValue - The original value of the subtask.
 * @param {string} newValue - The new value of the subtask.
 */
function updateSubtaskInList(originalValue, newValue) {
  const index = subtasksEdit.indexOf(originalValue);
  if (index !== -1) {
    subtasksEdit[index] = newValue;
  }
}


/**
 * Updates a subtask in tasks.
 * @param {string} originalValue - The original value of the subtask.
 * @param {string} newValue - The new value of the subtask.
 */
function updateSubtaskInTasks(originalValue, newValue) {
  for (let i = 0; i < tasks.length; i++) {
    const subtasksDone = tasks[i].subtasksdone;
    const subtaskIndex = subtasksDone.indexOf(originalValue);
    if (subtaskIndex !== -1) {
      subtasksDone[subtaskIndex] = newValue;
    }
  }
}


/**
 * Disables the subtask input.
 * @param {HTMLElement} inputElement - The input element.
 */
function disableSubtaskEditInput(inputElement) {
  inputElement.readOnly = true;
  inputElement.style.backgroundColor = "";
}


/**
 * Hides icons for editing subtask.
 * @param {HTMLElement} entryDiv - The entry div element.
 */
function hideIcons(entryDiv) {
  entryDiv.querySelector(".save-icon-edit").style.display = "none";
  entryDiv.querySelector(".edit-icon-edit").style.display = "none";
  entryDiv.querySelector(".delete-icon-edit").style.display = "none";
}


/**
 * Saves a subtask after editing.
 * @param {Event} event - The event object.
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

