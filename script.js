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

function openSignUpForm() {
    let loginForm = document.getElementById('loginContainer');
    let signUpForm = document.getElementById('signUpContainer');

    loginForm.style.display = "none";
    signUpForm.style.display = "flex";
}

function closeSignUpForm() {
    let loginForm = document.getElementById('loginContainer');
    let signUpForm = document.getElementById('signUpContainer');

    loginForm.style.display = "flex";
    signUpForm.style.display = "none";
}