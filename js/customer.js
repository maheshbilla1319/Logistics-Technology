
document.addEventListener("DOMContentLoaded", () => {

    /* ================= PRELOADER ================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("hide");
        }, 500);
    });


    /* ================= AOS ================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            once: true,
            offset: 70,
            easing: "ease-out-cubic"
        });
    }


    /* ================= SIDEBAR ================= */

    const sidebar = document.getElementById("sidebar");
    const sidebarCollapse = document.getElementById("sidebarCollapse");
    const mobileMenu = document.getElementById("mobileMenu");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarCollapse) {
        sidebarCollapse.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            sidebar.classList.add("mobile-open");
            sidebarOverlay.classList.add("active");
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeMobileSidebar);
    }

    function closeMobileSidebar() {
        sidebar.classList.remove("mobile-open");
        sidebarOverlay.classList.remove("active");
    }


    /* ================= SECTION NAVIGATION ================= */

    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const sections = document.querySelectorAll(".dashboard-section");
    const pageTitle = document.getElementById("pageTitle");

    const sectionTitles = {
        overview: "Dashboard",
        shipments: "My Shipments",
        tracking: "Track Shipment",
        history: "Shipment History",
        addresses: "Addresses",
        profile: "My Profile",
        settings: "Settings"
    };

    function showSection(sectionId) {

        const target = document.getElementById(sectionId);

        if (!target) {
            return;
        }

        sections.forEach(section => {
            section.classList.remove("active-section");
        });

        sidebarLinks.forEach(link => {
            link.classList.remove("active");
        });

        target.classList.add("active-section");

        const activeLink = document.querySelector(
            `.sidebar-link[data-section="${sectionId}"]`
        );

        if (activeLink) {
            activeLink.classList.add("active");
        }

        if (pageTitle) {
            pageTitle.textContent =
                sectionTitles[sectionId] || "Dashboard";
        }

        closeMobileSidebar();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        setTimeout(() => {
            if (typeof AOS !== "undefined") {
                AOS.refreshHard();
            }
        }, 100);
    }


    sidebarLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const sectionId = link.dataset.section;

            showSection(sectionId);

            history.replaceState(
                null,
                "",
                `#${sectionId}`
            );
        });

    });


    /* ================= INTERNAL SECTION BUTTONS ================= */

    const sectionTriggers =
        document.querySelectorAll(".section-trigger");

    sectionTriggers.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const target = button.dataset.target;

            if (target) {
                showSection(target);

                history.replaceState(
                    null,
                    "",
                    `#${target}`
                );
            }

        });

    });


    /* ================= URL HASH ================= */

    const initialHash =
        window.location.hash.replace("#", "");

    if (initialHash && sectionTitles[initialHash]) {
        showSection(initialHash);
    } else {
        showSection("overview");
    }


    /* ================= TRACKING DATA ================= */

    const trackingData = {

        STK1001: {
            status: "In Transit",
            route: "Hyderabad → Mumbai",
            location: "Near Pune Logistics Hub",
            eta: "08 Oct 2026",
            message: "Your shipment is currently moving towards Mumbai."
        },

        STK1002: {
            status: "In Transit",
            route: "Chennai → Bangalore",
            location: "Hosur Distribution Center",
            eta: "09 Oct 2026",
            message: "Shipment reached the regional distribution center."
        },

        STK1003: {
            status: "Delivered",
            route: "Delhi → Hyderabad",
            location: "Hyderabad",
            eta: "Delivered on 04 Oct 2026",
            message: "Your shipment has been successfully delivered."
        }

    };


    /* ================= TRACKING FORM ================= */

    const trackingForm =
        document.getElementById("trackingForm");

    const trackingNumber =
        document.getElementById("trackingNumber");

    const trackingMessage =
        document.getElementById("trackingMessage");


    function trackShipment(id) {

        const trackingId =
            id.trim().toUpperCase();

        if (!trackingId) {

            trackingMessage.innerHTML =
                "Please enter a tracking number.";

            return;
        }

        const shipment =
            trackingData[trackingId];

        if (!shipment) {

            trackingMessage.innerHTML =
                `<strong>Shipment not found.</strong>
                 Please check your tracking ID and try again.`;

            return;
        }

        trackingMessage.innerHTML = `
            <strong>${trackingId} — ${shipment.status}</strong><br>
            ${shipment.route}<br>
            Current Location: ${shipment.location}<br>
            ETA: ${shipment.eta}<br>
            <span>${shipment.message}</span>
        `;

        trackingMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }


    if (trackingForm) {

        trackingForm.addEventListener("submit", event => {

            event.preventDefault();

            trackShipment(trackingNumber.value);

        });

    }


    /* ================= QUICK TRACKING ================= */

    const quickButtons =
        document.querySelectorAll(
            ".quick-tracking button"
        );

    quickButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id =
                button.dataset.track;

            trackingNumber.value = id;

            trackShipment(id);

        });

    });


    /* ================= SHIPMENT CARD TRACK BUTTONS ================= */

    const trackButtons =
        document.querySelectorAll(".view-track-btn");

    trackButtons.forEach(button => {

        button.addEventListener("click", () => {

            const trackingId =
                button.dataset.track;

            showSection("tracking");

            history.replaceState(
                null,
                "",
                "#tracking"
            );

            setTimeout(() => {

                trackingNumber.value =
                    trackingId;

                trackShipment(trackingId);

            }, 250);

        });

    });


    /* ================= GLOBAL SEARCH ================= */

    const globalSearch =
        document.getElementById("globalSearch");

    if (globalSearch) {

        globalSearch.addEventListener("keydown", event => {

            if (event.key !== "Enter") {
                return;
            }

            const value =
                globalSearch.value.trim().toUpperCase();

            if (!value) {
                return;
            }

            showSection("tracking");

            history.replaceState(
                null,
                "",
                "#tracking"
            );

            setTimeout(() => {

                trackingNumber.value = value;

                trackShipment(value);

            }, 250);

        });

    }


    /* ================= LOGOUT ================= */

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout =
                window.confirm(
                    "Are you sure you want to logout?"
                );

            if (!confirmLogout) {
                return;
            }

            localStorage.removeItem("stacklyLoggedIn");
            localStorage.removeItem("stacklyRole");

            window.location.href = "login.html";

        });

    }


    /* ================= RESIZE ================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMobileSidebar();
        }

    });

});


/* =========================================================
   TRACKING FORM
   VALIDATION + 404 REDIRECT
========================================================= */

const trackingForm =
    document.getElementById("trackingForm");

const trackingInput =
    document.getElementById("trackingNumber");


if (trackingForm && trackingInput) {

    trackingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const trackingNumber =
            trackingInput.value.trim();


        /* EMPTY VALIDATION */

        if (!trackingNumber) {

            alert("Please enter your tracking ID.");

            trackingInput.focus();

            return;
        }


        /* LENGTH VALIDATION */

        if (trackingNumber.length < 5) {

            alert("Please enter a valid tracking ID.");

            trackingInput.focus();

            return;
        }


        /* TRACKING ID FORMAT */

        const trackingPattern =
            /^[A-Za-z0-9-]+$/;

        if (!trackingPattern.test(trackingNumber)) {

            alert(
                "Tracking ID can contain only letters, numbers and hyphens."
            );

            trackingInput.focus();

            return;
        }


        /* SUCCESS */

        const button =
            trackingForm.querySelector("button");

        if (button) {

            button.disabled = true;

            button.innerHTML =
                'Tracking... <i class="fa-solid fa-spinner fa-spin"></i>';

        }


        /* REDIRECT TO 404 */

        setTimeout(function () {

            window.location.href = "404.html";

        }, 500);

    });

}
/* =========================================================
   PROFILE FORM
   VALIDATION + 404 REDIRECT
========================================================= */

const profilePanel =
    document.querySelector(".profile-panel");

if (profilePanel) {

    const profileInputs =
        profilePanel.querySelectorAll(
            ".profile-form input:not([readonly])"
        );

    const saveButton =
        profilePanel.querySelector(".primary-btn");

    if (saveButton) {

        saveButton.addEventListener("click", function (event) {

            event.preventDefault();

            const fullName =
                profileInputs[0]
                    ? profileInputs[0].value.trim()
                    : "";

            const email =
                profileInputs[1]
                    ? profileInputs[1].value.trim()
                    : "";

            const phone =
                profileInputs[2]
                    ? profileInputs[2].value.trim()
                    : "";


            /* =================================================
               FULL NAME VALIDATION
            ================================================= */

            if (!fullName) {

                alert("Please enter your full name.");

                if (profileInputs[0]) {
                    profileInputs[0].focus();
                }

                return;
            }


            if (fullName.length < 3) {

                alert("Please enter a valid full name.");

                if (profileInputs[0]) {
                    profileInputs[0].focus();
                }

                return;
            }


            /* =================================================
               EMAIL VALIDATION
            ================================================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) {

                alert("Please enter your email address.");

                if (profileInputs[1]) {
                    profileInputs[1].focus();
                }

                return;
            }


            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                if (profileInputs[1]) {
                    profileInputs[1].focus();
                }

                return;
            }


            /* =================================================
               PHONE VALIDATION
            ================================================= */

            const phonePattern =
                /^[+]?[0-9\s-]{10,15}$/;

            if (!phone) {

                alert("Please enter your phone number.");

                if (profileInputs[2]) {
                    profileInputs[2].focus();
                }

                return;
            }


            if (!phonePattern.test(phone)) {

                alert("Please enter a valid phone number.");

                if (profileInputs[2]) {
                    profileInputs[2].focus();
                }

                return;
            }


            /* =================================================
               SUCCESS
            ================================================= */

            saveButton.disabled = true;

            saveButton.innerHTML =
                'Saving... <i class="fa-solid fa-spinner fa-spin"></i>';


            /* =================================================
               REDIRECT TO 404
            ================================================= */

            setTimeout(function () {

                window.location.href = "404.html";

            }, 700);

        });

    }

}

