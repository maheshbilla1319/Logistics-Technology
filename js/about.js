/* =========================================================
   STACKLY LOGISTICS
   MAIN JAVASCRIPT
   COMPLETE VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            mirror: false
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

        }, 600);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuButton && mobileNav) {

        menuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    mobileNav.classList.toggle("open");


                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );


                const icon =
                    menuButton.querySelector("i");


                if (icon) {

                    icon.classList.toggle(
                        "fa-bars",
                        !isOpen
                    );

                    icon.classList.toggle(
                        "fa-xmark",
                        isOpen
                    );

                }

            }
        );


        /* Close menu after clicking a link */

        mobileNav
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mobileNav.classList.remove("open");

                        document.body.classList.remove(
                            "menu-open"
                        );


                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        menuButton.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );


                        const icon =
                            menuButton.querySelector("i");


                        if (icon) {

                            icon.classList.remove(
                                "fa-xmark"
                            );

                            icon.classList.add(
                                "fa-bars"
                            );

                        }

                    }
                );

            });

    }


    /* =========================================================
       HERO IMAGE SLIDER
    ========================================================= */

    const hero =
        document.querySelector(".hero");

    const heroSlider =
        document.getElementById("heroSlider");

    const slides =
        document.querySelectorAll(".hero-slide");

    const prevButton =
        document.getElementById("prevSlide");

    const nextButton =
        document.getElementById("nextSlide");

    const slideNumber =
        document.getElementById("slideNumber");

    const slideProgress =
        document.getElementById("slideProgress");


    let currentSlide = 0;

    let slideTimer = null;

    let touchStartX = 0;

    let touchEndX = 0;

    let isSliderPaused = false;

    const slideDuration = 6000;


    /* =========================================================
       UPDATE SLIDE COUNTER
    ========================================================= */

    function updateSlideCounter() {

        if (!slides.length) {
            return;
        }


        const current =
            String(currentSlide + 1)
                .padStart(2, "0");


        const total =
            String(slides.length)
                .padStart(2, "0");


        if (slideNumber) {

            slideNumber.textContent =
                `${current} / ${total}`;

        }


        if (slideProgress) {

            const progress =
                ((currentSlide + 1) /
                    slides.length) * 100;


            slideProgress.style.width =
                `${progress}%`;

        }

    }


    /* =========================================================
       SHOW SLIDE
    ========================================================= */

    function showSlide(index) {

        if (!slides.length) {
            return;
        }


        /* Loop back */

        if (index >= slides.length) {

            currentSlide = 0;

        }

        /* Loop to last */

        else if (index < 0) {

            currentSlide =
                slides.length - 1;

        }

        else {

            currentSlide = index;

        }


        /* Remove active from all slides */

        slides.forEach(function (slide) {

            slide.classList.remove("active");

        });


        /* Activate current slide */

        slides[currentSlide]
            .classList.add("active");


        /* Update number */

        updateSlideCounter();


        /* Refresh AOS */

        if (typeof AOS !== "undefined") {

            setTimeout(function () {

                AOS.refresh();

            }, 100);

        }

    }


    /* =========================================================
       NEXT SLIDE
    ========================================================= */

    function nextSlide() {

        showSlide(
            currentSlide + 1
        );

    }


    /* =========================================================
       PREVIOUS SLIDE
    ========================================================= */

    function previousSlide() {

        showSlide(
            currentSlide - 1
        );

    }


    /* =========================================================
       STOP SLIDER
    ========================================================= */

    function stopSlider() {

        if (slideTimer !== null) {

            clearInterval(slideTimer);

            slideTimer = null;

        }

    }


    /* =========================================================
       START SLIDER
    ========================================================= */

    function startSlider() {

        stopSlider();


        if (
            slides.length > 1 &&
            !isSliderPaused
        ) {

            slideTimer =
                setInterval(function () {

                    nextSlide();

                }, slideDuration);

        }

    }


    /* =========================================================
       RESET SLIDER TIMER
    ========================================================= */

    function resetSliderTimer() {

        stopSlider();

        startSlider();

    }


    /* =========================================================
       INITIAL SLIDER
    ========================================================= */

    if (slides.length) {

        showSlide(0);

        startSlider();

    }


    /* =========================================================
       PREVIOUS BUTTON
    ========================================================= */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                previousSlide();

                resetSliderTimer();

            }
        );

    }


    /* =========================================================
       NEXT BUTTON
    ========================================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                nextSlide();

                resetSliderTimer();

            }
        );

    }


    /* =========================================================
       PAUSE ON HERO HOVER
    ========================================================= */

    if (hero) {

        hero.addEventListener(
            "mouseenter",
            function () {

                isSliderPaused = true;

                stopSlider();

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                isSliderPaused = false;

                startSlider();

            }
        );

    }


    /* =========================================================
       KEYBOARD CONTROLS
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (!slides.length) {
                return;
            }


            /* Don't trigger slider while typing */

            const activeElement =
                document.activeElement;


            const isTyping =
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.tagName === "SELECT"
                );


            if (isTyping) {
                return;
            }


            if (event.key === "ArrowRight") {

                event.preventDefault();

                nextSlide();

                resetSliderTimer();

            }


            if (event.key === "ArrowLeft") {

                event.preventDefault();

                previousSlide();

                resetSliderTimer();

            }

        }
    );


    /* =========================================================
       TOUCH SWIPE
    ========================================================= */

    if (heroSlider) {

        heroSlider.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

                stopSlider();

            },
            {
                passive: true
            }
        );


        heroSlider.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const distance =
                    touchStartX -
                    touchEndX;


                /* Minimum swipe distance */

                if (Math.abs(distance) >= 50) {

                    if (distance > 0) {

                        nextSlide();

                    } else {

                        previousSlide();

                    }

                }


                startSlider();

            },
            {
                passive: true
            }
        );

    }


    /* =========================================================
       VISIBILITY CHANGE
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                stopSlider();

            } else {

                startSlider();

            }

        }
    );


    /* =========================================================
       ACTIVE NAVIGATION ON SCROLL
    ========================================================= */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a:not(.nav-login)"
        );


    /*
       Use all sections instead of only
       main section[id].
    */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateActiveNav() {

        if (!navLinks.length) {
            return;
        }


        const scrollPosition =
            window.scrollY + 180;


        let activeId = "home";


        sections.forEach(
            function (section) {

                const top =
                    section.offsetTop;

                const bottom =
                    top + section.offsetHeight;


                if (
                    scrollPosition >= top &&
                    scrollPosition < bottom
                ) {

                    activeId =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute("href");


                if (
                    href === `#${activeId}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );


    updateActiveNav();


    /* =========================================================
       COUNTER ANIMATION
    ========================================================= */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    let countersStarted = false;


    function animateCounters() {

        if (
            countersStarted ||
            !counters.length
        ) {

            return;

        }


        countersStarted = true;


        counters.forEach(
            function (counter) {

                const target =
                    Number(
                        counter.dataset.target
                    );


                if (Number.isNaN(target)) {
                    return;
                }


                const duration = 1800;

                const startTime =
                    performance.now();


                function updateCounter(
                    currentTime
                ) {

                    const elapsed =
                        currentTime -
                        startTime;


                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );


                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const currentValue =
                        Math.floor(
                            target * eased
                        );


                    counter.textContent =
                        currentValue.toLocaleString();


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target.toLocaleString();

                    }

                }


                requestAnimationFrame(
                    updateCounter
                );

            }
        );

    }


    const numbersSection =
        document.querySelector(
            ".numbers-section"
        );


    if (
        numbersSection &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounters();

                                counterObserver.disconnect();

                            }

                        }
                    );

                },
                {
                    threshold: 0.25
                }
            );


        counterObserver.observe(
            numbersSection
        );

    }

    else {

        animateCounters();

    }


  /* =========================================================
   TRACKING FORM
   VALIDATION + 404 REDIRECT
========================================================= */

const trackingForm = document.querySelector(".tracking-form");
const trackingInput = document.getElementById("trackingNumber");
const trackingResult = document.getElementById("trackingResult");
const trackingButton = document.getElementById("trackButton");

if (trackingForm && trackingInput) {

    trackingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const trackingNumber = trackingInput.value.trim();

        /* Clear previous message */
        if (trackingResult) {
            trackingResult.textContent = "";
            trackingResult.classList.remove(
                "show",
                "success",
                "error"
            );
        }

        /* Empty tracking number */
        if (trackingNumber === "") {

            if (trackingResult) {
                trackingResult.textContent =
                    "Please enter your tracking number.";

                trackingResult.classList.add(
                    "show",
                    "error"
                );
            }

            trackingInput.focus();
            return;
        }

        /* Minimum 5 characters */
        if (trackingNumber.length < 5) {

            if (trackingResult) {
                trackingResult.textContent =
                    "Please enter a valid tracking number.";

                trackingResult.classList.add(
                    "show",
                    "error"
                );
            }

            trackingInput.focus();
            return;
        }

        /* Valid tracking number */
        if (trackingResult) {

            trackingResult.textContent =
                "Tracking shipment...";

            trackingResult.classList.add(
                "show",
                "success"
            );
        }

        /* Disable button */
        if (trackingButton) {
            trackingButton.disabled = true;
            trackingButton.innerHTML =
                'Tracking... <i class="fa-solid fa-spinner fa-spin"></i>';
        }

        /* Redirect to 404.html */
        setTimeout(function () {

            window.location.href = "404.html";

        }, 1000);

    });

}


    /* =========================================================
       SMOOTH INTERNAL LINKS
    ========================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

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


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    const header =
        document.getElementById(
            "header"
        );


    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* =========================================================
       IMAGE ERROR HANDLING
    ========================================================= */

    document.querySelectorAll(
        "img"
    ).forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    /*
                       Don't hide hero images.
                       Add broken class instead.
                    */

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /* =========================================================
       BACK TO TOP
    ========================================================= */

    const backTop =
        document.querySelector(
            '.footer-bottom a[href="#home"]'
        );


    if (backTop) {

        backTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =========================================================
       RESIZE
       Keep slider stable after screen resize
    ========================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (slides.length) {

                showSlide(currentSlide);

            }

        }
    );

});