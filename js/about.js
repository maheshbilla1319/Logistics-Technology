/* =========================================================
STACKLY LOGISTICS
MAIN JAVASCRIPT
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
        offset: 80,
        mirror: false
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

    }, 600);

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

        const isOpen = mobileNav.classList.toggle("open");

        document.body.classList.toggle("menu-open", isOpen);

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

        const icon = menuButton.querySelector("i");

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

    });


    /* Close menu after clicking link */

    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");

            document.body.classList.remove("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            const icon = menuButton.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =====================================================
   HERO SLIDER
===================================================== */

const slides = document.querySelectorAll(".hero-slide");
const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");
const slideNumber = document.getElementById("slideNumber");
const slideProgress = document.getElementById("slideProgress");

let currentSlide = 0;
let slideTimer = null;

const slideDuration = 6000;


function updateSlideCounter() {

    if (!slideNumber) {
        return;
    }

    const current = String(currentSlide + 1).padStart(2, "0");
    const total = String(slides.length).padStart(2, "0");

    slideNumber.textContent = `${current} / ${total}`;

    if (slideProgress) {

        const progress =
            ((currentSlide + 1) / slides.length) * 100;

        slideProgress.style.width = `${progress}%`;

    }

}


function showSlide(index) {

    if (!slides.length) {
        return;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    currentSlide =
        (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    updateSlideCounter();

    /* Refresh AOS elements inside active slide */

    if (typeof AOS !== "undefined") {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }

}


function nextSlide() {

    showSlide(currentSlide + 1);

}


function previousSlide() {

    showSlide(currentSlide - 1);

}


function startSlider() {

    stopSlider();

    slideTimer = setInterval(() => {

        nextSlide();

    }, slideDuration);

}


function stopSlider() {

    if (slideTimer) {

        clearInterval(slideTimer);
        slideTimer = null;

    }

}


if (slides.length) {

    updateSlideCounter();

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            nextSlide();
            startSlider();

        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", () => {

            previousSlide();
            startSlider();

        });

    }


    startSlider();


    /* Pause while mouse is over hero */

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.addEventListener(
            "mouseenter",
            stopSlider
        );

        hero.addEventListener(
            "mouseleave",
            startSlider
        );

    }

}






/* =====================================================
   HERO KEYBOARD CONTROL
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {

        nextSlide();
        startSlider();

    }

    if (event.key === "ArrowLeft") {

        previousSlide();
        startSlider();

    }

});


/* =====================================================
   HERO TOUCH SWIPE
===================================================== */

const heroSlider =
    document.getElementById("heroSlider");

let touchStartX = 0;
let touchEndX = 0;

if (heroSlider) {

    heroSlider.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    heroSlider.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchStartX - touchEndX;

            if (Math.abs(distance) < 50) {
                return;
            }

            if (distance > 0) {
                nextSlide();
            } else {
                previousSlide();
            }

            startSlider();

        },
        { passive: true }
    );

}


/* =====================================================
   ACTIVE NAVIGATION ON SCROLL
===================================================== */

const navLinks =
    document.querySelectorAll(
        ".desktop-nav a:not(.nav-login)"
    );

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 180;

    let activeId = "home";

    sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {

            activeId = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${activeId}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function animateCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        const duration = 1800;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                Math.floor(target * eased);

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


        requestAnimationFrame(updateCounter);

    });

}


const numbersSection =
    document.querySelector(".numbers-section");


if (numbersSection) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounters();

                        counterObserver.disconnect();

                    }

                });

            },
            {
                threshold: .25
            }
        );

    counterObserver.observe(numbersSection);

}


/* =====================================================
   TRACKING FORM
===================================================== */

const trackingForm =
    document.getElementById("trackingForm");

const trackingInput =
    document.getElementById("trackingNumber");

const trackingMessage =
    document.getElementById("trackingMessage");


if (trackingForm) {

    trackingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const trackingNumber =
                trackingInput
                    ? trackingInput.value.trim()
                    : "";


            if (!trackingNumber) {

                if (trackingMessage) {

                    trackingMessage.textContent =
                        "Please enter your tracking number.";

                }

                return;

            }


            if (trackingMessage) {

                trackingMessage.textContent =
                    `Shipment ${trackingNumber.toUpperCase()} is currently in transit.`;

            }

        }
    );

}


/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

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

        if (!target) {
            return;
        }


        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header =
    document.getElementById("header");


function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =====================================================
   IMAGE ERROR HANDLING
===================================================== */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.style.display = "none";

    });

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.querySelector(
        '.footer-bottom a[href="#home"]'
    );


if (backTop) {

    backTop.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


});
```js
const trackingForm = document.querySelector("#trackingForm");
const trackingInput = document.querySelector("#trackingNumber");
const trackingMessage = document.querySelector("#trackingMessage");

if (trackingForm) {
    trackingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const trackingNumber = trackingInput.value.trim();

        // Clear previous message
        if (trackingMessage) {
            trackingMessage.textContent = "";
            trackingMessage.classList.remove("error", "success");
        }

        // Validation
        if (trackingNumber === "") {
            if (trackingMessage) {
                trackingMessage.textContent = "Please enter your tracking number.";
                trackingMessage.classList.add("error");
            }

            trackingInput.focus();
            return;
        }

        if (trackingNumber.length < 5) {
            if (trackingMessage) {
                trackingMessage.textContent =
                    "Please enter a valid tracking number.";
                trackingMessage.classList.add("error");
            }

            trackingInput.focus();
            return;
        }

        // Valid tracking number → redirect to 404 page
        if (trackingMessage) {
            trackingMessage.textContent = "Tracking shipment...";
            trackingMessage.classList.add("success");
        }

        setTimeout(function () {
            window.location.href = "404.html";
        }, 500);
    });
}
```
