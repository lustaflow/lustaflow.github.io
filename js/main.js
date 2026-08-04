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

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.15

});

elementos.forEach((elemento) => {

    observador.observe(elemento);

});


// =========================
// EFECTO BOTONES
// =========================

const botones = document.querySelectorAll(".boton, .btn");

botones.forEach((boton) => {

    boton.addEventListener("mouseenter", () => {

        boton.style.transform = "translateY(-5px)";

    });

    boton.addEventListener("mouseleave", () => {

        boton.style.transform = "translateY(0)";

    });

});


// =========================
// AÑO AUTOMÁTICO FOOTER
// =========================

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} LUSTAFLOW · Todos los derechos reservados.`;

}
