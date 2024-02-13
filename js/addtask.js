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



document.addEventListener("DOMContentLoaded", function() {
    let assignmentEntries = document.querySelectorAll(".assignment-dropdown-list-entry");

    assignmentEntries.forEach(function(entry) {
        entry.addEventListener("click", function() {
            entry.classList.toggle("selected");

            if (entry.classList.contains("selected")) {
                entry.style.backgroundColor = "#2A3647";
            } else {
                entry.style.backgroundColor = "transparent";
            }

            let img = entry.querySelector("img");
            if (entry.classList.contains("selected")) {
                img.src = "../img/checked-button.svg";
            } else {
                img.src = "../img/check-button.svg";
            }
        });
        
        entry.addEventListener("mouseenter", function() {
            if (!entry.classList.contains("selected")) {
                entry.style.backgroundColor = "#D1D1D1";
            } else {
                entry.style.backgroundColor = "#091931";
            }
        });

        entry.addEventListener("mouseleave", function() {
            if (!entry.classList.contains("selected")) {
                entry.style.backgroundColor = "transparent";
            } else {
                entry.style.backgroundColor = "#2A3647";
            }
        });
    });
});
