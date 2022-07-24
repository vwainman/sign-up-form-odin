const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "ca",
    preferredCountries: ["ca", "us", "uk"],
    geoIpLookup: getIp,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
const info = document.querySelector(".alert-info");
const form = document.forms["sign-up"]

function process(event) {
    event.preventDefault();

    const phoneNumber = phoneInput.getNumber();

    info.style.display = "";
    info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
}

function getIp(callback) {
    fetch('https://ipinfo.io/json?token=<your token>', { headers: { 'Accept': 'application/json' } })
        .then((resp) => resp.json())
        .catch(() => {
            return {
                country: 'us',
            };
        })
        .then((resp) => callback(resp.country));
}

// function validate_password() {
//     if ()
// }

// const password = document.getElementById("password");
// const confirmPassword = document.getElementById("confirm-password");
// const submit = document.getElementById("submit");

// // basic client-side validation, not enough on its own
// submit.addEventListener("click", validate_form);

// function validate_form(e) {
//     e.preventDefault(); // prevent auto submit

// }

const passwordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const togglePasswordButton = document.getElementById('toggle-password');
const toggleConfirmPasswordButton = document.getElementById('toggle-confirm-password');

toggleConfirmPasswordButton.addEventListener('click', (e) => { togglePassword(e, confirmPasswordInput) });
togglePasswordButton.addEventListener('click', (e) => { togglePassword(e, passwordInput) });
confirmPasswordInput.oninput = verifySamePasswordSoFar;

function verifySamePasswordSoFar() {
    const confirmPassword = confirmPasswordInput.value;
    const password = passwordInput.value;
    if (confirmPassword.length == password.length && password == confirmPassword) {
        // perfect match
        confirmPasswordInput.setCustomValidity("");
        passwordInput.style.color = '#39b43e';
        passwordInput.style.border = "1px solid #39b43e"
        confirmPasswordInput.style.color = '#39b43e';
        confirmPasswordInput.style.border = "1px solid #39b43e"
        return
    }
    else if (confirmPassword.length > password.length) {
        // initial password is shorter
        confirmPasswordInput.setCustomValidity("This password is longer!");
        confirmPasswordInput.reportValidity();
    } else if (password.slice(0, confirmPassword.length) != confirmPassword) {
        // initial password substring doesn't match this far
        confirmPasswordInput.setCustomValidity("Woops! the last letter doesn't match!");
        confirmPasswordInput.reportValidity();
    } else {
        confirmPasswordInput.setCustomValidity("");
    }
    // reset styles
    passwordInput.style.color = '#111';
    passwordInput.style.border = "1px solid #111"
    confirmPasswordInput.style.color = '#111';
    confirmPasswordInput.style.border = "1px solid #111"
}

function togglePassword(e, input) {
    if (input.type === 'password') {
        input.type = 'text';
        e.target.textContent = 'HIDE';
        e.target.setAttribute('aria-label',
            'Hide password.');
    } else {
        input.type = 'password';
        e.target.textContent = 'SHOW';
        e.target.setAttribute('aria-label',
            'Show password as plain text.');
    }
}