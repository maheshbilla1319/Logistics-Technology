
/* =========================================================
   STACKLY LOGISTICS - SIGNUP JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });
    }


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("hide");
            }
        }, 500);
    });


    /* =====================================================
       ROLE SELECTION
    ===================================================== */

    const roleOptions = document.querySelectorAll(".role-option");

    roleOptions.forEach(option => {

        const radio = option.querySelector("input");

        radio.addEventListener("change", () => {

            roleOptions.forEach(item => {
                item.classList.remove("active");
            });

            if (radio.checked) {
                option.classList.add("active");
            }

        });

    });


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    function setupPasswordToggle(toggleId, inputId) {

        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);

        if (!toggle || !input) return;

        toggle.addEventListener("click", () => {

            const icon = toggle.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

                toggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                toggle.setAttribute(
                    "title",
                    "Hide password"
                );

            } else {

                input.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

                toggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

                toggle.setAttribute(
                    "title",
                    "Show password"
                );
            }

        });

    }

    setupPasswordToggle(
        "passwordToggle",
        "password"
    );

    setupPasswordToggle(
        "confirmPasswordToggle",
        "confirmPassword"
    );


    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    const password = document.getElementById("password");
    const strengthFill = document.getElementById("strengthFill");
    const strengthText = document.getElementById("strengthText");

    function checkPasswordStrength(value) {

        if (!value) {

            strengthFill.style.width = "0%";
            strengthText.textContent = "Enter a password";

            return;
        }

        let score = 0;

        if (value.length >= 8) {
            score++;
        }

        if (/[A-Z]/.test(value)) {
            score++;
        }

        if (/[a-z]/.test(value)) {
            score++;
        }

        if (/[0-9]/.test(value)) {
            score++;
        }

        if (/[^A-Za-z0-9]/.test(value)) {
            score++;
        }


        if (score <= 2) {

            strengthFill.style.width = "35%";
            strengthText.textContent = "Weak";

        } else if (score <= 4) {

            strengthFill.style.width = "70%";
            strengthText.textContent = "Good";

        } else {

            strengthFill.style.width = "100%";
            strengthText.textContent = "Strong";
        }

    }

    if (password) {

        password.addEventListener("input", () => {

            checkPasswordStrength(
                password.value
            );

            clearError(
                "password"
            );
        });

    }


    /* =====================================================
       INPUT VALIDATION HELPERS
    ===================================================== */

    function setError(inputId, message) {

        const input = document.getElementById(inputId);
        const error = document.getElementById(
            `${inputId}Error`
        );

        if (input) {

            const wrapper = input.closest(
                ".input-wrapper"
            );

            if (wrapper) {
                wrapper.classList.add("error");
                wrapper.classList.remove("success");
            }
        }

        if (error) {
            error.textContent = message;
        }
    }


    function clearError(inputId) {

        const input = document.getElementById(inputId);
        const error = document.getElementById(
            `${inputId}Error`
        );

        if (input) {

            const wrapper = input.closest(
                ".input-wrapper"
            );

            if (wrapper) {
                wrapper.classList.remove("error");

                if (input.value.trim()) {
                    wrapper.classList.add("success");
                }
            }
        }

        if (error) {
            error.textContent = "";
        }
    }


    /* =====================================================
       LIVE INPUT CLEANUP
    ===================================================== */

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const confirmPassword =
        document.getElementById("confirmPassword");

    [
        firstName,
        lastName,
        email,
        phone,
        confirmPassword
    ].forEach(input => {

        if (!input) return;

        input.addEventListener("input", () => {

            clearError(input.id);

        });

    });


    /* =====================================================
       PHONE INPUT
    ===================================================== */

    if (phone) {

        phone.addEventListener("input", () => {

            phone.value = phone.value
                .replace(/\D/g, "")
                .slice(0, 10);

        });

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(value);

    }


    /* =====================================================
       FORM
    ===================================================== */

    const signupForm =
        document.getElementById("signupForm");

    const formMessage =
        document.getElementById("formMessage");

    signupForm.addEventListener("submit", event => {

        event.preventDefault();


        const first =
            firstName.value.trim();

        const last =
            lastName.value.trim();

        const mail =
            email.value.trim();

        const mobile =
            phone.value.trim();

        const pass =
            password.value;

        const confirm =
            confirmPassword.value;

        const terms =
            document.getElementById("terms");

        let valid = true;


        /* FIRST NAME */

        if (first.length < 2) {

            setError(
                "firstName",
                "Please enter your first name."
            );

            valid = false;

        } else {

            clearError("firstName");
        }


        /* LAST NAME */

        if (last.length < 2) {

            setError(
                "lastName",
                "Please enter your last name."
            );

            valid = false;

        } else {

            clearError("lastName");
        }


        /* EMAIL */

        if (!isValidEmail(mail)) {

            setError(
                "email",
                "Please enter a valid email address."
            );

            valid = false;

        } else {

            clearError("email");
        }


        /* PHONE */

        if (!/^[0-9]{10}$/.test(mobile)) {

            setError(
                "phone",
                "Enter a valid 10-digit phone number."
            );

            valid = false;

        } else {

            clearError("phone");
        }


        /* PASSWORD */

        if (pass.length < 8) {

            setError(
                "password",
                "Password must contain at least 8 characters."
            );

            valid = false;

        } else {

            clearError("password");
        }


        /* CONFIRM PASSWORD */

        if (confirm !== pass || !confirm) {

            setError(
                "confirmPassword",
                "Passwords do not match."
            );

            valid = false;

        } else {

            clearError("confirmPassword");
        }


        /* TERMS */

        const termsError =
            document.getElementById("termsError");

        if (!terms.checked) {

            termsError.textContent =
                "Please accept the terms and privacy policy.";

            valid = false;

        } else {

            termsError.textContent = "";
        }


        /* INVALID */

        if (!valid) {

            formMessage.textContent =
                "Please check the highlighted fields and try again.";

            formMessage.classList.add("show");

            return;
        }


        /* =================================================
           SUCCESS
        ================================================= */

        const selectedRole =
            document.querySelector(
                'input[name="role"]:checked'
            );

        const role =
            selectedRole
                ? selectedRole.value
                : "customer";


        formMessage.textContent =
            `Account details validated successfully for ${role}.`;

        formMessage.classList.add("show");


        /*
            Frontend demo only.

            Connect this section to your backend/API
            when real account creation is required.
        */

        console.log("Signup Data:", {
            firstName: first,
            lastName: last,
            email: mail,
            phone: mobile,
            role: role
        });


        /* BUTTON SUCCESS STATE */

        const submitButton =
            signupForm.querySelector(".signup-btn");

        const buttonText =
            submitButton.querySelector("span");

        const buttonIcon =
            submitButton.querySelector("i");


        buttonText.textContent =
            "Account Ready";

        buttonIcon.className =
            "fa-solid fa-check";


        submitButton.disabled = true;


        /* DEMO REDIRECT */

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1800);

    });


    /* =====================================================
       CONFIRM PASSWORD LIVE CHECK
    ===================================================== */

    if (confirmPassword) {

        confirmPassword.addEventListener(
            "input",
            () => {

                if (
                    confirmPassword.value &&
                    confirmPassword.value !== password.value
                ) {

                    setError(
                        "confirmPassword",
                        "Passwords do not match."
                    );

                } else {

                    clearError(
                        "confirmPassword"
                    );
                }

            }
        );

    }


    /* =====================================================
       SMOOTH PAGE EXPERIENCE
    ===================================================== */

    document.querySelectorAll(
        "a[href^='#']"
    ).forEach(link => {

        link.addEventListener("click", event => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });

});

