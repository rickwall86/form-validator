const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password= document.getElementById('password')
const password2 = document.getElementById('password2')

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form__control form__control--error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show green success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form__control form__control--success';
}

// Check email is valid (using a regex)
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // .test is a regex method to test whether the specified string is a match. Returns true or false
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Please enter a valid email address')
    }
}

// Check form values are correct
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// check username and password length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must have more that ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

// Check the password strength
function checkPasswordStrength(input) {
    const check = /^(?=.{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/;
    if (check.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Password must contain 6 characters, 1 uppercase and 1 number');
        input.parentElement.classList.add('form--small-margin', 'form--b-margin');
    }
}

// Check whether the two passwords match
function checkPasswordsMatch( input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'passwords do not match')
    }
}

// Get field name and uppercase first letter
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkPasswordStrength(password);
    checkPasswordsMatch(password, password2);
});