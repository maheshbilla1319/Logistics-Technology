
/* =========================================================
   STACKLY LOGISTICS LOGIN JS
   ANY VALID EMAIL + ANY PASSWORD
   ROLE BASED DASHBOARD REDIRECT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


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

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (preloader) {
                preloader.classList.add("hide");
            }

        }, 500);

    });


    /* =====================================================
       ROLE SELECTION
       ===================================================== */

    const roleButtons =
        document.querySelectorAll(".role-button");

    roleButtons.forEach(function (button) {

        const radio =
            button.querySelector("input");

        if (!radio) return;

        radio.addEventListener("change", function () {

            roleButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            if (radio.checked) {
                button.classList.add("active");
            }

        });

    });


    /* =====================================================
       PASSWORD SHOW / HIDE
       ===================================================== */

    const password =
        document.getElementById("loginPassword");

    const passwordToggle =
        document.getElementById("passwordToggle");

    if (passwordToggle && password) {

        passwordToggle.addEventListener("click", function () {

            const icon =
                passwordToggle.querySelector("i");

            if (password.type === "password") {

                password.type = "text";

                if (icon) {
                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");
                }

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                passwordToggle.setAttribute(
                    "title",
                    "Hide password"
                );

            } else {

                password.type = "password";

                if (icon) {
                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");
                }

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

                passwordToggle.setAttribute(
                    "title",
                    "Show password"
                );

            }

        });

    }


    /* =====================================================
       FORM ELEMENTS
       ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const email =
        document.getElementById("loginEmail");

    const loginPassword =
        document.getElementById("loginPassword");

    const loginMessage =
        document.getElementById("loginMessage");

    const rememberMe =
        document.getElementById("rememberMe");

    const loginButton =
        document.getElementById("loginButton");


    if (
        !loginForm ||
        !email ||
        !loginPassword
    ) {
        return;
    }


    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    function validEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    }


    /* =====================================================
       ERROR FUNCTION
       ===================================================== */

    function setError(input, message, errorId) {

        const wrapper =
            input.closest(".input-box");

        const error =
            document.getElementById(errorId);

        if (wrapper) {

            wrapper.classList.add("error");
            wrapper.classList.remove("success");

        }

        if (error) {
            error.textContent = message;
        }

    }


    /* =====================================================
       CLEAR ERROR
       ===================================================== */

    function clearError(input, errorId) {

        const wrapper =
            input.closest(".input-box");

        const error =
            document.getElementById(errorId);

        if (wrapper) {

            wrapper.classList.remove("error");

            if (input.value.trim()) {
                wrapper.classList.add("success");
            } else {
                wrapper.classList.remove("success");
            }

        }

        if (error) {
            error.textContent = "";
        }

    }


    /* =====================================================
       SHOW MESSAGE
       ===================================================== */

    function showMessage(message, type = "error") {

        if (!loginMessage) return;

        loginMessage.textContent = message;

        loginMessage.classList.remove(
            "show",
            "success",
            "error"
        );

        loginMessage.classList.add(
            "show",
            type
        );

    }


    /* =====================================================
       LIVE EMAIL VALIDATION
       ===================================================== */

    email.addEventListener("input", function () {

        const value =
            email.value.trim();

        if (value === "") {

            clearError(
                email,
                "emailError"
            );

            return;

        }

        if (!validEmail(value)) {

            setError(
                email,
                "Please enter a valid email address.",
                "emailError"
            );

        } else {

            clearError(
                email,
                "emailError"
            );

        }

    });


    /* =====================================================
       LIVE PASSWORD VALIDATION
       ===================================================== */

    loginPassword.addEventListener(
        "input",
        function () {

            const value =
                loginPassword.value;

            if (value.trim() === "") {

                setError(
                    loginPassword,
                    "Please enter your password.",
                    "passwordError"
                );

            } else {

                clearError(
                    loginPassword,
                    "passwordError"
                );

            }

        }
    );


    /* =====================================================
       LOGIN SUBMIT
       ===================================================== */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =================================================
               CLEAR OLD MESSAGE
            ================================================= */

            if (loginMessage) {

                loginMessage.classList.remove(
                    "show",
                    "success",
                    "error"
                );

                loginMessage.textContent = "";

            }


            /* =================================================
               GET EMAIL
            ================================================= */

            const enteredEmail =
                email.value.trim().toLowerCase();


            /* =================================================
               GET PASSWORD
            ================================================= */

            const enteredPassword =
                loginPassword.value;


            /* =================================================
               GET SELECTED ROLE
            ================================================= */

            const selectedRole =
                document.querySelector(
                    'input[name="loginRole"]:checked'
                );


            /* =================================================
               ROLE CHECK
            ================================================= */

            if (!selectedRole) {

                showMessage(
                    "Please select Admin or Customer.",
                    "error"
                );

                return;

            }


            const role =
                selectedRole.value;


            /* =================================================
               FORM VALIDATION
            ================================================= */

            let valid = true;


            /* =================================================
               EMAIL REQUIRED
            ================================================= */

            if (enteredEmail === "") {

                setError(
                    email,
                    "Please enter your email address.",
                    "emailError"
                );

                valid = false;

            }


            /* =================================================
               EMAIL FORMAT
            ================================================= */

            else if (!validEmail(enteredEmail)) {

                setError(
                    email,
                    "Please enter a valid email address.",
                    "emailError"
                );

                valid = false;

            }


            /* =================================================
               EMAIL SUCCESS
            ================================================= */

            else {

                clearError(
                    email,
                    "emailError"
                );

            }


            /* =================================================
               PASSWORD REQUIRED
            ================================================= */

            if (enteredPassword.trim() === "") {

                setError(
                    loginPassword,
                    "Please enter your password.",
                    "passwordError"
                );

                valid = false;

            }


            /* =================================================
               PASSWORD SUCCESS
            ================================================= */

            else {

                clearError(
                    loginPassword,
                    "passwordError"
                );

            }


            /* =================================================
               STOP IF VALIDATION FAILS
            ================================================= */

            if (!valid) {

                showMessage(
                    "Please fill in all required fields correctly.",
                    "error"
                );

                loginForm.classList.add("shake");

                setTimeout(function () {

                    loginForm.classList.remove("shake");

                }, 500);

                return;

            }


            /* =================================================
               DETERMINE DASHBOARD
            ================================================= */

            let redirectPage = "";


            if (role === "admin") {

                redirectPage = "admin.html";

            }


            else if (role === "customer") {

                redirectPage = "customer.html";

            }


            else {

                showMessage(
                    "Invalid login role.",
                    "error"
                );

                return;

            }


            /* =================================================
               SAVE LOGIN DATA
            ================================================= */

            try {

                localStorage.setItem(
                    "stacklyLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "stacklyRole",
                    role
                );

                localStorage.setItem(
                    "stacklyEmail",
                    enteredEmail
                );


                /* ---------------------------------------------
                   REMEMBER ME
                --------------------------------------------- */

                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "stacklyRemember",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "stacklyRemember"
                    );

                }

            }

            catch (error) {

                console.warn(
                    "Local storage unavailable."
                );

            }


            /* =================================================
               SUCCESS MESSAGE
            ================================================= */

            showMessage(
                "Login successful. Redirecting to your dashboard...",
                "success"
            );


            /* =================================================
               CHANGE BUTTON
            ================================================= */

            if (loginButton) {

                const buttonText =
                    loginButton.querySelector("span");

                const buttonIcon =
                    loginButton.querySelector("i");


                if (buttonText) {

                    buttonText.textContent =
                        "Login Successful";

                }


                if (buttonIcon) {

                    buttonIcon.className =
                        "fa-solid fa-check";

                }


                loginButton.disabled = true;

            }


            /* =================================================
               REDIRECT
               
               ADMIN    → admin.html
               CUSTOMER → customer.html
            ================================================= */

            setTimeout(function () {

                window.location.href =
                    redirectPage;

            }, 1000);

        }
    );


    /* =====================================================
       FORGOT PASSWORD
       ===================================================== */

    const forgotPassword =
        document.getElementById("forgotPassword");

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.location.href =
                    "404.html";

            }
        );

    }


    /* =====================================================
       REMEMBER ME
       ===================================================== */

    if (rememberMe) {

        try {

            const savedRemember =
                localStorage.getItem(
                    "stacklyRemember"
                );

            if (savedRemember === "true") {

                rememberMe.checked = true;

            }

        }

        catch (error) {

            console.warn(
                "Storage unavailable."
            );

        }


        rememberMe.addEventListener(
            "change",
            function () {

                try {

                    if (rememberMe.checked) {

                        localStorage.setItem(
                            "stacklyRemember",
                            "true"
                        );

                    } else {

                        localStorage.removeItem(
                            "stacklyRemember"
                        );

                    }

                }

                catch (error) {

                    console.warn(
                        "Storage unavailable."
                    );

                }

            }
        );

    }

});

