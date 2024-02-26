function changePencilIcon() {
  let icon = document.getElementById("firstRowDivPencilIcon");

  icon.src = "../img/pencil-icon-invert.svg";
}

function changePencilIconBack() {
  let icon = document.getElementById("firstRowDivPencilIcon");

  icon.src = "../img/pencil-icon.svg";
}

function changeHakenIcon() {
  let icon = document.getElementById("firstRowDivHakenIcon");

  icon.src = "../img/haken-icon-invert.svg";
}

function changeHakenIconBack() {
  let icon = document.getElementById("firstRowDivHakenIcon");

  icon.src = "../img/haken-icon.svg";
}

function welcomeMessage() {
  const HOUR = new Date().getHours();
  let greeting;

  if (HOUR > 6 && HOUR < 12) {
    greeting = "Good Morning,";
  } else if (HOUR >= 12 && HOUR < 18) {
    greeting = "Good Afternoon,";
  } else {
    greeting = "Good Evening,";
  }
  document.getElementById("welcomeMessage").innerHTML = greeting;
  document.getElementById("welcomeMessageMobil").innerHTML = greeting;
}

function loadOpenTodos() {
  let countTaskToDoValue = tasks.filter((t) => t["progress"] == "todo").length;
  let countTaskDoneValue = tasks.filter((t) => t["progress"] == "done").length;
  let countTaskInprogressValue = tasks.filter(
    (t) => t["progress"] == "inProgress"
  ).length;
  let countTaskAwaitFeedbackValue = tasks.filter(
    (t) => t["progress"] == "awaitFeedback"
  ).length;
  let countTaskUrgentValue = tasks.filter((t) => t["prio"] == "urgent").length;
  countTaskToDo.innerHTML = countTaskToDoValue;
  countTaskDone.innerHTML = countTaskDoneValue;
  countTaskInprogress.innerHTML = countTaskInprogressValue;
  countTaskAwaitFeedback.innerHTML = countTaskAwaitFeedbackValue;
  countTaskUrgent.innerHTML = countTaskUrgentValue;
  countTasks.innerHTML = tasks.length;
}

function taskUrgentDeadline() {
  let taskUrgentDeadline = document.getElementById("taskUrgentDeadline");
  let urgentDate = [];
  for (let i = 0; i < tasks.length; i++) {
    const date = tasks[i]["dueDate"];
    urgentDate.push(date);
  }
  urgentDate.sort();
  taskUrgentDeadline.innerHTML = urgentDate[0];
}

function openSummary() {
  window.location.href = "../pages/board.html";
}
