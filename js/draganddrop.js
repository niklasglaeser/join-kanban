/**
 * currentDraggedElement -> drag and drop function
 */
let currentDraggedElement;

/**
 * Prevents the default behavior of an event.
 * @param {Event} ev The event object.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Initiates the dragging process by setting the current dragged element.
 * @param {string} taskID The ID of the task being dragged.
 */
function startDragging(taskID) {
  currentDraggedElement = taskID;
}

/**
 * Moves a task to a new progress status and updates the dashboard.
 * @param {string} progress The progress status to move the task to.
 */
function moveTo(progress) {
  let index = tasks.findIndex((element) => element.id === currentDraggedElement);
  tasks[index]["progress"] = progress;
  updateHTML();
}

/**
 * Moves a task to a new progress status on mobile devices and updates the dashboard.
 * @param {string} taskID The ID of the task to move.
 * @param {string} progress The progress status to move the task to.
 */
function moveToMobile(taskID, progress) {
  let index = tasks.findIndex((element) => element.id === taskID);
  tasks[index]["progress"] = progress;
  updateHTML();
}

/**
 * Highlights a drag area.
 * @param {string} id The ID of the drag area to highlight.
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * Removes the highlight from a drag area.
 * @param {string} id The ID of the drag area to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

/**
 * Rotates a task card for dragging.
 * @param {string} taskID The ID of the task card to rotate.
 */
function rotateTask(taskID) {
  currentCardDragged = taskID;
  document.getElementById(`task_${taskID}`).classList.add("rotate-task");
}

/**
 * Reverts the rotation of a task card after dragging.
 * @param {string} taskID The ID of the task card to revert rotation.
 */
function rotateTaskEnd(taskID) {
  currentCardDragged = taskID;
  document.getElementById(`task_${taskID}`).classList.remove("rotate-task");
}
