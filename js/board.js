/**
 * Update Cards on Dashboard - all tasks or filtered tasks
 * @param {object} filteredTasks
 */
async function updateHTML(filteredTasks) {
  let progress = ["todo", "inProgress", "awaitFeedback", "done"];
  let statusText = ["To Do", "In Progress", "Await feedback", "Done"];

  progress.forEach(async (status, i) => {
    let filtered = filteredTasks ? filteredTasks.filter((task) => task.progress === status) : tasks.filter((task) => task.progress === status);
    let element = document.getElementById(status);
    element.innerHTML = "";
    if (filtered.length < 1) {
      element.innerHTML = `<div id="area_${status}" class="noTask">No task in ${statusText[i]}</div>`;
    } else {
      await updateTasksInStatus(filtered, element);
    }
  });
  await saveTasks();
}

/**
 * helper for Update Cards on Dashboard - all tasks or filtered tasks 
 * @param {object} filtered 
 * @param {object} element 
 */
async function updateTasksInStatus(filtered, element) {
  filtered.forEach(async (task) => {
    let taskID = task.id;
    let generateHTML = generateTodoHTML(task, taskID);
    element.innerHTML += generateHTML;
    updateCategoryStyles();
    generateAssignedToInitial(task, taskID, "cardInitial", "cardInitialAssignedTo", 5);
    generatePrioIcon(task, taskID, "prioArrow");
    generateSubTask(task, taskID);
  });
}


/**
 * read search input (title/description) and update cards
 */
function filterTasks() {
  let searchText = document.getElementById("searchInput").value.toLowerCase();
  let filteredTasks = tasks.filter((task) => (task.title && task.title.toLowerCase().includes(searchText)) || (task.description && task.description.toLowerCase().includes(searchText)));
  updateHTML(filteredTasks);
}


/**
 * Generates initials of assigned users for a task
 * @param {Object} element The task object with assigned user information.
 * @param {number} i index of the task.
 * @param {string} initialID ID of the element.
 * @param {string} divClass CSS class for styling initials.
 * @param {number} value maximum number of initials to display.
 */
function generateAssignedToInitial(element, i, initialID, divClass, value) {
  let initial = document.getElementById(`${initialID}_${i}`);
  let assignedArray = element["assignedTo"];
  let totalHTML = "";

  for (let i = 0; i < assignedArray.length; i++) {
    let element = assignedArray[i];
    let color = element["initial_color"];
    if (i < value) {
      totalHTML += `<div class="${divClass}" style="background-color:${color}">${element.initial}</div>`;
    }
  }
  if (assignedArray.length > value) {
    totalHTML += `<div class="${divClass}" style="background-color: var(--grey)">+${assignedArray.length - value}</div>`;
  }
  initial.innerHTML = totalHTML;
}


/**
 *  Generates initials of assigned users for a task
 * @param {Object} element task object with assigned user information.
 * @param {string} taskID ID of the task.
 * @param {string} nameID ID of the element.
 * @param {number} value maximum number of names to display.
 */
function generateAssignedToInitialName(element, taskID, nameID, value) {
  let initial = document.getElementById(`${nameID}_${taskID}`);
  let assignedArray = element["assignedTo"];
  let renderHTML = "";

  for (let i = 0; i < assignedArray.length; i++) {
    let element = assignedArray[i];
    if (i < value) {
      renderHTML += `<div class="overlayTaskAssignedToName font-20-light">${element.name}</div>`;
    }
  }
  if (assignedArray.length > value) {
    renderHTML += `<div class="overlayTaskAssignedToName font-20-light">more users</div>`;
  }
  initial.innerHTML = renderHTML;
}


/**
 * Generates priority icons of the task.
 * @param {Object} element task object with prio information.
 * @param {number} i index of the task.
 * @param {string} idElement ID of the task.
 */
function generatePrioIcon(element, i, idElement) {
  let icons = {
    low: "../img/symbol-low.svg",
    medium: "../img/symbol-medium.svg",
    urgent: "../img/symbol-urgent.svg",
  };
  let prioIcon = document.getElementById(`${idElement}_${i}`);
  prioIcon.src = icons[element["prio"]];
}


/**
 * Generates subtasks progress information and updates the display accordingly.
 * @param {Object} element The task object containing subtask information.
 * @param {string} taskID The ID of the task.
 */
function generateSubTask(element, taskID) {
  let progress = document.getElementById(`subtasks_${taskID}`);
  let subtaskLabel = document.querySelector(`label[for="subtasks_${taskID}"]`);
  let progressBar = document.getElementById(`progressSubtask_${taskID}`);

  if (element["subtasks"].length > 0) {
    progressBar.style.display = "flex";
    subtask = element["subtasks"];
    subtaskdone = element["subtasksdone"];
    subtaskLabel.innerHTML = `<span>${subtaskdone.length}/${subtask.length} Subtasks</span>`;
    progress.value = subtaskdone.length;
    progress.max = subtask.length;
  } else {
    progressBar.style.display = "none";
  }
}


/**
 * toggle the move to progress mobile popup.
 * @param {string} taskID ID of the task.
 */
function taskOpenDropdown(taskID) {
  let dropdownContent = document.getElementById(`taskDropdown_${taskID}`);
  if (dropdownContent.style.display === "flex") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "flex";
  }
}


/**
 * click event outside of task dropdowns and hides them.
 * @param {Event} event The click event.
 */
document.addEventListener("click", function (event) {
  let isClickInsideDropdown = false;
  let dropdownContents = document.querySelectorAll('[id^="taskDropdown_"]');

  dropdownContents.forEach(function (dropdownContent) {
    if (dropdownContent.contains(event.target)) {
      isClickInsideDropdown = true;
    }
  });
  if (event.target.id.startsWith("taskDropdownIcon_")) {
    isClickInsideDropdown = true;
  }
  if (!isClickInsideDropdown) {
    dropdownContents.forEach(function (dropdownContent) {
      dropdownContent.style.display = "none";
    });
  }
});


/**
 * render subtasks for the task .
 * @param {number} i sindex of the task.
 */
function renderSubtasksTask(i) {
  let subtasksListTaskDiv = document.getElementById("subtasksListTask");
  subtasksListTaskDiv.innerHTML = "";
  let subtasksRender = tasks[i].subtasks;
  let subtasksDoneRender = tasks[i].subtasksdone;

  for (let j = 0; j < subtasksRender.length; j++) {
    let subtask = subtasksRender[j];
    let isSelected = subtasksRender.includes(subtask) && subtasksDoneRender.includes(subtask);
    let selectedClass = isSelected ? "selectedTask" : "";
    subtasksListTaskDiv.innerHTML += renderSubtasksTaskHTML(i, j, subtask, selectedClass, isSelected);
  }
}


/**
 * Toggles the selection state of a subtask.
 * @param {HTMLElement} entry element of the subtask entry.
 * @param {number} taskId ID of the task.
 * @param {number} subtaskIndex index of the subtask .
 */
async function selectSubtask(entry, taskId, subtaskIndex) {
  let isSelected = entry.classList.toggle("selectedTask");
  let subtask = tasks[taskId].subtasks[subtaskIndex];

  if (isSelected) {
    tasks[taskId].subtasksdone.push(subtask);
    await setItem("tasks", JSON.stringify(tasks));
    entry.style.backgroundColor = "";
    entry.querySelector("img").src = "../img/checkedtask-button.svg";
  } else {
    let index = tasks[taskId].subtasksdone.findIndex((item) => item === subtask);
    tasks[taskId].subtasksdone.splice(index, 1);
    await setItem("tasks", JSON.stringify(tasks));
    entry.style.backgroundColor = "";
    entry.querySelector("img").src = "../img/check-button.svg";
  }
}


/**
 * show/hide edit popup and render editcard.
 * @param {number} i index of the task .
 */
function editTask(i) {
  let popup = document.getElementById("taskPopup");
  let popupEdit = document.getElementById("taskPopupEdit");
  let element = tasks[i];

  if (popup.style.display !== "none") {
    popup.style.display = "none";
    popupEdit.classList.remove("d-none");
    popupEdit.style.display = "flex";
    renderAssignmentContactsEdit(i);
    renderAssignedToArrayEdit(tasks, i);
    renderSubtasksEdit(i);
    enableEnterForNewLineEditTask();
  } else {
    popup.style.display = "flex";
    popupEdit.classList.add("d-none");
    subtasksEdit = [];
    renderTask (i, element)
  }
}


/**
 * show/hide popup and render card.
 * @param {number} i index of the task .
 */
function togglePopup(taskID) {
  let overlay = document.getElementById("overlay");
  let popup = document.getElementById("popup");
  let i = tasks.findIndex((element) => element.id === taskID);
  let element = tasks[i];

  if (popupVisible(overlay, popup)) {
    updateHTML();
    hidePopup(overlay, popup);
    subtasks = [];
  } else {
    showPopup(overlay, popup);
    renderTask (i, element)
  }
}


/**
 * render task details in card
 * @param {number} i 
 * @param {*} element 
 */
function renderTask (i, element) {
  generateCard(i);
  renderSubtasksTask(i);
  generatePrioIcon(element, i, "prioArrowCard");
  generateAssignedToInitial(element, i, "cardInitalCard", "overlayTaskAssignedToInitial", 2);
  generateAssignedToInitialName(element, i, "cardInitalCardName", 2);
}


/**
 * Checks if the overlay and popup elements are visible.
 * @param {HTMLElement} overlay overlay element.
 * @param {HTMLElement} popup popup element.
 * @returns {boolean} True if both overlay and popup are visible, otherwise false.
 */
function popupVisible(overlay, popup) {
  return overlay.classList.contains("overlay-show") && popup.classList.contains("popup-slideIn");
}


/**
 * Hides the overlay and popup elements.
 * @param {HTMLElement} overlay overlay element.
 * @param {HTMLElement} popup popup element.
 */
async function hidePopup(overlay, popup) {
  overlay.classList.remove("overlay-show");
  overlay.classList.add("d-none");
  popup.classList.remove("popup-slideIn");
}


/**
 * Shows the overlay and popup elements.
 * @param {HTMLElement} overlay overlay element.
 * @param {HTMLElement} popup popup element.
 */
function showPopup(overlay, popup) {
  overlay.classList.add("overlay-show");
  overlay.classList.remove("d-none");
  popup.classList.add("popup-slideIn");
}


/**
 * Opens add task popup .
 * @param {string} progressType progress of the task.
 */
function openAddTaskPopUp(progressType) {
  let overlay = document.getElementById("overlay");
  let addTaskPopUp = document.getElementById("popUpAddTaskContainer");
  progress = progressType;

  if (popupVisible(overlay, addTaskPopUp)) {
    hidePopup(overlay, addTaskPopUp);
  } else {
    showPopup(overlay, addTaskPopUp);
  }
}


/**
 * Stops the propagation of the event.
 * @param {Event} event event to stop propagation.
 */
function stopPropagation(event) {
  event.stopPropagation();
}


/**
 * click outside the card - close the card - update cards and clear helper array
 * @param {Event} event click event.
 */
document.addEventListener("click", (event) => {
  if (event.target.id === "popup" || event.target.id === "popUpAddTaskContainer") {
    hidePopup(overlay, popup);
    hidePopup(overlay, popUpAddTaskContainer);
    updateHTML();
    subtasksEdit = [];
  }
});

/**
 * update color from category on dashboard
 */
function updateCategoryStyles() {
  document.querySelectorAll('.task-category').forEach(function(categorySpan) {
    if (categorySpan.textContent === "User Story") {
      categorySpan.style.backgroundColor = '#0038FF';
    } else {
      categorySpan.style.backgroundColor = '#1FD7C1';
    }
  });
}


/**
 * save the task to remote storage
 */
async function saveTasks() {
  try {
    await setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}