/* =========================================================
   STACKLY LOGISTICS
   SCRIPT.JS
   ========================================================= */

"use strict";

/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initHeader();
    initMobileMenu();
    initAOS();
    initGSAP();
    initCounters();
    initTracking();
    initFAQ();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initActiveNavigation();
    initImageLazyLoading();

});


/* =========================================================
   02. PRELOADER
   ========================================================= */

function initPreloader() {

    const preloader = document.querySelector(".preloader");

    if (!preloader) {
        return;
    }

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 500);

    });

}


/* =========================================================
   03. HEADER SCROLL
   ========================================================= */

function initHeader() {

    const header = document.querySelector(".header");

    if (!header) {
        return;
    }

    const updateHeader = () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   04. MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const menuButton = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");

    if (!menuButton || !mobileNav) {
        return;
    }

    const menuIcon = menuButton.querySelector("i");

    menuButton.addEventListener("click", () => {

        const isOpen = mobileNav.classList.toggle("open");

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        if (menuIcon) {

            menuIcon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            menuIcon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }

    });


    /* Close mobile menu after clicking a link */

    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");
            document.body.classList.remove("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            if (menuIcon) {

                menuIcon.classList.remove(
                    "fa-xmark"
                );

                menuIcon.classList.add(
                    "fa-bars"
                );

            }

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            mobileNav.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            mobileNav.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            mobileNav.classList.remove("open");
            document.body.classList.remove("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            if (menuIcon) {

                menuIcon.classList.remove(
                    "fa-xmark"
                );

                menuIcon.classList.add(
                    "fa-bars"
                );

            }

        }

    });

}


/* =========================================================
   05. AOS INITIALIZATION
   ========================================================= */

function initAOS() {

    if (typeof AOS === "undefined") {
        return;
    }

    AOS.init({

        duration: 850,

        easing: "ease-out-cubic",

        once: true,

        offset: 80,

        delay: 0,

        disable: () => {
            return window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
        }

    });

}


/* =========================================================
   06. GSAP ANIMATIONS
   ========================================================= */

function initGSAP() {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    /* Hero content */

    const heroContent = document.querySelector(
        ".hero-content"
    );

    if (heroContent) {

        gsap.from(heroContent, {

            opacity: 0,

            y: 40,

            duration: 1,

            ease: "power3.out",

            delay: 0.4

        });

    }


    /* Hero image */

    const heroVisual = document.querySelector(
        ".hero-visual"
    );

    if (heroVisual) {

        gsap.from(heroVisual, {

            opacity: 0,

            x: 60,

            duration: 1.1,

            ease: "power3.out",

            delay: 0.5

        });

    }


    /* Hero image parallax */

    const heroImage = document.querySelector(
        ".hero-image-frame img"
    );

    if (heroImage) {

        gsap.to(heroImage, {

            yPercent: -7,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero-section",

                start: "top top",

                end: "bottom top",

                scrub: true

            }

        });

    }


    /* Section headings */

    gsap.utils.toArray(
        ".section-heading h2"
    ).forEach((heading) => {

        gsap.from(heading, {

            opacity: 0,

            y: 35,

            duration: 0.8,

            ease: "power3.out",

            scrollTrigger: {

                trigger: heading,

                start: "top 85%",

                once: true

            }

        });

    });


    /* Service cards */

    gsap.utils.toArray(
        ".service-card"
    ).forEach((card, index) => {

        gsap.from(card, {

            opacity: 0,

            y: 35,

            duration: 0.7,

            delay: index * 0.08,

            ease: "power3.out",

            scrollTrigger: {

                trigger: card,

                start: "top 88%",

                once: true

            }

        });

    });


    /* Process cards */

    gsap.utils.toArray(
        ".process-card"
    ).forEach((card, index) => {

        gsap.from(card, {

            opacity: 0,

            y: 30,

            duration: 0.7,

            delay: index * 0.1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".process-grid",

                start: "top 80%",

                once: true

            }

        });

    });


    /* Gallery */

    gsap.utils.toArray(
        ".gallery-item"
    ).forEach((item, index) => {

        gsap.from(item, {

            opacity: 0,

            scale: 0.95,

            duration: 0.7,

            delay: index * 0.08,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".gallery-grid",

                start: "top 80%",

                once: true

            }

        });

    });


    /* Contact image */

    const contactImage =
        document.querySelector(".contact-main-image");

    if (contactImage) {

        gsap.from(contactImage, {

            opacity: 0,

            x: -50,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".contact-section",

                start: "top 75%",

                once: true

            }

        });

    }


    /* CTA */

    const ctaWrapper =
        document.querySelector(".cta-wrapper");

    if (ctaWrapper) {

        gsap.from(ctaWrapper, {

            opacity: 0,

            y: 40,

            duration: 0.9,

            ease: "power3.out",

            scrollTrigger: {

                trigger: ".cta-section",

                start: "top 85%",

                once: true

            }

        });

    }

}


/* =========================================================
   07. COUNTERS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(
                        entry.target
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach((counter) => {

        observer.observe(counter);

    });

}


function animateCounter(element) {

    const target =
        parseFloat(
            element.dataset.counter || "0"
        );

    const duration = 1800;

    const startTime = performance.now();

    const hasDecimal =
        !Number.isInteger(target);


    const suffix =
        element.dataset.suffix || "";


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            target * eased;


        if (hasDecimal) {

            element.textContent =
                currentValue.toFixed(1) +
                suffix;

        } else {

            element.textContent =
                Math.floor(currentValue).toLocaleString() +
                suffix;

        }


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   08. TRACKING SYSTEM
   ========================================================= */

function initTracking() {

    const trackingForm =
        document.querySelector(".tracking-form");

    const trackingInput =
        document.querySelector("#trackingNumber");

    const trackingResult =
        document.querySelector("#trackingResult");

    const trackButton =
        document.querySelector("#trackButton");


    if (
        !trackingForm ||
        !trackingInput ||
        !trackingResult
    ) {
        return;
    }


    /* =====================================================
       TRACKING FORM SUBMIT
       ===================================================== */

    trackingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const trackingNumber =
            trackingInput.value.trim();


        /* Empty validation */
        if (!trackingNumber) {

            showTrackingMessage(
                "Please enter a tracking number.",
                false
            );

            trackingInput.focus();

            return;
        }


        /* Minimum length validation */
        if (trackingNumber.length < 5) {

            showTrackingMessage(
                "Please enter a valid tracking number.",
                false
            );

            trackingInput.focus();

            return;
        }


        /* Valid tracking number */
        showTrackingMessage(
            "Tracking number accepted. Redirecting...",
            true
        );


        /* Disable button while redirecting */
        if (trackButton) {
            trackButton.disabled = true;
        }


        /* Redirect to 404 page */
        setTimeout(function () {

            window.location.href = "404.html";

        }, 800);

    });


    /* =====================================================
       TRACKING MESSAGE
       ===================================================== */

    function showTrackingMessage(message, success) {

        trackingResult.textContent = message;

        trackingResult.classList.add("show");

        trackingResult.classList.toggle(
            "success",
            success
        );

        trackingResult.classList.toggle(
            "error",
            !success
        );

        trackingResult.setAttribute(
            "aria-live",
            "polite"
        );
    }

}


/* =========================================================
   INITIALIZE TRACKING
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initTracking();

});

/* =========================================================
   09. FAQ ACCORDION
   ========================================================= */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    if (!faqItems.length) {
        return;
    }


    faqItems.forEach((item) => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) {
            return;
        }


        question.setAttribute(
            "aria-expanded",
            "false"
        );


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                /* Close all */

                faqItems.forEach(
                    (otherItem) => {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherQuestion =
                            otherItem.querySelector(
                                ".faq-question"
                            );

                        if (otherQuestion) {

                            otherQuestion.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );


                /* Open clicked */

                if (!isActive) {

                    item.classList.add(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });

}


/* =========================================================
   10. CONTACT FORM
   ========================================================= */

function initContactForm() {

    const contactForm =
        document.querySelector(
            "#contactForm"
        );

    const formMessage =
        document.querySelector(
            "#formMessage"
        );


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.querySelector(
                    "#contactName"
                );

            const email =
                document.querySelector(
                    "#contactEmail"
                );

            const phone =
                document.querySelector(
                    "#contactPhone"
                );


            if (!name || !email) {
                return;
            }


            const nameValue =
                name.value.trim();

            const emailValue =
                email.value.trim();

            const phoneValue =
                phone
                    ? phone.value.trim()
                    : "";


            if (!nameValue) {

                showFormMessage(
                    "Please enter your name."
                );

                name.focus();

                return;

            }


            if (!isValidEmail(emailValue)) {

                showFormMessage(
                    "Please enter a valid email address."
                );

                email.focus();

                return;

            }


            if (
                phone &&
                phoneValue &&
                !isValidPhone(phoneValue)
            ) {

                showFormMessage(
                    "Please enter a valid phone number."
                );

                phone.focus();

                return;

            }


            showFormMessage(
                "Thank you! Your enquiry has been submitted successfully."
            );


            contactForm.reset();

        }
    );


    function showFormMessage(message) {

        if (!formMessage) {
            return;
        }

        formMessage.textContent =
            message;

        formMessage.setAttribute(
            "role",
            "status"
        );

    }

}


/* =========================================================
   11. EMAIL VALIDATION
   ========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


/* =========================================================
   12. PHONE VALIDATION
   ========================================================= */

function isValidPhone(phone) {

    const cleaned =
        phone.replace(
            /[\s\-()+]/g,
            ""
        );

    return /^\d{8,15}$/.test(
        cleaned
    );

}


/* =========================================================
   13. BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );

    if (!button) {
        return;
    }


    const toggleButton = () => {

        if (window.scrollY > 500) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    };


    toggleButton();


    window.addEventListener(
        "scroll",
        toggleButton,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   14. SMOOTH SCROLL
   ========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   15. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]'
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.25;


        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(
                "active",
                href ===
                `#${currentSection}`
            );

        });

    };


    updateActiveLink();


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );

}


/* =========================================================
   16. IMAGE LAZY LOADING
   ========================================================= */

function initImageLazyLoading() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        if (
            !image.hasAttribute(
                "loading"
            )
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* Keep first hero image eager */

    const heroImage =
        document.querySelector(
            ".hero-image-frame img"
        );


    if (heroImage) {

        heroImage.setAttribute(
            "loading",
            "eager"
        );

    }

}


/* =========================================================
   17. IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
    "error",
    (event) => {

        const image =
            event.target;


        if (
            image &&
            image.tagName === "IMG"
        ) {

            image.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   18. ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        const mobileNav =
            document.querySelector(
                ".mobile-nav"
            );

        const menuButton =
            document.querySelector(
                ".menu-button"
            );


        if (
            mobileNav &&
            mobileNav.classList.contains(
                "open"
            )
        ) {

            mobileNav.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );


            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuButton.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);


/* =========================================================
   19. RESIZE HANDLER
   ========================================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(() => {

                if (
                    typeof AOS !== "undefined"
                ) {

                    AOS.refresh();

                }


                if (
                    typeof ScrollTrigger !==
                    "undefined"
                ) {

                    ScrollTrigger.refresh();

                }

            }, 250);

    }
);


/* =========================================================
   20. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }

        }

    }
);