let todos = [
  {
    id: 0,
    title: "Putzen",
    category: "todo",
  },
  {
    id: 1,
    title: "Kochen",
    category: "todo",
  },
  {
    id: 2,
    title: "Einkaufen",
    category: "inProgress",
  },
  {
    id: 3,
    title: "Einkaufen1",
    category: "inProgress",
  },
  {
    id: 4,
    title: "Einkaufen4",
    category: "inProgress",
  },
  {
    id: 5,
    title: "Einkaufen2",
    category: "inProgress",
  },
];

let currentDraggedElement;

function updateHTML() {
  let todo = todos.filter((t) => t["category"] == "todo");

  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    document.getElementById("todo").innerHTML += generateTodoHTML(element);
  }

  let inProgress = todos.filter((t) => t["category"] == "inProgress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateTodoHTML(element);
  }

  let awaitFeedback = todos.filter((t) => t["category"] == "awaitFeedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateTodoHTML(element);
  }

  let done = todos.filter((t) => t["category"] == "done");

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
  return `<div draggable="true" ondragstart="startDragging(${element["id"]})" class="todo">${element["title"]}</div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]["category"] = category;
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
