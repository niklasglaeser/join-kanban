document.addEventListener("click", function(event) {
    var userProfile = document.getElementById("userProfile");
    var dropdownContent = document.getElementById("dropdownContent");

    if (event.target !== userProfile && event.target !== dropdownContent) {
        dropdownContent.style.display = "none";
    }
});

