// =========================
// HEADER AL HACER SCROLL
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.style.background = "rgba(13,17,23,.96)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.45)";

    } else {

        header.style.background = "rgba(13,17,23,.75)";
        header.style.boxShadow = "none";

    }

});


// =========================
// ANIMACIONES
// =========================

const elementos = document.querySelectorAll(
    ".hero-text, .hero-img, .hero-content, .intro, .card, .glass-card, .section, .article, .quote, .biografia article, .contact-card, .back-button"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {
/* =========================================================
   LUSTAFLOW
   MAIN.JS
   Interacciones y animaciones globales
   ========================================================= */


/* =========================================================
   01. ELEMENTOS PRINCIPALES
   ========================================================= */

const header = document.querySelector("header");
const nav = document.querySelector("nav");


/* =========================================================
   02. HEADER AL HACER SCROLL
   ========================================================= */

/*
   Ya no modificamos background, box-shadow, etc. mediante
   JavaScript.

   El CSS se encarga del diseño.

   JS únicamente añade/quita la clase .scrolled.
*/

function actualizarHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    actualizarHeader,
    { passive: true }
);

actualizarHeader();


/* =========================================================
   03. ANIMACIONES CON INTERSECTION OBSERVER
   ========================================================= */

const elementosAnimados = document.querySelectorAll(
    `
    .hero-text,
    .hero-img,
    .hero-content,
    .intro,
    .section-title,
    .section,
    .card,
    .glass-card,
    .quote,
    .biografia article,
    .contact-card,
    .article,
    .back-button
    `
);


const observador = new IntersectionObserver(
    (entradas, observer) => {

        entradas.forEach((entrada) => {

            if (!entrada.isIntersecting) return;

            entrada.target.classList.add("visible");

            /*
               Una vez que aparece, dejamos de observarlo.
               Esto evita que la animación se repita cada vez
               que el usuario vuelve a pasar por la sección.
            */

            observer.unobserve(entrada.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


elementosAnimados.forEach((elemento) => {

    observador.observe(elemento);

});


/* =========================================================
   04. ANIMACIÓN INICIAL DEL HERO
   ========================================================= */

/*
   Los elementos principales del hero entran ligeramente
   escalonados para evitar una aparición completamente
   estática.
*/

const heroText = document.querySelector(".hero-text");
const heroImage = document.querySelector(".hero-img");
const heroContent = document.querySelector(".hero-content");


function animacionHeroInicial() {

    if (heroText) {

        setTimeout(() => {

            heroText.classList.add("visible");

        }, 150);

    }


    if (heroImage) {

        setTimeout(() => {

            heroImage.classList.add("visible");

        }, 300);

    }


    if (heroContent) {

        setTimeout(() => {

            heroContent.classList.add("visible");

        }, 180);

    }

}


window.addEventListener(
    "load",
    animacionHeroInicial
);


/* =========================================================
   05. NAVBAR — ENLACE ACTIVO
   ========================================================= */

/*
   Detectamos automáticamente la página actual.

   Esto permite resaltar el apartado en el que estamos.
*/

const enlacesNav = document.querySelectorAll(
    "nav a[href]"
);


const paginaActual =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


enlacesNav.forEach((enlace) => {

    const href = enlace
        .getAttribute("href")
        ?.split("/")
        .pop()
        .toLowerCase();


    if (!href) return;


    /*
       index.html y la raíz se consideran la misma página.
    */

    const esInicio =
        (paginaActual === "" || paginaActual === "index.html") &&
        (href === "" || href === "index.html");


    if (href === paginaActual || esInicio) {

        enlace.classList.add("active");

    }

});


/* =========================================================
   06. NAVEGACIÓN SUAVE
   ========================================================= */

/*
   Para enlaces internos tipo #seccion.

   No interferimos con enlaces normales entre páginas.
*/

const enlacesInternos = document.querySelectorAll(
    'a[href^="#"]'
);


enlacesInternos.forEach((enlace) => {

    enlace.addEventListener("click", (evento) => {

        const destinoID =
            enlace.getAttribute("href");


        if (!destinoID || destinoID === "#") return;


        const destino =
            document.querySelector(destinoID);


        if (!destino) return;


        evento.preventDefault();


        destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   07. HOVER DINÁMICO DE TARJETAS
   ========================================================= */

/*
   Añade una pequeña interacción al movimiento del ratón.

   No aplicamos transform directamente: utilizamos variables
   CSS para que el efecto siga estando controlado por CSS.
*/

const tarjetas = document.querySelectorAll(
    ".card, .glass-card, .contact-card"
);


tarjetas.forEach((tarjeta) => {

    tarjeta.addEventListener("mousemove", (evento) => {

        const rect =
            tarjeta.getBoundingClientRect();


        const x =
            ((evento.clientX - rect.left) / rect.width) * 100;


        const y =
            ((evento.clientY - rect.top) / rect.height) * 100;


        tarjeta.style.setProperty(
            "--mouse-x",
            `${x}%`
        );


        tarjeta.style.setProperty(
            "--mouse-y",
            `${y}%`
        );

    });


    tarjeta.addEventListener("mouseleave", () => {

        tarjeta.style.removeProperty(
            "--mouse-x"
        );

        tarjeta.style.removeProperty(
            "--mouse-y"
        );

    });

});


/* =========================================================
   08. IMÁGENES — MOVIMIENTO MUY SUTIL
   ========================================================= */

/*
   Solamente en dispositivos con ratón.

   En móvil no activamos este efecto.
*/

const dispositivoConRaton =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


if (dispositivoConRaton) {

    const imagenesHero =
        document.querySelectorAll(
            ".hero-img img"
        );


    imagenesHero.forEach((imagen) => {

        imagen.addEventListener(
            "mousemove",
            (evento) => {

                const rect =
                    imagen.getBoundingClientRect();


                const x =
                    (evento.clientX - rect.left)
                    / rect.width
                    - 0.5;


                const y =
                    (evento.clientY - rect.top)
                    / rect.height
                    - 0.5;


                imagen.style.transform =
                    `
                    translate(
                        ${x * 5}px,
                        ${y * 5}px
                    )
                    scale(1.012)
                    `;

            }
        );


        imagen.addEventListener(
            "mouseleave",
            () => {

                imagen.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   09. BOTONES
   ========================================================= */

/*
   IMPORTANTE:

   Ya NO modificamos transform mediante JavaScript.

   El CSS nuevo controla los hover y las animaciones.

   Aquí solamente añadimos una pequeña clase al pulsar.
*/

const botones =
    document.querySelectorAll(
        ".boton, .btn"
    );


botones.forEach((boton) => {

    boton.addEventListener(
        "pointerdown",
        () => {

            boton.classList.add(
                "is-pressed"
            );

        }
    );


    boton.addEventListener(
        "pointerup",
        () => {

            boton.classList.remove(
                "is-pressed"
            );

        }
    );


    boton.addEventListener(
        "pointerleave",
        () => {

            boton.classList.remove(
                "is-pressed"
            );

        }
    );

});


/* =========================================================
   10. MENÚ MÓVIL
   ========================================================= */

/*
   El CSS actual mantiene la navegación horizontal en móvil.

   Este código prepara la estructura para convertirla en
   menú móvil sin romper las páginas que todavía utilicen
   el HTML antiguo.

   Si el header ya tiene un botón de menú, lo reutilizamos.
*/

if (nav) {

    let menuButton =
        nav.querySelector(
            ".menu-toggle, .mobile-menu-toggle"
        );


    const lista =
        nav.querySelector("ul");


    /*
       Si el HTML todavía no tiene botón, lo creamos.
    */

    if (!menuButton && lista) {

        menuButton =
            document.createElement("button");


        menuButton.className =
            "mobile-menu-toggle";


        menuButton.type =
            "button";


        menuButton.setAttribute(
            "aria-label",
            "Abrir menú"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;


        nav.appendChild(
            menuButton
        );

    }


    /*
       Funcionamiento del botón.
    */

    if (menuButton && lista) {

        menuButton.addEventListener(
            "click",
            () => {

                const abierto =
                    nav.classList.toggle(
                        "menu-open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    abierto
                        ? "true"
                        : "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    abierto
                        ? "Cerrar menú"
                        : "Abrir menú"
                );

            }
        );


        /*
           Al pulsar un enlace cerramos el menú.
        */

        lista.querySelectorAll("a")
            .forEach((enlace) => {

                enlace.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "menu-open"
                        );


                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        menuButton.setAttribute(
                            "aria-label",
                            "Abrir menú"
                        );

                    }
                );

            });

    }

}


/* =========================================================
   11. CERRAR MENÚ CON ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key !== "Escape") return;


        if (!nav) return;


        nav.classList.remove(
            "menu-open"
        );


        const menuButton =
            nav.querySelector(
                ".menu-toggle, .mobile-menu-toggle"
            );


        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            menuButton.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        }

    }
);


/* =========================================================
   12. CERRAR MENÚ AL CAMBIAR A ESCRITORIO
   ========================================================= */

const mediaDesktop =
    window.matchMedia(
        "(min-width: 851px)"
    );


function comprobarDesktop() {

    if (!nav) return;


    if (mediaDesktop.matches) {

        nav.classList.remove(
            "menu-open"
        );


        const menuButton =
            nav.querySelector(
                ".menu-toggle, .mobile-menu-toggle"
            );


        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

}


if (mediaDesktop.addEventListener) {

    mediaDesktop.addEventListener(
        "change",
        comprobarDesktop
    );

} else {

    mediaDesktop.addListener(
        comprobarDesktop
    );

}


/* =========================================================
   13. PARALLAX MUY SUTIL DEL HERO
   ========================================================= */

/*
   No queremos una web llena de efectos.

   Este efecto únicamente desplaza ligeramente la imagen
   principal mientras se hace scroll.
*/

if (
    dispositivoConRaton &&
    heroImage
) {

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;


            if (scroll > window.innerHeight) {
                return;
            }


            heroImage.style.setProperty(
                "--hero-offset",
                `${scroll * 0.035}px`
            );

        },
        { passive: true }
    );

}


/* =========================================================
   14. AÑO AUTOMÁTICO DEL FOOTER
   ========================================================= */

const footerTexto =
    document.querySelector(
        "footer p"
    );


if (footerTexto) {

    footerTexto.innerHTML =
        `
        © ${new Date().getFullYear()}
        LUSTAFLOW ·
        Todos los derechos reservados.
        `;

}


/* =========================================================
   15. CARGA COMPLETADA
   ========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);
 · Todos los derechos reservados.`;

}
