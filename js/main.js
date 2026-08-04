// ===== MENÚ AL HACER SCROLL =====

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.background = "rgba(13,17,23,.97)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(13,17,23,.85)";
        header.style.boxShadow = "none";

    }

});


// ===== ANIMACIÓN DE APARICIÓN =====

const elementos = document.querySelectorAll(".card, .hero-text, .hero-img");

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
