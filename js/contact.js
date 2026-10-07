
/* =====================================================
   STACKLY LOGISTICS CONTACT JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("hide");
            }

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
            offset: 80
        });

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton =
        document.getElementById("menuButton");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuButton && mobileNav) {

        menuButton.addEventListener("click", () => {

            mobileNav.classList.toggle("open");

            const icon =
                menuButton.querySelector("i");


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

                const icon =
                    menuButton.querySelector("i");

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
       HEADER SCROLL
    ================================================= */

    const header =
        document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

/* =================================================
   CONTACT FORM
================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value.trim();


        /* REQUIRED FIELD VALIDATION */
        if (!name || !email || !phone || !service || !message) {

            formMessage.textContent =
                "Please complete all required fields.";

            return;
        }


        /* EMAIL VALIDATION */
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            return;
        }


        /* PHONE VALIDATION */
        const phonePattern =
            /^[0-9+\-\s()]{8,15}$/;

        if (!phonePattern.test(phone)) {

            formMessage.textContent =
                "Please enter a valid phone number.";

            return;
        }


        /* SUCCESS MESSAGE */
        formMessage.textContent =
            "Thank you! Your enquiry has been received.";


        /* REDIRECT TO 404 PAGE */
        setTimeout(() => {
            window.location.href = "404.html";
        }, 1000);

    });

}

    /* =================================================
       FAQ ACCORDION
    ================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

            });


            if (!isActive) {

                item.classList.add("active");

            }

        });

    });


    /* =================================================
       COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll("[data-counter]");

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(counter => {

            const target =
                Number(counter.dataset.counter);

            let current = 0;

            const duration = 1600;

            const increment =
                target / (duration / 16);


            function updateCounter() {

                current += increment;


                if (current < target) {

                    counter.textContent =
                        Math.floor(current).toLocaleString();

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            }


            updateCounter();

        });

    }


    const statsSection =
        document.querySelector(".stats-section");


    if (statsSection) {

        const observer =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounters();

                        observer.disconnect();

                    }

                });

            }, {
                threshold: .3
            });


        observer.observe(statsSection);

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
       ESCAPE — CLOSE MOBILE MENU
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && mobileNav) {

            mobileNav.classList.remove("open");

            const icon =
                menuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    /* =================================================
       IMAGE ERROR HANDLING
    ================================================= */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.visibility = "hidden";

        });

    });

});

