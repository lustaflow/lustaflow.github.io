// =========================
// MENÚ AL HACER SCROLL
// =========================


const header = document.querySelector("header");


window.addEventListener("scroll", () => {


    if(window.scrollY > 60){


        header.style.background = "rgba(13,17,23,.96)";

        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.45)";


    }else{


        header.style.background =
        "rgba(13,17,23,.75)";

        header.style.boxShadow = "none";


    }


});




// =========================
// ANIMACIONES AL HACER SCROLL
// =========================


const elementos = document.querySelectorAll(
    ".hero-text, .hero-img, .intro, .card, .quote"
);



const observador = new IntersectionObserver((entradas)=>{


    entradas.forEach((entrada)=>{


        if(entrada.isIntersecting){


            entrada.target.classList.add("visible");


        }


    });



},{

    threshold:0.15

});



elementos.forEach((elemento)=>{


    observador.observe(elemento);


});




// =========================
// EFECTO SUAVE EN BOTONES
// =========================


const botones = document.querySelectorAll(".boton");



botones.forEach((boton)=>{


    boton.addEventListener("mouseenter",()=>{


        boton.style.transform="translateY(-5px)";


    });



    boton.addEventListener("mouseleave",()=>{


        boton.style.transform="translateY(0)";


    });



});




// =========================
// AÑO AUTOMÁTICO FOOTER
// =========================


const año = document.querySelector("footer p");


if(año){


    const fecha = new Date();

    año.innerHTML =
    `© ${fecha.getFullYear()} Jordi Lostaló. Todos los derechos reservados.`;


}
