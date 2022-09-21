// vamos a compilar la hoja de estilos de sass y hay que hacer 3 pasos
//IDENTIFICAR EL ARCHIVO SASS, gulp tiene una api y funciones para automatizar.
// gulp es el que instalamos en package.json, require, es una forma de extraerlo del archivo, el cost nos va a traer funciones que tiene gulp
// funciones src, source o fuente, sirve para identificar archivos
// dest permite almacenar algo en una carpeta de style
// gulp tiene una api y usa pipe, se identifica como una acción que se realiza detrás de otra
// también añadimos watch para que todos los cambios en css los vaya compilando automaticamente

const {src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass')); // aqui no afecta los nombres porque esta función solo sirve para importar
const plumber = require('gulp-plumber'); // instalo con npm i --save-dev gulp-plumber y lo añado aqui

// IMAGENES
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin'); // el nombre siempre se lo pones tu, en el terminal hemos instalado uno concreto, npm i --save-dev gulp-imagemin@7.1.0, el @ es para instalar la que tu quieres en especifico
const webp = require('gulp-webp');  // esta función va a convertir las imágenes
const avif = require ('gulp-avif');




function css (done) {
    src('src/scss/**/**.scss') // identifica el archivo SASS, es una ruta
    .pipe(plumber())            // lo ponemos antes del sas en caso de que haya errores no pare el flujo de trabajo
    .pipe(sass())              // compila, en pipe mandamos llamar la funcion de node, pero antes hay que importarlo con la función de arriba cost sass
    .pipe( dest ("build/css"));  // almacena en el disco duro
    done(); // callback que avisa a gulp cuando llegamos al final

}

// creamos tarea para imagenes
function imagenes ( done ) {
    const opciones = {
        optimizationLevel: 3            // viene dentro del paquete de imagemin

    }
    src ('src/img/**/*.{png,jpg}') // identifico
    .pipe( cache ( imagemin(opciones) ))                         //a hora tengo que instalar otra dependencia npm i --save-dev gulp-cache y la exportamos arriba, la añadimos y ponemos opciones
    .pipe ( dest("build/img"))
    done();
}


// creamos una nueva tarea para webp
function versionWebp (done) {

    const opciones = {                             // le añadimos opciones para la calidad de las imagenes
        quality: 50
    };

    src ('src/img/**/*.{png,jpg}')            //buscara todas las imagenes con esos formatos, se usa cuandos tienes mas de un formato y necesitas todos
        .pipe( webp(opciones))                       // opciones lo ponemos por las opciones de arriba la calidad de img
        .pipe( dest ('build/img'))                  // enlace al destino

    done();

}

// creamos una tarea para AVIF

function versionAvif (done) {

    const opciones = {                             
        quality: 50
    };

    src ('src/img/**/*.{png,jpg}')            
        .pipe( avif(opciones))                       
        .pipe( dest ('build/img'))                  

    done();

}


// en lugar de modificar la función de arriba, creamos una nueva

function dev(done) {
    // watch('src/scss/app.scss', css)  // cogemos la ruta e indicamos que queremos llamar la función css, asi cada vez que cambie esta hoja de estilos, se manda llamar el css y realiza todas las acciones anteriores
    watch('src/scss/**/**.scss', css)  // esto lo hacemos para que haga watch en todas las carpetas dentro de src/scss a cualquier fichero da igual el nombre pero que acabe .sccs
    done(); //callback
}

// arriba no podemos asi que lo hacemos llamar asi:

exports.css = css;

// llamamos imagenes asi, y la añadimos a dev

exports.imagenes = imagenes;

// para poder ejecutar la función versionWebp

exports.versionWebp = versionWebp;

// ejecutamos avif
exports.versionAvif = versionAvif;

//y ahora podemos hacerla llamar así:

exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);

// si en la terminal escribimos npx gulp css, te marca error, sass no es una función, y eso es que tenemos un require sass
// necesitamos un conector de sass que se pueda comunicar con gulp, este tiene muchos plugins y lo puedes buscar
// para hacerlo en el terminal npm i --save-dev gulp-sass, y se instalaran mas paquetes y aparecerá en json con su nombre
// gulp-sass conecta ambos, pero aun así tendrás que cambiar el nombre de la funcion sass, porque aunque esten conectados no estaba bien escrito,
//ya que tambien necesita la base de conocimientos de sass, es decir, su dependencia
//ahora cuando escribes en la terminal npx gulp css esta correcto
// para la terminal y usar la parte del css, usamos npx gulp dev, y se queda ejecutandose la función, esto implica que podemos cambiar los colores y lo hace automatico

// en la terminal el webp se podria escribir gulp versionWebp, pero como queremos que se ejecuten varias tareas a la vez podremos usar
// series: hace que diferentes tareas se ejecuten una tras otra de forma secuencial
// parallel: todas se ejecutan al mismo tiempo y es la que vamos a usar aqui, por lo que tendremos que modificar la función dev, antes lo extraemos de gulp añadiendolo arriba
// podras ir añadiendo más y más tareas, escribimos gulp dev en la terminal














//ESTE ERA UN EJEMPLO

// una tarea en gulp se define como una funcion de JS, entre las dos llaves estará el cuerpo de la tarea

// function tarea( done ) {
//     console.log('mi primera tarea');

//     done();

// }

// exports.tarea = tarea;

// ahora tenemos que mandarla llamar para que funcione, y requerimos node
// exports. es codigo node js, luego el nombre seria el identificador o como hacemos llamar la función
//abrimos la terminal npx gulp primeraTarea
// npx nos permite ejecutar paquetes sin tener que instalarlos globalmente, viene con node, existe un binario de gulp porque lo instalamos igual que sass
// en la terminal aparece un error, que seria exports.primeraTarea = tarea;, esto se soluciona con un callback, es una funcion que se llama despues de otra funcion
//usamos done o callback o cb, y gace que pasen todas las tareas de gulp de forma automatica, y también lo añades abajo dentro de la función
// al haber realizado el callback done ya la puedes llamar en la terminal y ya no sale ese error
// se podria llamar tarea y no pasaria nada, se diferencian



