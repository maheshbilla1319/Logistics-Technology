
/* =========================================================
   STACKLY LOGISTICS ADMIN DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 60
        });

    }


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("hide");
            }

        }, 500);

    });


    /* =====================================================
       SIDEBAR
    ===================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    function openSidebar() {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    menuToggle.addEventListener(
        "click",
        openSidebar
    );


    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );


    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar-link"
        );


    sidebarLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");


            if (
                href &&
                href.startsWith("#")
            ) {

                const target =
                    document.querySelector(href);


                if (target) {

                    event.preventDefault();

                    sidebarLinks.forEach(item => {
                        item.classList.remove("active");
                    });

                    link.classList.add("active");

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    if (
                        window.innerWidth <= 950
                    ) {

                        closeSidebar();

                    }

                }

            }

        });

    });


    /* =====================================================
       ACTIVE SECTION ON SCROLL
    ===================================================== */

    const sections = [
        "dashboard",
        "shipments",
        "tracking",
        "fleet",
        "warehouses",
        "customers",
        "reports",
        "settings"
    ];


    function updateActiveMenu() {

        const scrollPosition =
            window.scrollY + 180;


        let currentSection =
            "dashboard";


        sections.forEach(sectionId => {

            const section =
                document.getElementById(
                    sectionId
                );


            if (!section) return;


            if (
                section.offsetTop <=
                scrollPosition
            ) {

                currentSection =
                    sectionId;

            }

        });


        sidebarLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveMenu
    );


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    function animateCounter(counter) {

        const target =
            Number(
                counter.dataset.target
            );

        let current = 0;

        const duration = 1400;

        const startTime =
            performance.now();


        function update(time) {

            const elapsed =
                time - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            current =
                Math.floor(
                    target * ease
                );


            counter.textContent =
                current.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(update);

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.dataset.animated
                    ) {

                        entry.target.dataset.animated =
                            "true";

                        animateCounter(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       TRACKING
    ===================================================== */

    const trackingForm =
        document.getElementById(
            "trackingForm"
        );

    const trackingNumber =
        document.getElementById(
            "trackingNumber"
        );

    const trackingMessage =
        document.getElementById(
            "trackingMessage"
        );


    const trackingResult =
        document.getElementById(
            "trackingResult"
        );


    trackingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const value =
                trackingNumber.value
                    .trim()
                    .toUpperCase();


            if (!value) {

                trackingMessage.textContent =
                    "Please enter a tracking ID.";

                trackingMessage.style.display =
                    "block";

                trackingNumber.focus();

                return;

            }


            trackingMessage.textContent =
                `Shipment ${value} is currently in transit from Hyderabad to Mumbai.`;

            trackingMessage.style.display =
                "block";


            trackingResult.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }
    );


    trackingNumber.addEventListener(
        "input",
        () => {

            trackingMessage.style.display =
                "none";

        }
    );


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmLogout =
                window.confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            /* Remove stored login */

            localStorage.removeItem(
                "stacklyLogin"
            );

            sessionStorage.removeItem(
                "stacklyLogin"
            );


            /* Redirect */

            window.location.href =
                "login.html";

        }
    );


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    notificationBtn.addEventListener(
        "click",
        () => {

            alert(
                "You have 3 new shipment notifications."
            );

        }
    );


    /* =====================================================
       EXPORT REPORT
    ===================================================== */

    const exportBtn =
        document.getElementById(
            "exportBtn"
        );


    exportBtn.addEventListener(
        "click",
        () => {

            const report = [
                "STACKLY LOGISTICS - ADMIN REPORT",
                "--------------------------------",
                "Total Shipments: 1,248",
                "Active Fleet: 184",
                "In Transit: 326",
                "Delivered: 938",
                "On-Time Performance: 91.4%",
                "Warehouse Capacity: 92%"
            ].join("\n");


            const blob =
                new Blob(
                    [report],
                    {
                        type: "text/plain"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download =
                "stackly-logistics-report.txt";


            document.body.appendChild(link);

            link.click();

            link.remove();


            URL.revokeObjectURL(url);

        }
    );


    /* =====================================================
       TABLE VIEW BUTTONS
    ===================================================== */

    const tableActions =
        document.querySelectorAll(
            ".table-action"
        );


    tableActions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const row =
                    button.closest("tr");


                const shipmentId =
                    row.querySelector(
                        "td strong"
                    );


                if (shipmentId) {

                    alert(
                        `Opening shipment ${shipmentId.textContent.trim()}`
                    );

                }

            }
        );

    });


    /* =====================================================
       QUICK ACTIONS
    ===================================================== */

    const quickActions =
        document.querySelectorAll(
            ".quick-action"
        );


    quickActions.forEach(action => {

        action.addEventListener(
            "click",
            event => {

                const href =
                    action.getAttribute(
                        "href"
                    );


                if (
                    href &&
                    href.startsWith("#")
                ) {

                    const target =
                        document.querySelector(
                            href
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }

            }
        );

    });


    /* =====================================================
       CURRENT DATE
    ===================================================== */

    const currentDate =
        document.getElementById(
            "currentDate"
        );


    if (currentDate) {

        const today =
            new Date();


        currentDate.textContent =
            today.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    month: "long",
                    day: "2-digit",
                    year: "numeric"
                }
            );

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 950
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       ESCAPE CLOSE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

            }

        }
    );

});

