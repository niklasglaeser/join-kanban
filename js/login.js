function login() {
    let email = document.getElementById('emailInputLogin');
    let password = document.getElementById('passwordInputLogin');
    let user = users.find( u => u.email == email.value && u.password == password.value);

    if (user) {
        window.location.href = 'summary.html';
    } else {
        console.log('user not found')
    }
}