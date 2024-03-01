let assignedToEdit = [];
let prioEdit = "";
let buttonIdEdit = "";
let subtasksEdit = [];


function changePriorityEdit(buttonIdEdit, priority) {
    let img;
    let buttons = document.querySelectorAll(".prio-selection-container-edit div");
    let button = document.getElementById(buttonIdEdit);
    let isActive = button.classList.contains(priority);
  
    buttons.forEach(btn => {
      btn.classList.remove("urgent", "medium", "low");
      img = btn.querySelector("img");
      img.src = `../img/${btn.id.split("ButtonEdit")[0]}-button-icon.svg`;
    });
  
    if (!isActive) {
      button.classList.add(priority);
      img = button.querySelector("img");
      img.src = `../img/${priority}-button-icon-active.svg`;
      prioEdit = priority;
    }
}





function toggleAssignmentDropdownEdit() {
  let assignmentDropdownEdit = document.getElementById(
    "assignmentDropdownListEdit"
  );
  if (assignmentDropdownEdit.style.display === "flex") {
    assignmentDropdownEdit.style.display = "none";
    renderAssignedToEdit();
  } else {
    assignmentDropdownEdit.style.display = "flex";
  }
}

document.addEventListener("click", function (event) {
  let assignmentSelectEdit = document.getElementById("assignmentSelectEdit");
  let assignmentDropdownEdit = document.getElementById(
    "assignmentDropdownListEdit"
  );
  let dropdownIconEdit = document.getElementById("dropdownIconEdit");
  if (
    event.target !== assignmentSelectEdit &&
    event.target !== assignmentDropdownEdit &&
    event.target !== dropdownIconEdit &&
    !assignmentDropdownEdit.contains(event.target) &&
    !event.target.classList.contains("assignment-dropdown-list-entry-edit")
  ) {
    assignmentDropdownEdit.style.display = "none";
    renderAssignedToEdit();
  }
});

function renderAssignedToArrayEdit(tasks, i) {
  let initial = document.getElementById("renderedAssignedToContactsEdit");
  let totalHTML = "";

  if (tasks[i] && tasks[i].assignedTo) {
    const assignedTo = tasks[i].assignedTo;
    for (let j = 0; j < assignedTo.length; j++) {
      const element = assignedTo[j];
      const color = assignedTo[j]["initial_color"];
      if (j < 5) {
        totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color:${color}">${element.initial}</div>`;
      }
    }
    if (assignedTo.length > 5) {
      totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color: var(--grey)">+${
        assignedTo.length - 5
      }</div>`;
    }
  }
  initial.innerHTML = totalHTML;
}


function renderAssignedToEdit() {
    let initial = document.getElementById("renderedAssignedToContactsEdit");
    let totalHTML = "";
  
    assignedToEdit.forEach((user, index) => {
      const color = user.initial_color;
      if (index < 5) {
        totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color:${color}">${user.initial}</div>`;
      }
    });
  
    if (assignedToEdit.length > 5) {
      totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color: var(--grey)">+${
        assignedToEdit.length - 5
      }</div>`;
    }
  
    initial.innerHTML = totalHTML;
  }
  


/*
function assignmentContactsTemplateEdit(name, initial, initial_color, id) {
  return `
      <div class="assignment-dropdown-list-entry-edit" onclick="selectAssignmentEdit(this, ${id})">
          <div class="contact-option-edit">
              <div id="${id}" style="background-color:${initial_color}">${initial}</div>
              <span>${name}</span>
          </div>
          <img src="../img/check-button.svg">
      </div>
    `;
}

async function renderAssignmentContactsEdit(i) {
  let assignmentDropdownListEdit = document.getElementById(
    "assignmentDropdownListEdit"
  );
  assignmentDropdownListEdit.innerHTML = "";

  users.forEach((user) => {
    const { name, initial, initial_color, id } = user;
    const userHtml = assignmentContactsTemplateEdit(
      name,
      initial,
      initial_color,
      id
    );
    assignmentDropdownListEdit.innerHTML += userHtml;
  });
}

*/ 

/*
async function renderAssignmentContactsEdit(i) {
    let assignmentDropdownListEdit = document.getElementById(
      "assignmentDropdownListEdit"
    );
    assignmentDropdownListEdit.innerHTML = "";
  
    for (const user of users) {
      const { name, initial, initial_color, id } = user;
      const assignedTasks = tasks[i].assignedTo;
      const isAssigned = assignedTasks.some(task => task.id === id);
      const isSelected = isAssigned ? 'selected' : '';
  
      const userHtml = assignmentContactsTemplateEdit(
        name,
        initial,
        initial_color,
        id,
        isSelected
      );
      assignmentDropdownListEdit.innerHTML += userHtml;
    }
  }

*/

async function renderAssignmentContactsEdit(i) {
    let assignmentDropdownListEdit = document.getElementById(
      "assignmentDropdownListEdit"
    );
    assignmentDropdownListEdit.innerHTML = "";
  
    assignedToEdit = [];
  
    for (const user of users) {
      const { name, initial, initial_color, id } = user;
      const assignedTasks = tasks[i].assignedTo;
      const isAssigned = assignedTasks.some(task => task.id === id);
      const isSelected = isAssigned ? 'selected' : '';
  
      if (isAssigned) {
        assignedToEdit.push(assignedTasks.find(task => task.id === id));
      }
  
      const userHtml = assignmentContactsTemplateEdit(
        name,
        initial,
        initial_color,
        id,
        isSelected
      );
      assignmentDropdownListEdit.innerHTML += userHtml;
    }
}


  
function assignmentContactsTemplateEdit(name, initial, initial_color, id, isSelected) {
    return `
        <div class="assignment-dropdown-list-entry-edit ${isSelected}" onclick="selectAssignmentEdit(this, ${id})">
            <div class="contact-option-edit">
                <div id="${id}" style="background-color:${initial_color}">${initial}</div>
                <span>${name}</span>
            </div>
            <img src="../img/${isSelected ? 'checked-button' : 'check-button'}.svg">
        </div>
      `;
  }
  

function selectAssignmentEdit(entry, id) {
    let isSelected = entry.classList.toggle("selected");
    id = id - 1;
    let { initial_color } = users[id];
    id = id + 1;
    let name = entry.querySelector(".contact-option-edit span").textContent;
    let initial = entry.querySelector(".contact-option-edit div").textContent;
    let index = assignedToEdit.findIndex((user) => user.id === id);
  
    if (isSelected) {
      assignedToEdit.push({ name, initial, initial_color, id });
      entry.style.backgroundColor = "#2A3647";
      entry.querySelector("img").src = "../img/checked-button.svg";
    } else {
      assignedToEdit.splice(index, 1);
      entry.style.backgroundColor = "";
      entry.querySelector("img").src = "../img/check-button.svg";
    }
  }



function acitivateSubtaskEditorEdit() {
    let imageContainerEdit = document.getElementById("imageContainerEdit");
    let subTaskInputEdit = document.getElementById("subTaskInputEdit");
  
    if (subTaskInputEdit.value.trim() !== "") {
      imageContainerEdit.innerHTML = `<img src="../img/x-icon-subtasks.svg" onclick="clearSubtaskInputEdit()"> <img src="../img/check-icon-subtasks.svg" onclick="addSubtaskToListEdit()">`;
    } else {
      imageContainerEdit.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInputEdit()">`;
    }
  
    subTaskInputEdit.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addSubtaskToListEdit();
      }
    });
  }



function focusSubtaskInputEdit() {
    let subTaskInputEdit = document.getElementById("subTaskInputEdit");
    subTaskInputEdit.focus();
  }
  
function clearSubtaskInputEdit() {
    let subTaskInputEdit = document.getElementById("subTaskInputEdit");
    subTaskInputEdit.value = "";
  
    let imageContainerEdit = document.getElementById("imageContainerEdit");
    imageContainerEdit.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">`;
  }
  
  
function addSubtaskToListEdit() {
    let subTaskInputEdit = document.getElementById("subTaskInputEdit");
    let subTaskValueEdit = subTaskInputEdit.value.trim();
  
    if (subTaskValueEdit !== "") {
      let subtasksListEdit = document.getElementById("subtasksListEdit");
      addSubtaskEntryEdit(subtasksListEdit, subTaskValueEdit);
  
      subtasksEdit.push(subTaskValueEdit);
  
      subTaskInputEdit.value = "";
      let imageContainerEdit = document.getElementById("imageContainerEdit");
      imageContainerEdit.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInputEdit()">`;
    }
  }


function addSubtaskEntryEdit(subtasksListEdit, subTaskValueEdit) {
    subtasksListEdit.innerHTML += `
      <div class="subtasks-list-entry-edit" onmouseenter="addHoverToSubtaskEdit(event)" onmouseleave="removeHoverFromSubtaskEdit(event)">
          <li><input type="text" value="${subTaskValueEdit}" readonly id="subtaskEditInputEdit"></li>
          <div id="subtaskIconsEdit">
              <img onclick="editSubtaskEdit(event)" class="edit-icon-edit" src="../img/edit-subtasks-icon.svg" style="display: none;">
              <img onclick="deleteSubtaskEdit(event)" class="delete-icon-edit" src="../img/delete-subtask-icon.svg" style="display: none;">
              <img onclick="saveSubtaskEdit(event)" class="save-icon-edit" src="../img/save-subtask-icon.svg" style="display: none;">
          </div>
      </div>
    `;
}


function renderSubtasks(i) {
    let subtasksListEdit = document.getElementById("subtasksListEdit");
    subtasksListEdit.innerHTML = "";
  
    if (tasks[i] && tasks[i].subtasks) {
      tasks[i].subtasks.forEach(subTaskValueEdit => {
        addSubtaskEntryEdit(subtasksListEdit, subTaskValueEdit);
      });
    }
  }
  



function editSubtaskEdit(event) {
    let entryDiv = event.target.closest(".subtasks-list-entry-edit");
    let subTaskInputEdit = entryDiv.querySelector("li input");
    entryDiv.onmouseenter = null;
    entryDiv.onmouseleave = null;
  
    subTaskInputEdit.style.backgroundColor = "white";
    subTaskInputEdit.readOnly = false;
    subTaskInputEdit.focus();
  
    let editIconEdit = entryDiv.querySelector(".edit-icon-edit");
    editIconEdit.style.display = "none";
    let deleteIconEdit = entryDiv.querySelector(".delete-icon-edit");
    deleteIconEdit.style.display = "inline";
    let saveIconEdit = entryDiv.querySelector(".save-icon-edit");
    saveIconEdit.style.display = "inline";
  }


function saveSubtaskEdit(event) {
    let entryDiv = event.target.closest(".subtasks-list-entry-edit");
    let subTaskInputEdit = entryDiv.querySelector("li input");
    let subTaskValueEdit = subTaskInput.value.trim();
  
    entryDiv.onmouseenter = addHoverToSubtaskEdit;
    entryDiv.onmouseleave = removeHoverFromSubtaskEdit;
  
    const index = subtasksEdit.indexOf(subTaskInputEdit.value);
    if (index !== -1) {subtasksEdit[index] = subTaskValueEdit;}
  
    subTaskInputEdit.readOnly = true;
    subTaskInputEdit.style.backgroundColor = "";
  
    let saveIconEdit = entryDiv.querySelector(".save-icon-edit");
    saveIconEdit.style.display = "none";
    let editIconEdit = entryDiv.querySelector(".edit-icon-edit");
    editIconEdit.style.display = "inline";
  }



function addHoverToSubtaskEdit(event) {
    let entryDiv = event.target.closest(".subtasks-list-entry-edit");
    entryDiv.style.backgroundColor = "";
  
    let deleteIconEdit = entryDiv.querySelector(".delete-icon-edit");
    deleteIconEdit.style.display = "inline";
  
    let editIconEdit = entryDiv.querySelector(".edit-icon-edit");
    editIconEdit.style.display = "inline";
  }
  
  function removeHoverFromSubtaskEdit(event) {
    let entryDiv = event.target.closest(".subtasks-list-entry-edit");
    entryDiv.style.backgroundColor = "";
  
    let deleteIconEdit = entryDiv.querySelector(".delete-icon-edit");
    deleteIconEdit.style.display = "none";
  
    let editIconEdit = entryDiv.querySelector(".edit-icon-edit");
    editIconEdit.style.display = "none";
  }
  
function deleteSubtaskEdit(event) {
    let entryDiv = event.target.closest(".subtasks-list-entry-edit");
    let subTaskValueEdit = entryDiv.querySelector("li input").value;
  
    const index = subtasksEdit.indexOf(subTaskValueEdit);
    if (index !== -1) {
      subtasksEdit.splice(index, 1);
    }
  
    entryDiv.parentNode.removeChild(entryDiv);
  }