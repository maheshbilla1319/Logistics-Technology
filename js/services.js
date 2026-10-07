
/* =====================================================
   STACKLY LOGISTICS SERVICES JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (preloader) {
                preloader.classList.add("hide");
            }

            document.body.classList.remove("loading");

        }, 700);

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
            mirror: false
        });

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton = document.getElementById("menuButton");
    const mobileNav = document.getElementById("mobileNav");

    if (menuButton && mobileNav) {

        menuButton.addEventListener("click", function () {

            mobileNav.classList.toggle("open");

            const icon = menuButton.querySelector("i");

            if (mobileNav.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuButton.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

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
       HEADER SCROLL
    ================================================= */

    const header = document.getElementById("header");

    window.addEventListener("scroll", function () {

        if (!header) return;

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 8px 30px rgba(0,0,0,.18)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters = document.querySelectorAll(".counter");

    let counterStarted = false;

    function startCounters() {

        if (counterStarted) return;

        const numbersSection =
            document.querySelector(".numbers-section");

        if (!numbersSection) return;

        const sectionTop =
            numbersSection.getBoundingClientRect().top;

        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight - 100) {

            counterStarted = true;

            counters.forEach(function (counter) {

                const target =
                    Number(counter.getAttribute("data-target"));

                let current = 0;

                const duration = 1800;
                const increment = target / (duration / 16);

                function updateCounter() {

                    current += increment;

                    if (current >= target) {

                        current = target;

                    }

                    if (target >= 1000000) {

                        counter.textContent =
                            (current / 1000000).toFixed(
                                current >= target ? 0 : 1
                            ) + "M+";

                    } else if (target >= 1000) {

                        counter.textContent =
                            Math.floor(current).toLocaleString() + "+";

                    } else {

                        counter.textContent =
                            Math.floor(current) + "+";

                    }

                    if (current < target) {

                        requestAnimationFrame(updateCounter);

                    }

                }

                updateCounter();

            });

        }

    }

    window.addEventListener("scroll", startCounters);

    startCounters();


    /* =================================================
       TESTIMONIAL SLIDER
    ================================================= */

    const testimonialCards =
        document.querySelectorAll(".testimonial-card");

    const testimonialPrev =
        document.getElementById("testimonialPrev");

    const testimonialNext =
        document.getElementById("testimonialNext");

    let testimonialIndex = 0;

    function showTestimonial(index) {

        if (!testimonialCards.length) return;

        testimonialCards.forEach(function (card) {
            card.classList.remove("active");
        });

        testimonialCards[index].classList.add("active");

    }


    if (testimonialNext) {

        testimonialNext.addEventListener("click", function () {

            testimonialIndex++;

            if (testimonialIndex >= testimonialCards.length) {
                testimonialIndex = 0;
            }

            showTestimonial(testimonialIndex);

        });

    }


    if (testimonialPrev) {

        testimonialPrev.addEventListener("click", function () {

            testimonialIndex--;

            if (testimonialIndex < 0) {
                testimonialIndex = testimonialCards.length - 1;
            }

            showTestimonial(testimonialIndex);

        });

    }


    /* AUTO TESTIMONIAL */

    setInterval(function () {

        if (!testimonialCards.length) return;

        testimonialIndex++;

        if (testimonialIndex >= testimonialCards.length) {
            testimonialIndex = 0;
        }

        showTestimonial(testimonialIndex);

    }, 6000);


    /* =================================================
       SERVICE CARD REVEAL
    ================================================= */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            const icon =
                card.querySelector(".service-icon");

            if (icon) {
                icon.style.transform = "rotate(8deg) scale(1.08)";
            }

        });

        card.addEventListener("mouseleave", function () {

            const icon =
                card.querySelector(".service-icon");

            if (icon) {
                icon.style.transform = "rotate(0) scale(1)";
            }

        });

    });


    /* =================================================
       SMOOTH ANCHOR SCROLL
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

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

        });

    });


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backTop =
        document.querySelector(".footer-bottom a");

    if (backTop) {

        backTop.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const currentPage =
        window.location.pathname.split("/").pop();

    document.querySelectorAll(".desktop-nav a").forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) return;

        const cleanHref =
            href.split("/").pop().split("#")[0];

        if (
            cleanHref === currentPage &&
            currentPage !== ""
        ) {

            link.classList.add("active");

        }

    });

});

