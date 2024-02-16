let currentDraggedElement;

function updateHTML() {
  let task = tasks.filter((t) => t["progress"] == "todo");

  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < task.length; index++) {
    const element = task[index];
    document.getElementById("todo").innerHTML += generateTodoHTML(element);
  }

  let inProgress = tasks.filter((t) => t["progress"] == "inProgress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateTodoHTML(element);
  }

  let awaitFeedback = tasks.filter((t) => t["progress"] == "awaitFeedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateTodoHTML(element);
  }

  let done = tasks.filter((t) => t["progress"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("done").innerHTML += generateTodoHTML(element);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element) {
  return `<div draggable="true" ondragstart="startDragging(${element["id"]})" class="task">
  <p class="task-category white">${element["category"]}</p>
  <div>
  <p class="task-title font-16">${element["title"]}</p>
  <div class="task-description">
  <p class="task-description-text font-16-light grey">${element["description"]}</p>
  </div>
  </div>
  <div class="progressSubtask">
  <progress id="subtasks" value="32" max="100">  </progress><label for="subtasks">1/2 Subtasks</label>
  </div>
  <div class="task-footer">
    <div>Initial</div>
    <div>Prio Arrow</div>
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

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
  setTimeout(() => {
    document.getElementById(id).classList.remove("drag-area-highlight");
  }, 1500);
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}
