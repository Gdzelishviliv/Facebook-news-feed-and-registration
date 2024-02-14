const emailInput = document.querySelector("#email");
const pass = document.querySelector("#pass");
const rePass = document.querySelector("#re-pass");
const firstName = document.querySelector("#fname");
const lastName = document.querySelector("#lname");
const btnSignup = document.querySelector(".sign-up-button");

const nameValidator = () => {
    const val = firstName.value.trim();
    if (val.length < 1) {
        alert('First name is required');
        return false;
    }
    return true;
};

const emailValidator = () => {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
        alert('Invalid email address');
        return false;
    }
    return true;
};

const passwordValidator = () => {
    const val = pass.value;
    if (val.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }
    return true;
};

const rePasswordValidator = () => {
    const val = rePass.value;
    if (val !== pass.value) {
        alert('Passwords do not match');
        return false;
    }
    return true;
};

const handleFormSubmission = () => {
    if (nameValidator() && emailValidator() && passwordValidator() && rePasswordValidator()) {
        const formData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: emailInput.value.trim(),
            password: pass.value.trim()
        };

        localStorage.setItem('formData', JSON.stringify(formData));

        window.location.href = '/index.html';
    }
};

btnSignup.addEventListener('click', (event) => {
    event.preventDefault();
     handleFormSubmission();
});
