let users = [];

async function init(){
    loadUsers();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function register() {
    signUpFormButton.disabled = true;
    users.push({
        name: nameInputSignup.value,
        email: emailInputSignup.value,
        password: passwordInputSignup.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
    window.location.href ='index.html';
}

function resetForm() {
    emailInputSignup.value = '';
    passwordInputSignup.value = '';
    signUpFormButton.disabled = false;
}