// vamos a compilar la hoja de estilos de sass y hay que hacer 3 pasos
//IDENTIFICAR EL ARCHIVO SASS, gulp tiene una api y funciones para automatizar.
// gulp es el que instalamos en package.json, require, es una forma de extraerlo del archivo, el cost nos va a traer funciones que tiene gulp
// funciones src, source o fuente, sirve para identificar archivos
// dest permite almacenar algo en una carpeta de style
// gulp tiene una api y usa pipe, se identifica como una acción que se realiza detrás de otra
// también añadimos watch para que todos los cambios en css los vaya compilando automaticamente

const {src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass')); // aqui no afecta los nombres porque esta función solo sirve para importar
const plumber = require('gulp-plumber'); // instalo con npm i --save-dev gulp-plumber y lo añado aqui


function css (done) {
    src('src/scss/**/**.scss') // identifica el archivo SASS, es una ruta
    .pipe(plumber())            // lo ponemos antes del sas en caso de que haya errores no pare el flujo de trabajo
    .pipe(sass())              // compila, en pipe mandamos llamar la funcion de node, pero antes hay que importarlo con la función de arriba cost sass
    .pipe( dest ("build/css"));  // almacena en el disco duro


    done(); // callback que avisa a gulp cuando llegamos al final

}

// en lugar de modificar la función de arriba, creamos una nueva

function dev(done) {
    // watch('src/scss/app.scss', css)  // cogemos la ruta e indicamos que queremos llamar la función css, asi cada vez que cambie esta hoja de estilos, se manda llamar el css y realiza todas las acciones anteriores
    watch('src/scss/**/**.scss', css)  // esto lo hacemos para que haga watch en todas las carpetas dentro de src/scss a cualquier fichero da igual el nombre pero que acabe .sccs
    done(); //callback
}

// arriba no podemos asi que lo hacemos llamar asi:

exports.css = css;

//y ahora podemos hacerla llamar así:

exports.dev = dev;

// si en la terminal escribimos npx gulp css, te marca error, sass no es una función, y eso es que tenemos un require sass
// necesitamos un conector de sass que se pueda comunicar con gulp, este tiene muchos plugins y lo puedes buscar
// para hacerlo en el terminal npm i --save-dev gulp-sass, y se instalaran mas paquetes y aparecerá en json con su nombre
// gulp-sass conecta ambos, pero aun así tendrás que cambiar el nombre de la funcion sass, porque aunque esten conectados no estaba bien escrito,
//ya que tambien necesita la base de conocimientos de sass, es decir, su dependencia
//ahora cuando escribes en la terminal npx gulp css esta correcto
// para la terminal y usar la parte del css, usamos npx gulp dev, y se queda ejecutandose la función, esto implica que podemos cambiar los colores y lo hace automatico
















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



