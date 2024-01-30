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


async function deleteAllUser() {
    users.splice(0, users.length);
    await setItem("users", JSON.stringify(users));
}



function renderHeader() {
    const header = document.getElementById('headerContainer');

    header.innerHTML = headerTemplate();

}

function renderSidebar() {
    const sidebar = document.getElementById('sidebarContainer');

    sidebar.innerHTML = sidebarTemplate();
}