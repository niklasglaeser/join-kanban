/**
 * Changes the pencil icon.
 */
function changePencilIcon() {
  let icon = document.getElementById("firstRowDivPencilIcon");
  icon.src = "../img/pencil-icon-invert.svg";
}


/**
 * Changes the pencil icon to original version.
 */
function changePencilIconBack() {
  let icon = document.getElementById("firstRowDivPencilIcon");
  icon.src = "../img/pencil-icon.svg";
}


/**
 * Changes the checkmark icon.
 */
function changeHakenIcon() {
  let icon = document.getElementById("firstRowDivHakenIcon");
  icon.src = "../img/haken-icon-invert.svg";
}


/**
 * Changes the checkmark icon to original version.
 */
function changeHakenIconBack() {
  let icon = document.getElementById("firstRowDivHakenIcon");

  icon.src = "../img/haken-icon.svg";
}


/**
 * Displays the welcome message based on the time of the day.
 */
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


/**
 * Loads and updates the counts of tasks in progress states.
 */
function loadOpenTodos() {
  let countTaskToDoValue = tasks.filter((t) => t["progress"] == "todo").length;
  let countTaskDoneValue = tasks.filter((t) => t["progress"] == "done").length;
  let countTaskInprogressValue = tasks.filter((t) => t["progress"] == "inProgress").length;
  let countTaskAwaitFeedbackValue = tasks.filter((t) => t["progress"] == "awaitFeedback").length;
  let countTaskUrgentValue = tasks.filter((t) => t["prio"] == "urgent").length;
  countTaskToDo.innerHTML = countTaskToDoValue;
  countTaskDone.innerHTML = countTaskDoneValue;
  countTaskInprogress.innerHTML = countTaskInprogressValue;
  countTaskAwaitFeedback.innerHTML = countTaskAwaitFeedbackValue;
  countTaskUrgent.innerHTML = countTaskUrgentValue;
  countTasks.innerHTML = tasks.length;
}


/**
 * Updates the urgent task deadline.
 */
function taskUrgentDeadline() {
  let taskUrgentDeadline = document.getElementById("taskUrgentDeadline");
  let urgentDates = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]["prio"] === "urgent" && tasks[i]["dueDate"]) {
      let date = tasks[i]["dueDate"];
      urgentDates.push(date);
    }
  }
  urgentDates.sort();
  if (urgentDates.length > 0) {
    taskUrgentDeadline.innerHTML = urgentDates[0];
  } else {
    taskUrgentDeadline.innerHTML = "No date found";
  }
}


/**
 * Redirects the user to the board page.
 */
function openSummary() {
  window.location.href = "../pages/board.html";
}
