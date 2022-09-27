document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    // para que al hacer clic en un enlace te lleve directamente al sitio
    ScrollNav();
}

// mandamos llamar la navegación
function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }


    });

}

// arriba, queremos que la barra de navegación se quede fija, por lo que hay que seleccionar el html, y decirle que escuche por el scroll
// ademas de top, puedes poner bottom



// indicamos lo que queremos que haga la función
function ScrollNav() {
    const enlances = document.querySelectorAll('.navegacion-principal a');  // all porque queremos que los señale todo, además indicamos su clase y a (enlace)
    // como son varios, no podemos usar addevenlistener, hay que hacerlo de forma que sea en cada una, pero si puedes iterarlo en cada uno de ellos y agregarlos en las interacciones
    enlances.forEach( enlace => {
        enlace.addEventListener('click', function(event) { 
            event.preventDefault();  
            const seccionScroll = event.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({behavior: "smooth"});
        });


    })

}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <=12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
            `;

            imagen.onclick = function() {
                mostrarImagen(i);

            }
        galeria.appendChild(imagen);

    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        `;
        // crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        //para cerrar la imagen haciendo clic en cualquier parte de la pag.
        overlay.onclick = function(){
            const body = document.querySelector('body');
            body.classList.remove('fijar-body'); 
            overlay.remove();

        }

        //Botón para cerrar el modal

        const cerrarModal = document.createElement('P');
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        // para cerrar la imagen, registramos el evento y le hacemos un callback, una vez hagas clic se elimina con remove
        cerrarModal.onclick = function(){

            // creamos una variable diferente para que elimine la clase fijar body cuando cierro el modal
            const body = document.querySelector('body');
            body.classList.remove('fijar-body'); 
            overlay.remove();
        }
        //lo añadimos
        overlay.appendChild(cerrarModal);



        //añadirlo al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        // para quitar el scroll, le agregamos una clase al body
        body.classList.add('fijar-body'); // aqui vuelves a globales


    
}

// img.onclic creamos el elemento y asignamos el evento, esto se podria hacer sin el callback pero lo necesitamos porque le queremos pasar unos parametros
//en la función indicamos que queremos que muestre que imagen es, que la identifique y por ultimo añadirlo con appendchild

// en la función creada mostrarImagen, le ponemos id simplemente porque le de un nombre,no podemos poner i, porque si no pasa las 12 imagenes
// lo que vamos a crear muy parecido a la anterior asi que podemos copiar y cambiar lo necesario, en este caso, de donde cogemos la img no thumb sino grande, cambiamos i por id
// luego queremos que el fondo se vea más oscuro, por ello creamos un overlay, creamos etiqueta lo añadimos y le damos una clase
// para que se vea en pantalla tenemos que señalar el body del html, y luego al añadirlo ya se muestra en el body
// le damos estilo al modal