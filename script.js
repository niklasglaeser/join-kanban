function guestLogin() {
    window.location.href = 'summary.html';
}

function toggleDropdown() {
    let dropdownContent = document.getElementById("dropdownContent");
    if (dropdownContent.style.display === "flex") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "flex";
    }
}

document.addEventListener("click", function(event) {
    var userProfile = document.getElementById("userProfile");
    var dropdownContent = document.getElementById("dropdownContent");

    if (event.target !== userProfile && event.target !== dropdownContent) {
        dropdownContent.style.display = "none";
    }
});