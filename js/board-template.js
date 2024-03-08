/**
 * Generates task and returns .
 * @param {Object} element task object with task details.
 * @param {number} taskID ID of the task.
 * @returns {string} generated card .
 */
function generateTodoHTML(element, taskID) {
  return `<div id="task_${taskID}" onclick="togglePopup(${taskID});stopPropagation(event);" draggable="true" ondragstart="startDragging(${taskID})" onmousedown="rotateTask(${taskID})" onmouseup="rotateTaskEnd(${taskID})" class="task">
  <div class="task-category-wrapper">
    <span class="task-category white">${element["category"]}</span>
    <img id="taskDropdownIcon_${taskID}" class="moveToIcon" src="../img/move-category.svg" onclick="taskOpenDropdown(${taskID});stopPropagation(event);"></img>
    <div id="taskDropdown_${taskID}" class="task-dropdown">
      <span class="font-14-light white ${element["progress"] === "todo" ? "disabledMoveToIcon" : ""}" style="${element["progress"] === "todo" ? "display: none;" : ""}" onclick="${element["progress"] !== "todo" ? `moveToMobile(${taskID},'todo');stopPropagation(event);` : ""}"><img src="../img/arrow-left.svg"></img>ToDo</span>
      <span class="font-14-light white ${element["progress"] === "inProgress" ? "disabledMoveToIcon" : ""}" style="${element["progress"] === "inProgress" ? "display: none;" : ""}" onclick="${element["progress"] !== "inProgress" ? `moveToMobile(${taskID},'inProgress');stopPropagation(event);` : ""}"><img src="../img/arrow-left.svg"></img>In Progress</span>
      <span class="font-14-light white ${element["progress"] === "awaitFeedback" ? "disabledMoveToIcon" : ""}" style="${element["progress"] === "awaitFeedback" ? "display: none;" : ""}" onclick="${element["progress"] !== "awaitFeedback" ? `moveToMobile(${taskID},'awaitFeedback');stopPropagation(event);` : ""}"><img src="../img/arrow-left.svg"></img>Await Feedback</span>
      <span class="font-14-light white ${element["progress"] === "done" ? "disabledMoveToIcon" : ""}" style="${element["progress"] === "done" ? "display: none;" : ""}" onclick="${element["progress"] !== "done" ? `moveToMobile(${taskID},'done');stopPropagation(event);` : ""}"><img src="../img/arrow-left.svg"></img>Done</span>
    </div>
  </div>
  <div class="task-description">
    <span class="task-title font-16">${element["title"]}</span>
    <span class="task-description-text font-16-light grey">${element["description"]}</span>
  </div>
  <div class="progressSubtask" id="progressSubtask_${taskID}">
    <progress id="subtasks_${taskID}" value="" max=""></progress><label for="subtasks_${taskID}"></label>
  </div>
  <div class="task-footer">
    <div id="cardInitial_${taskID}" class="cardInitial">
    </div>
    <img id="prioArrow_${taskID}"></img>
  </div>
</div>
`;
}

/**
 * Generates card of a task.
 * @param {number} i index of the task.
 */
function generateCard(i) {
  let task = tasks[i];
  overlayTask.innerHTML = /*HTML*/ `
  <div id="taskPopup" class="overlayTaskWrapper">
    <div class="overlayTaskHeader">
    <div class="task-category font-21-light white ${task.category === 'User Story' ? 'categoryTechnicalTask' : 'categoryUserStory'}">${task.category}</div>
      <img id="closeBtn" class="overlayTaskClose" onclick="togglePopup()" src="../img/close-btn-black.svg">
    </div>
    <div class="overlayTaskWrapperMain">
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
    </div>
    <div class="overlayTaskFooter">
      <div class="overlayTaskFooterWrapper">
        <a onclick="editTask(${i})" class="pointer"><img src="../img/edit.svg" alt="">EDIT</a>
        <img src="../img/stroke-horizontal-grey.svg" class="overlayTaskLine">
        <a onclick="deleteOneTask(${i})" class="pointer"><img src="../img/delete.svg" alt="">DELETE</a>
      </div>
    </div>
  </div>
  <div id="taskPopupEdit" class="d-none">
    <div class="overlayTaskWrapper">
      <div class="overlayTaskHeaderEdit">
        <img id="closeBtn" class="overlayTaskClose" onclick="togglePopup()" src="../img/close-btn-black.svg">
      </div>
      <form class="overlayTaskEditForm">
        <div>
          <div class="font-21-light">Title</div>
          <input type="text" id="titleInputEdit" value='${task.title}'>
          <div id="errortitleInputEdit"></div>
        </div>
        <div id="errorTitle"></div>
        <div>
          <div class="font-21-light">Description</div>
          <textarea id="descriptionInputEdit" placeholder="Enter a Description">${task.description}</textarea>
        </div>
        <div>
          <div class="font-21-light">Due Date*</div>
          <input type="date" id="dueDateInputEdit" value='${task.dueDate}'>
          <div id="errordueDateInputEdit"></div>
        </div>
        <div>
          <div class="font-21-light">Prio</div>
          <div class="prio-selection-container-edit">
            <div id="urgentButtonEdit" onclick="changePriorityEdit('urgentButtonEdit', 'urgent')">Urgent<img
                src="../img/urgent-button-icon.svg"></div>
            <div id="mediumButtonEdit" onclick="changePriorityEdit('mediumButtonEdit', 'medium')">Medium<img
                src="../img/medium-button-icon.svg"></div>
            <div id="lowButtonEdit" onclick="changePriorityEdit('lowButtonEdit', 'low')">Low <img
                src="../img/low-button-icon.svg"></div>
          </div>
        </div>
        <div>
          <div class="font-21-light">Assigned to</div>
          <div class="assignment-dropdown-edit">
            <div id="assignmentSelectEdit" onclick="toggleAssignmentDropdownEdit()">
              Select contacts to assign
              <img src="../img/dropdown-icon.svg" id="dropdownIconEdit">
            </div>
            <div id="assignmentDropdownListEdit">
              <div class="assignment-dropdown-list-entry-edit"></div>
            </div>
            <div id="renderedAssignedToContactsEdit"></div>
          </div>
        </div>
        <div>
          <div class="font-21-light">Subtasks</div>
          <div id="subtasksInputEdit">
            <input type="text" placeholder="Add new subtask" id="subTaskInputEdit" oninput="acitivateSubtaskEditorEdit()">
            <div id="imageContainerEdit">
              <img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInputEditor()">
            </div>
          </div>
          <div id="subtasksListEdit"></div>
        </div>
      </form>
      <div class="editOkButtonWrapper">
        <button type="button" id="editOkButton" onclick="saveEditTask(${i})">
          <div>OK</div><img src="../img/white-checkmark.svg">
        </button>
      </div>
    </div>
  </div>`;
  buttonIdEdit = task.prio + "ButtonEdit";
  priority = task.prio;
  changePriorityEdit(buttonIdEdit, priority);
}


/**
 * Generates subtask in the task list.
 * @param {number} i - index of the task.
 * @param {number} j - index of the subtask.
 * @param {string} subtask - text content of the subtask.
 * @param {string} selectedClass - The CSS class to apply for selected state.
 * @param {boolean} isSelected - subtask is selected.
 * @returns {string} subtask entry.
 */
function renderSubtasksTaskHTML(i, j, subtask, selectedClass, isSelected) {
  return `
  <div class="subtask-list-task-entry ${selectedClass}" onclick="selectSubtask(this, ${i}, ${j})">
    <img src="../img/${isSelected ? "checkedtask" : "check"}-button.svg">
    <div>${subtask}</div>
  </div>
`;
}

