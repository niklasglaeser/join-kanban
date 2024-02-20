let assignedTo = [];
let prio = "medium";
let category = "";
let subtasks = [];

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
    let dropdownIcon = document.getElementById('dropdownIcon')
    if (
        event.target !== assignmentSelect &&
        event.target !== assignmentDropdown &&
        event.target !== dropdownIcon &&
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
    let dropdownIconCategory = document.getElementById('dropdownIconCategory')
  
    if (event.target !== categoryDropdown && event.target !== categorySelect && event.target !== dropdownIconCategory) {
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
        const name = entry.querySelector('.contact-option span').textContent;
        const initial = entry.querySelector('.contact-option div').textContent;
        const index = assignedTo.findIndex(user => user.name === name && user.initial === initial);
        assignedTo.splice(index, 1);
        entry.classList.remove('selected');
        entry.style.backgroundColor = '';
        const img = entry.querySelector('img');
        img.src = "../img/check-button.svg";
    } else {
        const name = entry.querySelector('.contact-option span').textContent;
        const initial = entry.querySelector('.contact-option div').textContent;
        assignedTo.push({ name, initial });
        entry.classList.add('selected');
        entry.style.backgroundColor = '#2A3647';
        const img = entry.querySelector('img');
        img.src = "../img/checked-button.svg";
    }
}

function changePriority(buttonId, priority) {
    let img;
    let buttons = document.querySelectorAll('.prio-selection-container div');
    let button = document.getElementById(buttonId);
    let isActive = button.classList.contains(priority);

    buttons.forEach(function(btn) {
        btn.classList.remove('urgent', 'medium', 'low');
        img = btn.querySelector('img');
        img.src = '../img/' + btn.id.split('Button')[0] + '-button-icon.svg';
    });

    if (!isActive) {
        button.classList.add(priority);
        img = button.querySelector('img');
        if (priority === 'urgent') {
            img.src = '../img/urgent-button-icon-active.svg';
        } else if (priority === 'medium') {
            img.src = '../img/medium-button-icon-active.svg';
        } else if (priority === 'low') {
            img.src = '../img/low-button-icon-active.svg';
        }
        prio = priority;
    }
}


function setCategory(selectedCategory) {

    category = selectedCategory;

    let categorySelect = document.getElementById('categorySelect');
    
    if (category === 'user-task') {
        categorySelect.innerHTML = 'User Task <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
    } else if (category === 'technical-task') {
        categorySelect.innerHTML = 'Technical Task <img src="../img/dropdown-icon.svg" id="dropdownIconCategory">';
    }
    
    toggleCategoryDropdown();
}


function acitivateSubtaskEditor() {
    let imageContainer = document.getElementById('imageContainer');
    let subTaskInput = document.getElementById('subTaskInput');

    if (subTaskInput.value.trim() !== '') {
        imageContainer.innerHTML = `
            <img src="../img/x-icon-subtasks.svg" onclick="clearSubtaskInput()">
            <img src="../img/check-icon-subtasks.svg" onclick="addSubtaskToList()">
        `;
    } else {
        imageContainer.innerHTML = `
            <img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">
        `;
    }
}


function focusSubtaskInput() {
    let subTaskInput = document.getElementById('subTaskInput');
    subTaskInput.focus();
}


function clearSubtaskInput() {
    let subTaskInput = document.getElementById('subTaskInput');
    subTaskInput.value = '';

    let imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `
        <img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">
    `;
}


function addSubtaskToList() {
    let subTaskInput = document.getElementById('subTaskInput');
    let subTaskValue = subTaskInput.value.trim();

    if (subTaskValue !== '') {
        let subtasksList = document.getElementById('subtasksList');
        
        subtasks.push(subTaskValue);

        subtasksList.innerHTML += `
            <div class="subtasks-list-entry" onmouseenter="addHoverToSubtask(event)" onmouseleave="removeHoverFromSubtask(event)">
                <li>${subTaskValue}</li>
                <img onclick="deleteSubtask(event)" class="delete-icon" src="../img/delete-subtask-icon.svg" style="display: none;">
            </div>
        `;
        subTaskInput.value = '';
        let imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = `<img src="../img/subtasks-add-icon.svg" onclick="focusSubtaskInput()">`;
    }
}

function addHoverToSubtask(event) {
    let entryDiv = event.target.closest('.subtasks-list-entry');
    entryDiv.style.backgroundColor = '#f0f0f0';
    let deleteIcon = entryDiv.querySelector('.delete-icon');
    deleteIcon.style.display = 'inline';
}

function removeHoverFromSubtask(event) {
    let entryDiv = event.target.closest('.subtasks-list-entry');
    entryDiv.style.backgroundColor = '';
    let deleteIcon = entryDiv.querySelector('.delete-icon');
    deleteIcon.style.display = 'none';
}



function deleteSubtask(event) {
    let entryDiv = event.target.parentElement;
    let subTaskValue = entryDiv.querySelector('li').textContent;

    const index = subtasks.indexOf(subTaskValue);
    if (index !== -1) {
        subtasks.splice(index, 1);
    }

    entryDiv.parentNode.removeChild(entryDiv);
}


async function addNewTask() {

    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dueDateInput').value;

    if (!title) {
        console.log('Title cannot be empty.');
        return;
    }

    const sanitizedTitle = title.trim() === '' ? null : title;
    const sanitizedDescription = description.trim() === '' ? null : description;
    const sanitizedDueDate = dueDate.trim() === '' ? null : dueDate;

    const newTask = {
        id: tasks.length,
        title: sanitizedTitle,
        description: sanitizedDescription,
        assignedTo,
        dueDate: sanitizedDueDate,
        prio,
        category,
        subtasks,
        subtaskdone: [],
        progress: "todo"
    };

    tasks.push(newTask);

    try {
        await setItem("tasks", JSON.stringify(tasks));
        console.log('Task added successfully.');
    } catch (error) {
        console.error('Error adding task:', error);
    }
}






