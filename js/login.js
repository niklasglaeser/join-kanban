function login() {
    let email = document.getElementById('emailInputLogin');
    let password = document.getElementById('passwordInputLogin');
    let user = users.find( u => u.email == email.value && u.password == password.value);
    let errorLogin = document.getElementById('errorLogin');

    if (user) {
        window.location.href = 'pages/summary.html';
    } else {
        errorLogin.innerHTML = 'Email or Password is wrong! Try again.'
    }
}