function toggleAssignmentDropdownEdit() {
    let assignmentDropdownEdit = document.getElementById("assignmentDropdownListEdit");
    if (assignmentDropdownEdit.style.display === "flex") {
      assignmentDropdownEdit.style.display = "none";
    } else {
      assignmentDropdownEdit.style.display = "flex";
    }
}


document.addEventListener("click", function (event) {
    let assignmentSelectEdit = document.getElementById("assignmentSelectEdit");
    let assignmentDropdownEdit = document.getElementById("assignmentDropdownListEdit");
    let dropdownIconEdit = document.getElementById("dropdownIconEdit");
    if (
      event.target !== assignmentSelectEdit &&
      event.target !== assignmentDropdownEdit &&
      event.target !== dropdownIconEdit &&
      !assignmentDropdownEdit.contains(event.target) &&
      !event.target.classList.contains("assignment-dropdown-list-entry-edit")
    ) {
      assignmentDropdownEdit.style.display = "none";
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
        totalHTML += `<div class="cardInitialAssignedToAddTaskEdit" style="background-color: var(--grey)">+${assignedTo.length - 5}</div>`;
      }
    }
    initial.innerHTML = totalHTML;
  }
  



function assignmentContactsTemplateEdit(name, initial, initial_color, id) {
    return `
      <div class="assignment-dropdown-list-entry-edit" onclick="selectAssignment(this, ${id})">
          <div class="contact-option-edit">
              <div id="${id}" style="background-color:${initial_color}">${initial}</div>
              <span>${name}</span>
          </div>
          <img src="../img/check-button.svg">
      </div>
    `;
  }

  
  
async function renderAssignmentContactsEdit(i) {
    let assignmentDropdownListEdit = document.getElementById("assignmentDropdownListEdit");
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



  
  
  
