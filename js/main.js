/* =========================================================
   LUSTAFLOW — MAIN.JS
   Navegación + animaciones + microinteracciones
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       1. ELEMENTOS PRINCIPALES
       ===================================================== */

    const header =
        document.querySelector("header, .header");

    const nav =
        document.querySelector(
            "header nav, .header nav, .navbar"
        );

    const menu =
        nav?.querySelector("ul");

    let toggle =
        nav?.querySelector(".nav-toggle");


    /* =====================================================
       2. CREAR MENÚ HAMBURGUESA
       
       Si el HTML todavía no contiene el botón,
       JavaScript lo genera automáticamente.
       ===================================================== */

    if (nav && menu && !toggle) {

        toggle =
            document.createElement("button");

        toggle.className =
            "nav-toggle";

        toggle.type =
            "button";

        toggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        menu.id =
            menu.id || "main-menu";

        toggle.setAttribute(
            "aria-controls",
            menu.id
        );

        nav.insertBefore(
            toggle,
            menu
        );
    }


    /* =====================================================
       3. NAVBAR AL HACER SCROLL
       ===================================================== */

    const updateHeader =
        () => {

            if (!header)
                return;

            const scrolled =
                window.scrollY > 35;

            header.classList.toggle(
                "scrolled",
                scrolled
            );
        };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive:true
        }
    );


    /* =====================================================
       4. MENÚ MÓVIL
       ===================================================== */

    const closeMenu =
        () => {

            if (!nav || !toggle)
                return;

            nav.classList.remove(
                "nav-open"
            );

            toggle.classList.remove(
                "open"
            );

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            document.body.classList.remove(
                "nav-open"
            );
        };


    if (nav && toggle && menu) {


        /* ---------------------------------------------
           Abrir / cerrar
           --------------------------------------------- */

        toggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isOpen =
                    !nav.classList.contains(
                        "nav-open"
                    );


                nav.classList.toggle(
                    "nav-open",
                    isOpen
                );


                toggle.classList.toggle(
                    "open",
                    isOpen
                );


                toggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                toggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Cerrar menú"
                        : "Abrir menú"
                );


                document.body.classList.toggle(
                    "nav-open",
                    isOpen
                );
            }
        );


        /* ---------------------------------------------
           Cerrar al pulsar un enlace
           --------------------------------------------- */

        menu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();

                    }
                );

            });


        /* ---------------------------------------------
           Cerrar al pulsar fuera
           --------------------------------------------- */

        document.addEventListener(
            "click",
            event => {

                if (
                    window.innerWidth <= 820 &&
                    nav.classList.contains(
                        "nav-open"
                    ) &&
                    !nav.contains(
                        event.target
                    )
                ) {

                    closeMenu();

                }

            }
        );


        /* ---------------------------------------------
           Cerrar al volver a escritorio
           --------------------------------------------- */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 820
                ) {

                    closeMenu();

                }

            }
        );


        /* ---------------------------------------------
           ESC para cerrar
           --------------------------------------------- */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    nav.classList.contains(
                        "nav-open"
                    )
                ) {

                    closeMenu();

                    toggle.focus();

                }

            }
        );

    }


    /* =====================================================
       5. DETECTAR PÁGINA ACTUAL
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .split("?")[0]
            .split("#")[0]
        || "index.html";


    if (menu) {

        menu
            .querySelectorAll("a")
            .forEach(link => {

                const href =
                    link.getAttribute(
                        "href"
                    ) || "";


                const cleanHref =
                    href
                        .split("#")[0]
                        .split("?")[0]
                        .replace(
                            /^.\//,
                            ""
                        );


                const normalized =
                    cleanHref || "index.html";


                if (
                    normalized === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );

                }

            });

    }


    /* =====================================================
       6. INTERSECTION OBSERVER
       
       Hace que el contenido aparezca suavemente
       mientras hacemos scroll.
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            [
                ".reveal",
                ".fade",
                ".hero-text",
                ".hero-content",
                ".hero-img",
                ".intro",
                ".section-heading",
                ".section-title",
                ".card",
                ".glass-card",
                ".life-post",
                ".project-card",
                ".contact-card",
                ".article-preview",
                ".biografia article",
                ".quote"
            ].join(",")
        );


    if (
        "IntersectionObserver"
        in window
    ) {


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:.12,

                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        animatedElements
            .forEach(
                element =>
                    observer.observe(
                        element
                    )
            );


    } else {


        animatedElements
            .forEach(
                element =>
                    element.classList.add(
                        "visible"
                    )
            );

    }


    /* =====================================================
       7. ANIMACIÓN ESCALONADA DE TARJETAS
       
       Añade pequeños retrasos para que las tarjetas
       no aparezcan todas a la vez.
       ===================================================== */

    const animatedGroups =
        document.querySelectorAll(
            ".cards, " +
            ".cards-grid, " +
            ".writings-grid, " +
            ".contact-container, " +
            ".lifestyle-feed, " +
            ".lifestyle-categories"
        );


    animatedGroups.forEach(
        group => {

            const children =
                group.children;


            Array.from(children)
                .forEach(
                    (child, index) => {

                        child.style
                            .transitionDelay =
                            `${Math.min(
                                index * 0.07,
                                0.35
                            )}s`;

                    }
                );

        }
    );


    /* =====================================================
       8. AÑO AUTOMÁTICO DEL FOOTER
       ===================================================== */

    const year =
        document.querySelector(
            "#year"
        );


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }


    /* =====================================================
       9. MICROINTERACCIÓN DE BOTONES
       
       Efecto 3D muy ligero en escritorio.
       En móvil se desactiva.
       ===================================================== */

    document
        .querySelectorAll(
            ".boton, .btn"
        )
        .forEach(button => {


            button.addEventListener(
                "pointermove",
                event => {

                    if (
                        window.innerWidth < 700
                    )
                        return;


                    const rect =
                        button
                            .getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        (
                            (x / rect.width)
                            - .5
                        ) * 3;


                    const rotateX =
                        (
                            (y / rect.height)
                            - .5
                        ) * -3;


                    button.style.transform =
                        `translateY(-3px)
                         perspective(500px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });


    /* =====================================================
       10. EFECTO SUTIL EN TARJETAS
       
       Sigue el movimiento del ratón de forma muy ligera.
       ===================================================== */

    document
        .querySelectorAll(
            ".card, " +
            ".glass-card, " +
            ".project-card, " +
            ".life-post, " +
            ".contact-card"
        )
        .forEach(card => {


            card.addEventListener(
                "pointermove",
                event => {

                    if (
                        window.innerWidth < 900
                    )
                        return;


                    const rect =
                        card
                            .getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        (
                            (x / rect.width)
                            - .5
                        ) * 1.4;


                    const rotateX =
                        (
                            (y / rect.height)
                            - .5
                        ) * -1.4;


                    card.style.transform =
                        `translateY(-7px)
                         perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });


    /* =====================================================
       11. IMÁGENES
       
       Lazy loading + detección de imágenes
       que no puedan cargarse.
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {


            /* Lazy loading */

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


            /* Decoding */

            if (
                !image.hasAttribute(
                    "decoding"
                )
            ) {

                image.setAttribute(
                    "decoding",
                    "async"
                );

            }


            /* Error */

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* =====================================================
       12. LINK DE IMAGEN / HERO
       
       Evita pequeños saltos visuales cuando
       una imagen termina de cargar.
       ===================================================== */

    document
        .querySelectorAll(
            ".hero-img img, " +
            ".life-post img, " +
            ".project-card img"
        )
        .forEach(image => {

            if (
                image.complete
            ) {

                image.classList.add(
                    "image-loaded"
                );

            } else {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "image-loaded"
                        );

                    },
                    {
                        once:true
                    }
                );

            }

        });


    /* =====================================================
       13. AÑO + FECHA DE ARTÍCULOS
       
       Si existe un elemento con [data-year],
       también se actualiza automáticamente.
       ===================================================== */

    document
        .querySelectorAll(
            "[data-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date()
                    .getFullYear();

        });


    /* =====================================================
       14. PREVENIR TRANSFORMACIONES EXAGERADAS
       
       Al cambiar de orientación o tamaño,
       limpiamos estados de interacción.
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            document
                .querySelectorAll(
                    ".boton, .btn, .card, " +
                    ".glass-card, .project-card, " +
                    ".life-post, .contact-card"
                )
                .forEach(element => {

                    element.style.transform =
                        "";

                });

        }
    );


    /* =====================================================
       15. INICIO
       
       Marcamos el documento como cargado.
       Puede utilizarse en futuras animaciones.
       ===================================================== */

    requestAnimationFrame(
        () => {

            document.documentElement
                .classList.add(
                    "js-ready"
                );

        }
    );


});
