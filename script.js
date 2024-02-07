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

/*
async function deleteAllUser() {
    users.splice(0, users.length);
    await setItem("users", JSON.stringify(users));
}

*/

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
}

function init() {
    includeHTML();
}


function changePasswordIcon(inputId, iconId) {
    let passwordInput = document.getElementById(inputId);
    let passwordIcon = document.getElementById(iconId);

    if (passwordInput.value.trim() === '') {
        passwordIcon.src = 'img/lock.svg';
    } else {
        passwordIcon.src = 'img/show-password-icon.svg';
        passwordIcon.onclick = function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.src = 'img/hide-password-icon.svg';
            } else {
                passwordInput.type = 'password';
                passwordIcon.src = 'img/show-password-icon.svg';
            }
        };
    }

    passwordInput.addEventListener('input', function() {
        if (passwordInput.type === 'text' && passwordInput.value.trim() !== '') {
            passwordIcon.src = 'img/hide-password-icon.svg';
        }
    });
}


function changePencilIcon() {
    let icon = document.getElementById('firstRowDivPencilIcon');

    icon.src = 'img/pencil-icon-invert.svg';
}

function changePencilIconBack() {
    let icon = document.getElementById('firstRowDivPencilIcon');

    icon.src = 'img/pencil-icon.svg';
}

function changeHakenIcon() {
    let icon = document.getElementById('firstRowDivHakenIcon');

    icon.src = 'img/haken-icon-invert.svg';
}

function changeHakenIconBack() {
    let icon = document.getElementById('firstRowDivHakenIcon');

    icon.src = 'img/haken-icon.svg';
}


function comparePasswords(passwordInputId, confirmPasswordInputId, errorMessageId) {
    let passwordInput = document.getElementById(passwordInputId);
    let confirmPasswordInput = document.getElementById(confirmPasswordInputId);
    let errorMessage = document.getElementById(errorMessageId);

    if (confirmPasswordInput.value.trim() === '') {
        errorMessage.innerHTML = "";
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.innerHTML = "Ups! your password don't match";
    } else {
        errorMessage.innerHTML = "";
    }
}

