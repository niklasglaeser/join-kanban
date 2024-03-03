let currentDraggedElement;

async function updateHTML(filteredTasks) {
  let tasksFilter = [];
  if (filteredTasks) {
    tasksFilter = filteredTasks;
  } else {
    tasksFilter = tasks;
  }

  let progress = ["todo", "inProgress", "awaitFeedback", "done"];

  progress.forEach((element) => {
    document.getElementById(`${element}`).innerHTML = "";
  });

  let task = tasksFilter.filter((t) => t["progress"] == "todo");

  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < task.length; index++) {
    const element = task[index];
    const taskID = task[index]["id"];
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("todo").innerHTML += generateHTML;
    generateAssignedToInitial(
      element,
      taskID,
      "cardInitial",
      "cardInitialAssignedTo",
      5
    );
    generatePrioIcon(element, taskID, "prioArrow");
    generateSubTask(element, taskID);
  }

  if (task.length < 1) {
    document.getElementById(
      "todo"
    ).innerHTML = `<div id="area_todo" class="noTask">No task in todo</div>`;
  }

  let inProgress = tasksFilter.filter((t) => t["progress"] == "inProgress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    const taskID = inProgress[index]["id"];
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("inProgress").innerHTML += generateHTML;
    generateAssignedToInitial(
      element,
      taskID,
      "cardInitial",
      "cardInitialAssignedTo",
      5
    );
    generatePrioIcon(element, taskID, "prioArrow");
    generateSubTask(element, taskID);
  }

  if (inProgress.length < 1) {
    document.getElementById(
      "inProgress"
    ).innerHTML = `<div id="area_inProgress" class="noTask">No task in progress</div>`;
  }

  let awaitFeedback = tasksFilter.filter(
    (t) => t["progress"] == "awaitFeedback"
  );

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    const taskID = awaitFeedback[index]["id"];
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("awaitFeedback").innerHTML += generateHTML;
    generateAssignedToInitial(
      element,
      taskID,
      "cardInitial",
      "cardInitialAssignedTo",
      5
    );
    generatePrioIcon(element, taskID, "prioArrow");
    generateSubTask(element, taskID);
  }

  if (awaitFeedback.length < 1) {
    document.getElementById(
      "awaitFeedback"
    ).innerHTML = `<div id="area_awaitFeedback" class="noTask">No task in Await feedback</div>`;
  }

  let done = tasksFilter.filter((t) => t["progress"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    const taskID = done[index]["id"];
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("done").innerHTML += generateHTML;
    generateAssignedToInitial(
      element,
      taskID,
      "cardInitial",
      "cardInitialAssignedTo",
      5
    );
    generatePrioIcon(element, taskID, "prioArrow");
    generateSubTask(element, taskID);
  }
  if (done.length < 1) {
    document.getElementById(
      "done"
    ).innerHTML = `<div id="area_done" class="noTask">No task in done</div>`;
  }

  try {
    await setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

function filterTasks() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const filteredTasks = tasks.filter(
    (task) =>
      (task.title && task.title.toLowerCase().includes(searchText)) ||
      (task.description && task.description.toLowerCase().includes(searchText))
  );
  updateHTML(filteredTasks);
}

function startDragging(taskID) {
  currentDraggedElement = taskID;
}

function generateTodoHTML(element, taskID) {
  return `<div id="task_${taskID}" onclick="togglePopup(${taskID});stopPropagation(event);" draggable="true" ondragstart="startDragging(${taskID})" onmousedown="rotateTask(${taskID})" onmouseup="rotateTaskEnd(${taskID})" class="task">
  <div class="task-category-wrapper">
  <span class="task-category white">${element["category"]}</span>
  <img id="taskDropdownIcon_${taskID}" class="moveToIcon" src="../img/move-category.svg" onclick="taskOpenDropdown(${taskID});stopPropagation(event);"></img>
  <div id="taskDropdown_${taskID}" class="task-dropdown">
  <span class="font-14-light white" onclick="moveToMobile(${taskID},'todo');stopPropagation(event);"><img src="../img/arrow-left.svg"></img>ToDo</span>
  <span class="font-14-light white" onclick="moveToMobile(${taskID},'inProgress');stopPropagation(event);"><img src="../img/arrow-left.svg"></img>In Progress</span>
  <span class="font-14-light white" onclick="moveToMobile(${taskID},'awaitFeedback');stopPropagation(event);"><img src="../img/arrow-left.svg"></img>Await Feedback</span>
  <span class="font-14-light white" onclick="moveToMobile(${taskID},'done');stopPropagation(event);"><img src="../img/arrow-left.svg"></img>Done</span>
  </div>
  </div>
  <div class="task-description">
  <span class="task-title font-16">${element["title"]}</span>
  <span class="task-description-text font-16-light grey">${element["description"]}</span>
  </div>

  <div class="progressSubtask">
  <progress id="subtasks_${taskID}" value="" max=""></progress><label for="subtasks_${taskID}"></label>
  </div>
  <div class="task-footer">
    <div id="cardInitial_${taskID}" class="cardInitial">

    </div>
    <img id="prioArrow_${taskID}"></img>
  </div>
  </div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(progress) {
  let index = tasks.findIndex(
    (element) => element.id === currentDraggedElement
  );
  console.log(index);
  tasks[index]["progress"] = progress;
  updateHTML();
}

function moveToMobile(taskID, progress) {
  tasks[taskID]["progress"] = progress;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function rotateTask(taskID) {
  currentCardDragged = taskID;
  document.getElementById(`task_${taskID}`).classList.add("rotate-task");
}

function rotateTaskEnd(taskID) {
  currentCardDragged = taskID;
  document.getElementById(`task_${taskID}`).classList.remove("rotate-task");
}

function generateAssignedToInitial(element, i, initialID, divClass, value) {
  let initial = document.getElementById(`${initialID}_${i}`);
  let assignedArray = element["assignedTo"];
  let totalHTML = "";

  for (let i = 0; i < assignedArray.length; i++) {
    const element = assignedArray[i];
    const color = element["initial_color"];
    if (i < value) {
      totalHTML += `<div class="${divClass}" style="background-color:${color}">${element.initial}</div>`;
    }
  }
  if (assignedArray.length > value) {
    totalHTML += `<div class="${divClass}" style="background-color: var(--grey)">+${
      assignedArray.length - value
    }</div>`;
  }
  initial.innerHTML = totalHTML;
}

function generateAssignedToInitialName(element, taskID, nameID, value) {
  let initial = document.getElementById(`${nameID}_${taskID}`);
  let assignedArray = element["assignedTo"];
  let totalHTML = "";

  for (let i = 0; i < assignedArray.length; i++) {
    const element = assignedArray[i];
    const color = tasks[taskID]["assignedTo"][i]["name"];
    if (i < value) {
      totalHTML += `<div class="overlayTaskAssignedToName font-20-light">${element.name}</div>`;
    }
  }
  if (assignedArray.length > value) {
    totalHTML += `<div class="overlayTaskAssignedToName font-20-light">more users</div>`;
  }
  initial.innerHTML = totalHTML;
}

function generatePrioIcon(element, i, idElement) {
  let prioIcon = document.getElementById(`${idElement}_${i}`);
  let prio = element["prio"];
  if (prio == "low") {
    prioIcon.src = "../img/symbol-low.svg";
  }
  if (prio == "medium") {
    prioIcon.src = "../img/symbol-medium.svg";
  }
  if (prio == "urgent") {
    prioIcon.src = "../img/symbol-urgent.svg";
  }
}

function generateSubTask(element, taskID) {
  let progress = document.getElementById(`subtasks_${taskID}`);
  let subtaskLabel = document.querySelector(`label[for="subtasks_${taskID}"]`);
  subtask = element["subtasks"];
  subtaskdone = element["subtasksdone"];
  subtaskLabel.innerHTML = `<span>${subtaskdone.length}/${subtask.length} Subtasks</span>`;
  progress.value = subtaskdone.length;
  progress.max = subtask.length;
}

function taskOpenDropdown(taskID) {
  let dropdownContent = document.getElementById(`taskDropdown_${taskID}`);
  if (dropdownContent.style.display === "flex") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "flex";
  }
}

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

function generateCard(i) {
  let task = tasks[i];
  overlayTask.innerHTML = /*HTML*/ `
    <div id="taskPopup" class="overlayTaskWrapper">
    <div class="overlayTaskHeader">
        <div class="task-category font-21-light white">${task.category}</div>
        <img id="closeBtn" class="overlayTaskClose" onclick="togglePopup()"
            src="../img/close-btn-black.svg">
    </div>
    <div class="overlayTaskHeadline font-61">${task.title}</div>
    <div class="overlayTaskDescription font-20-light">${task.description}</div>
    <div class="overlayTaskDate font-20-light">
        <div>Due Date:</div>
        <div>${task.dueDate}</div>
    </div>
    <div class="overlayTaskPrio font-20-light">
        <div>Priority:</div>
        <div style="text-transform: capitalize;">${task.prio}<img id="prioArrowCard_${i}"></div>
    </div>
    <div class="font-20-light">Assigned To:</div>
    <div class="">
        <div class="overlayTaskAssignedTo">
            <div id="cardInitalCard_${i}" class="overlayTaskAssignedToInitial"></div>
            <div id="cardInitalCardName_${i}"></div>
        </div>
    </div>
    <div class="font-20-light">Subtasks:</div>
    <div id="subtasksListTask"></div>
    <div class="overlayTaskFooter">
        <div class="overlayTaskFooterWrapper">
            <a onclick="editTask()" class="pointer"><img src="../img/edit.svg" alt="">EDIT</a>
            <img src="../img/stroke-horizontal-grey.svg" class="overlayTaskLine">
            <a onclick="deleteOneTask(${i})" class="pointer"><img src="../img/delete.svg" alt="">DELETE</a>
        </div>

    </div>
  </div>


  <div id="taskPopupEdit" class="d-none">
    <div class="overlayTaskHeader">
        <img id="closeBtn" class="overlayTaskClose" onclick="togglePopup()" src="../img/close-btn-black.svg">
    </div>
    <form class="overlayTaskEditForm" onsubmit="saveEditTask(); return false;">
      <div>
        <div class="font-21-light">Title</div>
        <input type="text" id="titleInputEdit" value='${task.title}'>
      </div>
      <div id="errorTitle"></div>
      <div>
        <div class="font-21-light">Description</div>
        <textarea id="descriptionInputEdit" placeholder="Enter a Description">${task.description}</textarea>
      </div>
      <div>
        <div class="font-21-light">Due Date</div>
        <input type="date" id="dueDateInputEdit" value='${task.dueDate}'>
      </div>
      <div>
        <div>Prio</div>
        <div class="prio-selection-container-edit">
          <div id="urgentButtonEdit" onclick="changePriorityEdit('urgentButtonEdit', 'urgent')">Urgent<img src="../img/urgent-button-icon.svg"></div>
          <div id="mediumButtonEdit" onclick="changePriorityEdit('mediumButtonEdit', 'medium')">Medium<img src="../img/medium-button-icon.svg"></div>
          <div id="lowButtonEdit" onclick="changePriorityEdit('lowButtonEdit', 'low')">Low <img src="../img/low-button-icon.svg"></div>
        </div>
      </div>
      <div>
        <div>Assigned to</div>
        <div class="assignment-dropdown-edit">
          <div id="assignmentSelectEdit" onclick="toggleAssignmentDropdownEdit()">
            Select contacts to assign
            <img src="../img/dropdown-icon.svg" id="dropdownIconEdit">
          </div>
          <div id="renderedAssignedToContactsEdit"></div>
          <div id="assignmentDropdownListEdit">
            <div class="assignment-dropdown-list-entry-edit"></div>
          </div>
        </div>
      </div>
      <div>
        <div>Subtasks</div>
        <div id="subtasksInputEdit">
          <input type="text" placeholder="Add new subtask" id="subTaskInputEdit" oninput="acitivateSubtaskEditorEdit()">
          <div id="imageContainerEdit">
            <img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInputEditor()">
          </div>
          </div>
            <div id="subtasksListEdit"></div>
          </div>
    </form>
  </div>

  `;
  buttonIdEdit = task.prio + "ButtonEdit";
  priority = task.prio;
  changePriorityEdit(buttonIdEdit, priority);
}


function renderSubtasksTask(i) {
  const subtasksListTaskDiv = document.getElementById("subtasksListTask");
  subtasksListTaskDiv.innerHTML = "";
  const subtasksRender = tasks[i].subtasks;
  const subtasksDoneRender = tasks[i].subtasksdone;

  for (let j = 0; j < subtasksRender.length; j++) {
    const subtask = subtasksRender[j];
    const isSelected = subtasksRender.includes(subtask) && subtasksDoneRender.includes(subtask);
    const selectedClass = isSelected ? "selectedTask" : "";

    subtasksListTaskDiv.innerHTML += `
      <div class="subtask-list-task-entry ${selectedClass}" onclick="selectSubtask(this, ${i}, ${j})">
        <img src="../img/${isSelected ? "checkedtask" : "check"}-button.svg"> <!-- Change img based on selection -->
        <div>${subtask}</div>
      </div>
    `;
  }
}



async function selectSubtask(entry, taskId, subtaskIndex) {
  let isSelected = entry.classList.toggle("selectedTask");
  let subtask = tasks[taskId].subtasks[subtaskIndex];

  if (isSelected) {
    tasks[taskId].subtasksdone.push(subtask);
    await setItem("tasks", JSON.stringify(tasks));
    entry.style.backgroundColor = "";
    entry.querySelector("img").src = "../img/checkedtask-button.svg";
  } else {
    let index = tasks[taskId].subtasksdone.findIndex(
      (item) => item === subtask
    );
    tasks[taskId].subtasksdone.splice(index, 1);
    await setItem("tasks", JSON.stringify(tasks));
    entry.style.backgroundColor = "";
    entry.querySelector("img").src = "../img/check-button.svg";
  }
}







function editTask() {
  let popup = document.getElementById("taskPopup");
  let popupEdit = document.getElementById("taskPopupEdit");

  popup.style.display = "none";
  popupEdit.classList.remove("d-none");
}

function togglePopup(taskID) {
  let overlay = document.getElementById("overlay");
  let popup = document.getElementById("popup");
  let i = tasks.findIndex((element) => element.id === taskID);
  let element = tasks[i];

  if (popupVisible(overlay, popup)) {
    updateHTML();
    hidePopup(overlay, popup);
    // changePriority("mediumButton", "medium");
    subtasks = [];
  } else {
    showPopup(overlay, popup);
    generateCard(i);
    renderSubtasksTask(i);
    generatePrioIcon(element, i, "prioArrowCard");
    generateAssignedToInitial(
      element,
      i,
      "cardInitalCard",
      "overlayTaskAssignedToInitial",
      3
    );
    generateAssignedToInitialName(element, i, "cardInitalCardName", 3);
    renderAssignmentContactsEdit(i);
    renderAssignedToArrayEdit(tasks, i);
    renderSubtasksEdit(i);
  }
}

function popupVisible(overlay, popup) {
  return (
    overlay.classList.contains("overlay-show") &&
    popup.classList.contains("popup-slideIn")
  );
}

async function hidePopup(overlay, popup) {
  overlay.classList.remove("overlay-show");
  overlay.classList.add("d-none");
  popup.classList.remove("popup-slideIn");
}

function showPopup(overlay, popup) {
  overlay.classList.add("overlay-show");
  overlay.classList.remove("d-none");
  popup.classList.add("popup-slideIn");
}

function openAddTaskPopUp() {
  let overlay = document.getElementById("overlay");
  let addTaskPopUp = document.getElementById("popUpAddTaskContainer");

  if (popupVisible(overlay, addTaskPopUp)) {
    hidePopup(overlay, addTaskPopUp);
  } else {
    showPopup(overlay, addTaskPopUp);
    // addTaskPopUp.style.display = "flex";
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

// function closeAddTaskPopUp() {
//   let addTaskPopUp = document.getElementById("popUpAddTaskContainer");

//   addTaskPopUp.style.display = "none";
// }

function openAddTaskPage() {
  window.location.href = "../pages/addtask.html";
}

document.addEventListener("click", (event) => {
  if (
    event.target.id === "popup" ||
    event.target.id === "popUpAddTaskContainer"
  ) {
    hidePopup(overlay, popup);
    hidePopup(overlay, popUpAddTaskContainer);
    updateHTML();
  }
});
