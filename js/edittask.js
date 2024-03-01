let assignedToEdit = [];
let prioEdit = "";
let buttonIdEdit = "";


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


