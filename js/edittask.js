function toggleAssignmentDropdownEdit() {
    let assignmentDropdownEdit = document.getElementById("assignmentDropdownListEdit");
    if (assignmentDropdownEdit.style.display === "flex") {
      assignmentDropdownEdit.style.display = "none";
      renderAssignedToArrayEdit();
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
      renderAssignedToArrayEdit();
    }
});

function renderAssignedToArrayEdit() {
    let totalHTML = "";

    tasks.forEach(task => {
        task.assignedTo.forEach((element, index) => {
            const color = element.initial_color;
            if (index < 5) {
                totalHTML += `<div class="cardInitialAssignedToAddTask" style="background-color:${color}">${element.initial}</div>`;
            }
        });

        if (task.assignedTo.length > 5) {
            totalHTML += `<div class="cardInitialAssignedToAddTask" style="background-color: var(--grey)">+${task.assignedTo.length - 5}</div>`;
        }
    });

    let initial = document.getElementById("renderedAssignedToContactsEdit");
    initial.innerHTML = totalHTML;
}



function assignemtContactsTemplateEdit(name, initial, initial_color, id) {
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
  
  
async function renderAssignmentContactsEdit(tasks) {
    let assignmentDropdownListEdit = document.getElementById("assignmentDropdownListEdit");
    assignmentDropdownListEdit.innerHTML = "";

    tasks.forEach(task => {
        task.assignedTo.forEach(user => {
            const { name, initial, initial_color, id } = user;
            const userHtml = assignemtContactsTemplateEdit(
                name,
                initial,
                initial_color,
                id
            );
            assignmentDropdownListEdit.innerHTML += userHtml;
        });
    });
}
