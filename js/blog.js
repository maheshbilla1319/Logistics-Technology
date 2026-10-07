
/* =====================================================
   STACKLY LOGISTICS BLOG JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");
            document.body.classList.remove("loading");

        }, 600);

    });


    /* =================================================
       AOS
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            disable: false
        });

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton = document.getElementById("menuButton");
    const mobileNav = document.getElementById("mobileNav");

    if (menuButton && mobileNav) {

        menuButton.addEventListener("click", () => {

            mobileNav.classList.toggle("open");

            const icon = menuButton.querySelector("i");

            if (mobileNav.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuButton.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

                menuButton.setAttribute(
                    "title",
                    "Close navigation menu"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuButton.setAttribute(
                    "title",
                    "Open navigation menu"
                );

            }

        });


        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                const icon = menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =================================================
       CATEGORY BUTTONS
    ================================================= */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

        });

    });


    /* =================================================
       NEWSLETTER FORM
    ================================================= */

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterEmail =
        document.getElementById("newsletterEmail");

    const formMessage =
        document.getElementById("formMessage");


    if (newsletterForm) {

        newsletterForm.addEventListener("submit", event => {

            event.preventDefault();

            const email = newsletterEmail.value.trim();

            if (!email) {

                formMessage.textContent =
                    "Please enter your email address.";

                return;
            }


            if (!email.includes("@")) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                return;
            }


            formMessage.textContent =
                "Thank you! You are now subscribed to Stackly Logistics insights.";

            newsletterForm.reset();

        });

    }


    /* =================================================
       SMOOTH INTERNAL LINKS
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {

                event.preventDefault();
                return;

            }


            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =================================================
       IMAGE FALLBACK
       Prevent broken image areas
    ================================================= */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.visibility = "hidden";

        });

    });


    /* =================================================
       ESCAPE KEY — CLOSE MOBILE MENU
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (mobileNav) {
                mobileNav.classList.remove("open");
            }

            if (menuButton) {

                const icon =
                    menuButton.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }

    });

});

