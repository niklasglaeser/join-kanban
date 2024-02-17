let currentDraggedElement;

function updateHTML() {
  let task = tasks.filter((t) => t["progress"] == "todo");

  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < task.length; index++) {
    const element = task[index];
    const taskID = task[index]["id"];
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("todo").innerHTML += generateHTML;
    generateAssignedToInitial(element, taskID);
    generatePrioIcon(element, taskID);
    generateSubTask(element, taskID);
  }

  let inProgress = tasks.filter((t) => t["progress"] == "inProgress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    const taskID = inProgress[index]["id"];
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("inProgress").innerHTML += generateHTML;
    generateAssignedToInitial(element, taskID);
    generatePrioIcon(element, taskID);
  }

  let awaitFeedback = tasks.filter((t) => t["progress"] == "awaitFeedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    const taskID = awaitFeedback[index]["id"];
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("awaitFeedback").innerHTML += generateHTML;
    generateAssignedToInitial(element, taskID);
    generatePrioIcon(element, taskID);
  }

  let done = tasks.filter((t) => t["progress"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    const taskID = done[index]["id"];
    console.log("done" + taskID);
    let generateHTML = generateTodoHTML(element, taskID);
    document.getElementById("done").innerHTML += generateHTML;
    generateAssignedToInitial(element, taskID);
    generatePrioIcon(element, taskID);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element, taskID) {
  return `<div id="task_${taskID}" draggable="true" ondragstart="startDragging(${element["id"]})" onmousedown="rotateTask(${taskID})" onmouseup="rotateTaskEnd(${taskID})" class="task">
  <div class="task-category-wrapper">
  <span class="task-category white">${element["category"]}</span>
  <img id="taskDropdownIcon_${taskID}" src="../img/move-category.svg" onclick="taskDropdown(${taskID})"></img>
  <div id="taskDropdown_${taskID}" class="task-dropdown">
  <span class="font-14-light white"><img src="../img/arrow-left.svg"></img>ToDo</span>
  <span class="font-14-light white"><img src="../img/arrow-left.svg"></img>In Progress</span>
  <span class="font-14-light white"><img src="../img/arrow-left.svg"></img>Await Feedback</span>
  <span class="font-14-light white"><img src="../img/arrow-left.svg"></img>Done</span>
  </div>
  </div>
  <div class="task-description">
  <span class="task-title font-16">${element["title"]}</span>
  <span class="task-description-text font-16-light grey">${element["description"]}</span>
  </div>

  <div class="progressSubtask">
  <progress id="subtasks_${taskID}" value="" max="">  </progress><label for="subtasks_${taskID}"></label>
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
  tasks[currentDraggedElement]["progress"] = progress;
  updateHTML();
}

function moveToMobile(taskID, progress) {
  tasks[taskID]["progress"] = progress;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
  setTimeout(() => {
    document.getElementById(id).classList.remove("drag-area-highlight");
  }, 1500);
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

function generateAssignedToInitial(element, taskID) {
  let initial = document.getElementById(`cardInitial_${taskID}`);
  let assignedArray = element["assignedTo"];
  let totalHTML = "";

  for (let i = 0; i < assignedArray.length; i++) {
    const element = assignedArray[i];
    const color = tasks[taskID]["initial_color"][i];
    if (i < 5) {
      totalHTML += `<div class="cardInitialAssignedTo" style="background-color:${color}">${element}</div>`;
    }
  }
  if (assignedArray.length > 5) {
    totalHTML += `<div class="cardInitialAssignedTo" style="background-color: var(--grey)">+${assignedArray.length}</div>`;
  }
  initial.innerHTML = totalHTML;
}

function generatePrioIcon(element, taskID) {
  let prioIcon = document.getElementById(`prioArrow_${taskID}`);
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
  subtask = element["subtask"];
  subtaskdone = element["subtaskdone"];
  console.log(subtaskdone);
  totalTasks = subtask.length + subtaskdone.length;
  subtaskLabel.innerHTML = `<span>${subtask.length}/${totalTasks} Subtasks</span>`;
  progress.value = subtaskdone.length;
  progress.max = totalTasks;
}

function taskDropdown(taskID) {
  let dropdownContent = document.getElementById(`taskDropdown_${taskID}`);
  if (dropdownContent.style.display === "flex") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "flex";
  }
}

// document.addEventListener("click", function (event) {
//   let isClickInsideDropdown = false;
//   // Finde alle Elemente, deren ID mit "taskDropdown" beginnt
//   let dropdownContents = document.querySelectorAll('[id^="taskDropdown_"]');

//   // Überprüfe jedes gefundene Element
//   dropdownContents.forEach(function (dropdownContent) {
//     // Überprüfe, ob das geklickte Element innerhalb eines Dropdown-Inhalts liegt
//     if (dropdownContent.contains(event.target)) {
//       isClickInsideDropdown = true;
//     }
//   });

//   // Wenn das geklickte Element nicht innerhalb eines Dropdown-Inhalts liegt, schließe alle Dropdown-Menüs
//   if (!isClickInsideDropdown) {
//     dropdownContents.forEach(function (dropdownContent) {
//       dropdownContent.style.display = "none";
//     });
//   }
// });
