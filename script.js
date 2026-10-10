
const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const course = document.getElementById("course");
const year = document.getElementById("year");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const strength = document.getElementById("strength");
const strengthBar = document.getElementById("strengthBar");
const successMessage = document.getElementById("successMessage");

const namePattern = /^[A-Za-z ]{2,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[0-9]{10}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;

    if (input) {
        input.classList.add("invalid");
        input.classList.remove("valid");
    }
}

function showValid(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
}

function validateName() {
    if (!namePattern.test(fullName.value.trim())) {
        showError(fullName, "nameError", "Enter a valid name.");
        return false;
    }

    showValid(fullName, "nameError");
    return true;
}

function validateEmail() {
    if (!emailPattern.test(email.value.trim())) {
        showError(email, "emailError", "Enter a valid email address.");
        return false;
    }

    showValid(email, "emailError");
    return true;
}

function validateMobile() {
    if (!mobilePattern.test(mobile.value.trim())) {
        showError(mobile, "mobileError", "Enter exactly 10 digits.");
        return false;
    }

    showValid(mobile, "mobileError");
    return true;
}

function validateCourse() {
    if (course.value === "") {
        showError(course, "courseError", "Please select a course.");
        return false;
    }

    showValid(course, "courseError");
    return true;
}

function validateYear() {
    if (year.value === "") {
        showError(year, "yearError", "Please select an academic year.");
        return false;
    }

    showValid(year, "yearError");
    return true;
}

function validatePassword() {
    if (!passwordPattern.test(password.value)) {
        showError(
            password,
            "passwordError",
            "Use 8+ characters with uppercase, lowercase, number and symbol."
        );
        return false;
    }

    showValid(password, "passwordError");
    return true;
}

function validateConfirmPassword() {
    if (
        confirmPassword.value === "" ||
        confirmPassword.value !== password.value
    ) {
        showError(
            confirmPassword,
            "confirmPasswordError",
            "Passwords do not match."
        );
        return false;
    }

    showValid(confirmPassword, "confirmPasswordError");
    return true;
}

function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');

    document.getElementById("genderError").textContent =
        selected ? "" : "Please select your gender.";

    return Boolean(selected);
}

function validateTerms() {
    document.getElementById("termsError").textContent =
        terms.checked ? "" : "Please accept the Terms & Conditions.";

    return terms.checked;
}

password.addEventListener("input", function () {
    const value = password.value;

    if (value.length === 0) {
        strength.textContent = "Password strength";
        strengthBar.style.width = "0";
        strengthBar.style.background = "#27816b";
    } else if (value.length < 6) {
        strength.textContent = "Weak";
        strengthBar.style.width = "25%";
        strengthBar.style.background = "#d43f4c";
    } else if (!passwordPattern.test(value)) {
        strength.textContent = "Medium";
        strengthBar.style.width = "60%";
        strengthBar.style.background = "#d39a31";
    } else {
        strength.textContent = "Strong";
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#27816b";
    }

    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }
});

fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
mobile.addEventListener("input", validateMobile);
confirmPassword.addEventListener("input", validateConfirmPassword);
course.addEventListener("change", validateCourse);
year.addEventListener("change", validateYear);

document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
    radio.addEventListener("change", validateGender);
});

terms.addEventListener("change", validateTerms);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    successMessage.textContent = "";

    const results = [
        validateName(),
        validateEmail(),
        validateMobile(),
        validateCourse(),
        validateYear(),
        validatePassword(),
        validateConfirmPassword(),
        validateGender(),
        validateTerms()
    ];

    if (results.every(Boolean)) {
        successMessage.textContent =
            "Registration successful! All details are valid.";

        alert("Registration Successful!");

        form.reset();

        document.querySelectorAll(".valid, .invalid").forEach(function (item) {
            item.classList.remove("valid", "invalid");
        });

        document.querySelectorAll(".error").forEach(function (item) {
            item.textContent = "";
        });

        strength.textContent = "Password strength";
        strengthBar.style.width = "0";
        successMessage.textContent = "";
    }
});

form.addEventListener("reset", function () {
    setTimeout(function () {
        document.querySelectorAll(".error").forEach(function (item) {
            item.textContent = "";
        });

        document.querySelectorAll(".valid, .invalid").forEach(function (item) {
            item.classList.remove("valid", "invalid");
        });

        successMessage.textContent = "";
        strength.textContent = "Password strength";
        strengthBar.style.width = "0";
    }, 0);
});
