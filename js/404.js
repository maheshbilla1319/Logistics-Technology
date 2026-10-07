
/* =========================================================
   STACKLY LOGISTICS - 404 JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS INITIALIZATION
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
        }, 450);
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isActive = mobileNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isActive ? "true" : "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isActive
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }

        });


        /* Close mobile menu when clicking a link */

        mobileNav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "fa-solid fa-bars";
                }

            });

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                mobileNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "fa-solid fa-bars";
                }

            }

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       404 NUMBER MOUSE PARALLAX
    ===================================================== */

    const errorMap = document.querySelector(".error-map");

    if (errorMap && window.matchMedia("(min-width: 901px)").matches) {

        document.addEventListener("mousemove", (event) => {

            const x = (event.clientX / window.innerWidth - 0.5) * 8;
            const y = (event.clientY / window.innerHeight - 0.5) * 8;

            errorMap.style.transform =
                `translate(${x}px, ${y}px) rotate(-8deg)`;

        });

    }


    /* =====================================================
       ROUTE TRUCK INTERACTION
    ===================================================== */

    const routeTruck = document.querySelector(".route-truck");

    if (routeTruck) {

        routeTruck.addEventListener("mouseenter", () => {
            routeTruck.style.animationPlayState = "paused";
        });

        routeTruck.addEventListener("mouseleave", () => {
            routeTruck.style.animationPlayState = "running";
        });

    }


    /* =====================================================
       QUICK BUTTON FEEDBACK
    ===================================================== */

    const actionButtons = document.querySelectorAll(
        ".primary-btn, .secondary-btn"
    );

    actionButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 400);

        });

    });


    /* =====================================================
       PREVENT STUCK MOBILE NAV ON RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
            mobileNav &&
            menuToggle
        ) {
            mobileNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "fa-solid fa-bars";
            }
        }

    });

});

