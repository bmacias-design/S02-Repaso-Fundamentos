//MEMORIA: Variables y constantes.



//let = lista
//let dinero; 
//const COLOR_MOCHILA= "blue";
//let colores= ["rojo", "verde", "azul"];
         //.  0.         1.       2


 //consola.imprime(); 
//console.log(20);
//opt + shift + arrowDown (copia hacia abajo)
//console.log(colores);
//console.log(colores[0]);
//console.log(colores[2]);




//OBJETO = propiedades(Que es? ) y metodos (Que hace?)
//let computadora = {
    //tipo: "dispositivo",
    //tamaño: "grande",
    //resolucion: 4320,
    //encender: function() {
        //console.log("Encendiendo computadora");
   // },
    //buscar: function() {
        //console.log("Buscando...");
    //}
//};

//computadora.utilidad = "practica";



//FUNCIONES = conjunto de instrucciones que se ejecutan cuando son invocadas

//function mezclar (){
    //console.log("mezclando ingredientes" + "tomate");
//};

//mezclar("queso" ,"pan");
//mezclar("tocino" ,  "lechuga");



//RECETA


const canvas = document.querySelector("#miLienzo");
const ctx = canvas.getContext("2d");

// tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ajustes en el numero de pelotas
const cantidadPelotas = 50; 
let listaPelotas = [];
const colores = ["#37ff00", "#8f4aaf", "#ff0000", "#2c08df"];

// generar un numero aleatorio (me apoye un poco de la Ia)
function numeroAzar(min, max) {
    return Math.random() * (max - min) + min;
}

// modelo de la pelota (objeto)
function crearPelota() {
    let pelota = {
        x: numeroAzar(50, canvas.width - 50),
        y: numeroAzar(50, canvas.height - 50),
        radio: numeroAzar(10, 40),
        color: colores[Math.floor(numeroAzar(0, colores.length))],
        velX: numeroAzar(-5, 5),
        velY: numeroAzar(-5, 5)
    };
    return pelota;
}

// (loop)
for (let i = 0; i < cantidadPelotas; i++) {
    listaPelotas.push(crearPelota());
}

console.log("Pelotas creadas:", listaPelotas);

//funciones
function animar() {
    // Limpiar la pantalla antes de dibujar el siguiente cuadro
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Recorrer cada pelota de la lista para actualizarla
    for (let i = 0; i < listaPelotas.length; i++) {
        let p = listaPelotas[i];

        // dibujar 
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();

        // movimiento
        p.x = p.x + p.velX;
        p.y = p.y + p.velY;

        //condicionales
        // choque de lados
        if (p.x + p.radio > canvas.width || p.x - p.radio < 0) {
            p.velX = p.velX * -1;
        }
        if (p.y + p.radio > canvas.height || p.y - p.radio < 0) {
            p.velY = p.velY * -1;
        }
    }

    // Pedirle al navegador que ejecute esta función otra vez (el loop infinito de la animación)
    requestAnimationFrame(animar);
}

animar();