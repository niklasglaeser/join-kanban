function changeClearButtonIcon() {
    let icon = document.getElementById("clearButtonIcon");
  
    icon.src = "../img/clear-button-icon-alternative.svg";
}

function changeClearButtonIconBack() {
    let icon = document.getElementById("clearButtonIcon");
  
    icon.src = "../img/clear-button-icon.svg";
}


function toggleAssignmentDropdown() {
    let assignmentDropdown = document.getElementById("assignmentDropdownList");
    if (assignmentDropdown.style.display === "flex") {
      assignmentDropdown.style.display = "none";
    } else {
      assignmentDropdown.style.display = "flex";
    }
}
  

document.addEventListener("click", function(event) {
    let assignmentSelect = document.getElementById("assignmentSelect");
    let assignmentDropdown = document.getElementById("assignmentDropdownList");
    if (
        event.target !== assignmentSelect &&
        event.target !== assignmentDropdown &&
        !assignmentDropdown.contains(event.target) &&
        !event.target.classList.contains("assignment-dropdown-list-entry")
    ) {
        assignmentDropdown.style.display = "none";
    }
});




function toggleCategoryDropdown() {
    let categoryDropdown = document.getElementById("categoryDropdownList");
    if (categoryDropdown.style.display === "flex") {
      categoryDropdown.style.display = "none";
    } else {
      categoryDropdown.style.display = "flex";
    }
}
  

document.addEventListener("click", function (event) {
    let categorySelect = document.getElementById("categorySelect");
    let categoryDropdown = document.getElementById("categoryDropdownList");
  
    if (event.target !== categoryDropdown && event.target !== categorySelect) {
      categoryDropdown.style.display = "none";
    }
});



function assignemtContactsTemplate(name, initial) {
    return `
    <div class="assignment-dropdown-list-entry" onclick="selectAssignment(this)">
        <div class="contact-option">
            <div>${initial}</div>
            <span>${name}</span>
        </div>
        <img src="../img/check-button.svg">
    </div>
  `;
}

async function renderAssignmentContacts(users) {
    let assignmentDropdownList = document.getElementById('assignmentDropdownList');
    assignmentDropdownList.innerHTML = '';

    users.forEach(user => {
        const { name, initial } = user;
        const userHtml = assignemtContactsTemplate(name, initial);
        assignmentDropdownList.innerHTML += userHtml;
    });
}

function selectAssignment(entry) {
    const isSelected = entry.classList.contains('selected');

    if (isSelected) {
        entry.classList.remove('selected');
        entry.style.backgroundColor = '';
        const img = entry.querySelector('img');
        img.src = "../img/check-button.svg";
    } else {
        entry.classList.add('selected');
        entry.style.backgroundColor = '#2A3647';
        const img = entry.querySelector('img');
        img.src = "../img/checked-button.svg";
    }
}

