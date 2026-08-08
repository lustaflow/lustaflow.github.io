/* =========================================================
   LUSTAFLOW 2.0
   GLOBAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const header =
        document.querySelector(".site-header");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    const body =
        document.body;


    /* =====================================================
       02. HEADER AL HACER SCROLL
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;


        if (window.scrollY > 30) {

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


    /* =====================================================
       03. MENÚ MÓVIL
    ===================================================== */

    if (menuToggle && navLinks) {


        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuToggle.classList.contains("active");


                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        /* ================================================
           CERRAR AL PULSAR UN ENLACE
        ================================================= */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();

                    }
                );

            });


        /* ================================================
           CERRAR CON ESC
        ================================================= */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    menuToggle.classList.contains("active")
                ) {

                    closeMenu();

                }

            }
        );


        /* ================================================
           FUNCIONES DEL MENÚ
        ================================================= */

        function openMenu() {

            menuToggle.classList.add("active");

            navLinks.classList.add("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Cerrar menú"
            );

            body.classList.add("menu-open");

        }


        function closeMenu() {

            menuToggle.classList.remove("active");

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            body.classList.remove("menu-open");

        }

    }


    /* =====================================================
       04. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );


    } else {


        /* ================================================
           FALLBACK
        ================================================= */

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       05. AÑO AUTOMÁTICO DEL FOOTER
    ===================================================== */

    const yearElement =
        document.querySelector("#current-year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       06. PREVENIR FORMULARIOS DEMO
    ===================================================== */

    const demoForms =
        document.querySelectorAll(
            'form[data-demo="true"]'
        );


    demoForms.forEach(
        form => {

            form.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                }
            );

        }
    );


});
