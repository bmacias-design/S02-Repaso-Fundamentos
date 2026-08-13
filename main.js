//MEMORIA: Variables y constantes.



//let = lista
let dinero; 
const COLOR_MOCHILA= "blue";
let colores= ["rojo", "verde", "azul"];
         //.  0.         1.       2


 //consola.imprime(); 
console.log(20);
//opt + shift + arrowDown (copia hacia abajo)
console.log(colores);
console.log(colores[0]);
console.log(colores[2]);




//OBJETO = propiedades(Que es? ) y metodos (Que hace?)
let computadora = {
    tipo: "dispositivo",
    tamaño: "grande",
    resolucion: 4320,
    encender: function() {
        console.log("Encendiendo computadora");
    },
    buscar: function() {
        console.log("Buscando...");
    }
};

computadora.utilidad = "practica";



//FUNCIONES = conjunto de instrucciones que se ejecutan cuando son invocadas

function mezclar (){
    console.log("mezclando ingredientes" + "tomate");
};

mezclar("queso" ,"pan");
mezclar("tocino" ,  "lechuga");