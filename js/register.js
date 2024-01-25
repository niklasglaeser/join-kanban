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
    registerBtn.disabled = true;
    users.push({
        email: email.value, //email : email.value ist wie let 'variable' = 'name'.value 
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    window.location.href ='login.html?msg=Du hast dich erfolgreich registriert';
    resetForm();
}

function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}