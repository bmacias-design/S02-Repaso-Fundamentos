import * as THREE from "three";

import {
    OrbitControls
} from "three/addons/controls/OrbitControls.js";

import {
    RoomEnvironment
} from "three/addons/environments/RoomEnvironment.js";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";

import {
    Reflector
} from "three/addons/objects/Reflector.js";


// ESCENA

const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");


// GRUPO DEL ESCAPARATE

const escaparate = new THREE.Group();
scene.add(escaparate);


// MEDIDAS

const anchoEscaparate = 12;
const fondoEscaparate = 8;
const altoEscaparate = 8;


// MATERIALES DE LA ESTRUCTURA

const materialPared = new THREE.MeshStandardMaterial({
    color: "#d9d3c9",
    roughness: 0.8
});

const materialPiso = new THREE.MeshStandardMaterial({
    color: "#cfc8bd",
    roughness: 0.8
});


// MATERIALES MATE DEL TABLERO

const materialBlanco = new THREE.MeshStandardMaterial({
    color: "#d8d4cc",
    metalness: 0,
    roughness: 0.9,
    side: THREE.DoubleSide
});

const materialNegro = new THREE.MeshStandardMaterial({
    color: "#161616",
    metalness: 0,
    roughness: 0.9,
    side: THREE.DoubleSide
});


// MATERIAL DEL ESPEJO EXTERIOR

const materialEspejo = new THREE.MeshStandardMaterial({
    color: "#aeb7c2",
    metalness: 1,
    roughness: 0.04
});


// MATERIALES DE LAS PIEZAS

const materialPiezaBlanca = new THREE.MeshStandardMaterial({
    color: "#e4ded4",
    metalness: 0.1,
    roughness: 0.35
});

const materialPiezaNegra = new THREE.MeshStandardMaterial({
    color: "#090909",
    metalness: 0.25,
    roughness: 0.2
});

const materialPiezaRoja = new THREE.MeshStandardMaterial({
    color: "#c41424",
    metalness: 0.2,
    roughness: 0.25
});


// PISO

const geometriaPiso = new THREE.BoxGeometry(
    anchoEscaparate,
    0.2,
    fondoEscaparate
);

const piso = new THREE.Mesh(
    geometriaPiso,
    materialPiso
);

piso.position.set(0, 0, 0);
escaparate.add(piso);


// PARED TRASERA

const geometriaParedTrasera = new THREE.BoxGeometry(
    anchoEscaparate,
    altoEscaparate,
    0.2
);

const paredTrasera = new THREE.Mesh(
    geometriaParedTrasera,
    materialPared
);

paredTrasera.position.set(
    0,
    altoEscaparate / 2,
    -3.9
);

escaparate.add(paredTrasera);


// PARED IZQUIERDA

const geometriaParedIzquierda = new THREE.BoxGeometry(
    0.2,
    altoEscaparate,
    fondoEscaparate
);

const paredIzquierda = new THREE.Mesh(
    geometriaParedIzquierda,
    materialPared
);

paredIzquierda.position.set(
    -5.9,
    altoEscaparate / 2,
    0
);

escaparate.add(paredIzquierda);


// TECHO

const materialTecho = new THREE.MeshStandardMaterial({
    map: crearTexturaTablero(12, 8),
    color: "#8a8a8a",
    roughness: 1,
    metalness: 0
});

const techo = new THREE.Mesh(
    new THREE.PlaneGeometry(anchoEscaparate, fondoEscaparate),
    materialTecho
);

techo.rotation.x = Math.PI / 2; 
techo.position.set(0, altoEscaparate, 0);
escaparate.add(techo);


// TEXTURA DEL TABLERO

function crearTexturaTablero(columnas, filas) {

    const tamañoCasilla = 96;

    const lienzo = document.createElement("canvas");
    lienzo.width = columnas * tamañoCasilla;
    lienzo.height = filas * tamañoCasilla;

    const pincel = lienzo.getContext("2d");

    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {

            const x = columna * tamañoCasilla;
            const y = fila * tamañoCasilla;
            const esBlanca = (fila + columna) % 2 === 0;

            // Color base de la casilla
            if (esBlanca) {
                pincel.fillStyle = "#d4cfc5";
            } else {
                pincel.fillStyle = "#151515";
            }

            pincel.fillRect(x, y, tamañoCasilla, tamañoCasilla);
        }
    }

    const textura = new THREE.CanvasTexture(lienzo);
    textura.colorSpace = THREE.SRGBColorSpace;
    textura.anisotropy = 8;

    return textura;
}


// MATERIALES DEL TABLERO

const materialTableroPiso = new THREE.MeshStandardMaterial({
    map: crearTexturaTablero(12, 8),
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.7
});

const materialTableroParedTrasera = new THREE.MeshStandardMaterial({
    map: crearTexturaTablero(12, 8),
    roughness: 0.25,
    metalness: 0.1
});

const materialTableroParedIzquierda = new THREE.MeshStandardMaterial({
    map: crearTexturaTablero(8, 8),
    roughness: 0.25,
    metalness: 0.1
});


// PISO REFLEJANTE

const espejoSuelo = new Reflector(
    new THREE.PlaneGeometry(anchoEscaparate, fondoEscaparate),
    {
        textureWidth: 512,
        textureHeight: 512,
        clipBias: 0.003
    }
);

espejoSuelo.rotation.x = -Math.PI / 2;
espejoSuelo.position.y = 0.105;
escaparate.add(espejoSuelo);


// TABLERO DEL PISO

const tableroPiso = new THREE.Mesh(
    new THREE.PlaneGeometry(anchoEscaparate, fondoEscaparate),
    materialTableroPiso
);

tableroPiso.rotation.x = -Math.PI / 2;
tableroPiso.position.y = 0.115;
escaparate.add(tableroPiso);


// TABLERO DE LA PARED TRASERA

const tableroParedTrasera = new THREE.Mesh(
    new THREE.PlaneGeometry(anchoEscaparate, altoEscaparate),
    materialTableroParedTrasera
);

tableroParedTrasera.position.set(0, altoEscaparate / 2, -3.79);
escaparate.add(tableroParedTrasera);


// TABLERO DE LA PARED IZQUIERDA

const tableroParedIzquierda = new THREE.Mesh(
    new THREE.PlaneGeometry(fondoEscaparate, altoEscaparate),
    materialTableroParedIzquierda
);

tableroParedIzquierda.rotation.y = Math.PI / 2;
tableroParedIzquierda.position.set(-5.79, altoEscaparate / 2, 0);
escaparate.add(tableroParedIzquierda);


// ESPEJO EXTERIOR TRASERO

const geometriaEspejoTrasero = new THREE.PlaneGeometry(
    anchoEscaparate,
    altoEscaparate
);

const espejoTrasero = new THREE.Mesh(
    geometriaEspejoTrasero,
    materialEspejo
);

espejoTrasero.rotation.y = Math.PI;

espejoTrasero.position.set(
    0,
    altoEscaparate / 2,
    -4.01
);

escaparate.add(espejoTrasero);


// ESPEJO EXTERIOR LATERAL

const geometriaEspejoLateral = new THREE.PlaneGeometry(
    fondoEscaparate,
    altoEscaparate
);

const espejoLateral = new THREE.Mesh(
    geometriaEspejoLateral,
    materialEspejo
);

espejoLateral.rotation.y = -Math.PI / 2;

espejoLateral.position.set(
    -6.01,
    altoEscaparate / 2,
    0
);

escaparate.add(espejoLateral);


// ESPEJO DEBAJO DEL PISO

const geometriaEspejoPiso = new THREE.PlaneGeometry(
    anchoEscaparate,
    fondoEscaparate
);

const espejoPiso = new THREE.Mesh(
    geometriaEspejoPiso,
    materialEspejo
);

espejoPiso.rotation.x = Math.PI / 2;

espejoPiso.position.set(
    0,
    -0.11,
    0
);

escaparate.add(espejoPiso);


// LISTAS DE MANECILLAS 

const manecillasLargas = [];
const manecillasCortas = [];


// CREAR UN RELOJ

function crearReloj(
    posicionX,
    posicionY,
    posicionZ,
    rotacionY,
    escala
) {
    const reloj = new THREE.Group();

    const materialMarco = new THREE.MeshStandardMaterial({
        color: "#b31522",
        metalness: 0.35,
        roughness: 0.3
    });

    const materialCaratula = new THREE.MeshStandardMaterial({
        color: "#dedbd3",
        metalness: 0,
        roughness: 0.8
    });

    const materialManecillas = new THREE.MeshStandardMaterial({
        color: "#111111",
        roughness: 0.7
    });

    const caratula = new THREE.Mesh(
        new THREE.CircleGeometry(0.72, 48),
        materialCaratula
    );

    reloj.add(caratula);

    const marco = new THREE.Mesh(
        new THREE.TorusGeometry(
            0.72,
            0.08,
            16,
            48
        ),
        materialMarco
    );

    marco.position.z = 0.03;
    reloj.add(marco);


    const pivoteLargo = new THREE.Group();
    pivoteLargo.position.z = 0.06;
    reloj.add(pivoteLargo);

    const manecillaLarga = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.06,
            0.48,
            0.05
        ),
        materialManecillas
    );

    manecillaLarga.position.y = 0.2;
    pivoteLargo.add(manecillaLarga);
    manecillasLargas.push(pivoteLargo);

    const pivoteCorto = new THREE.Group();
    pivoteCorto.position.z = 0.07;
    reloj.add(pivoteCorto);

    const manecillaCorta = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.32,
            0.06,
            0.05
        ),
        materialManecillas
    );

    manecillaCorta.position.x = 0.13;
    pivoteCorto.add(manecillaCorta);
    manecillasCortas.push(pivoteCorto);

    const centro = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.08,
            20,
            20
        ),
        materialMarco
    );

    centro.position.z = 0.1;
    reloj.add(centro);

    reloj.position.set(
        posicionX,
        posicionY,
        posicionZ
    );

    reloj.rotation.y = rotacionY;

    reloj.scale.set(
        escala,
        escala,
        escala
    );

    escaparate.add(reloj);
}


// RELOJES DE LA PARED TRASERA

crearReloj(
    0.9,
    6.6,
    -3.77,
    0,
    0.85
);

crearReloj(
    4.5,
    5,
    -3.77,
    0,
    0.65
);


// RELOJ DE LA PARED IZQUIERDA

crearReloj(
    -5.77,
    6.5,
    -1.8,
    Math.PI / 2,
    0.8
);


// ESPEJOS CON ARCO Y MARCO ROJO 

const materialMarcoEspejo = new THREE.MeshStandardMaterial({
    color: "#b31522",
    metalness: 0.35,
    roughness: 0.3
});


// FORMA DE ARCO

function crearFormaArco(ancho, alto) {

    const radio = ancho / 2;

    const forma = new THREE.Shape();

    forma.moveTo(-radio, 0);
    forma.lineTo(radio, 0);
    forma.lineTo(radio, alto - radio);
    forma.absarc(0, alto - radio, radio, 0, Math.PI, false);
    forma.lineTo(-radio, 0);

    return forma;
}


// CREAR UN ESPEJO CON ARCO

function crearEspejoArco(
    posicionX,
    posicionY,
    posicionZ,
    rotacionY,
    ancho,
    alto
) {
    const espejoCompleto = new THREE.Group();

    const grosorMarco = 0.15;

    const marco = new THREE.Mesh(
        new THREE.ShapeGeometry(
            crearFormaArco(
                ancho + grosorMarco * 2,
                alto + grosorMarco
            ),
            32
        ),
        materialMarcoEspejo
    );

    marco.position.z = 0.01;
    espejoCompleto.add(marco);

    // Resolución bajada a 256 para cuidar los 60 fps
    const cristal = new Reflector(
        new THREE.ShapeGeometry(
            crearFormaArco(ancho, alto),
            32
        ),
        {
            textureWidth: 256,
            textureHeight: 256,
            clipBias: 0.003
        }
    );

    cristal.position.z = 0.02;
    espejoCompleto.add(cristal);

    espejoCompleto.position.set(
        posicionX,
        posicionY,
        posicionZ
    );

    espejoCompleto.rotation.y = rotacionY;

    escaparate.add(espejoCompleto);
}


// ESPEJOS DE LA PARED TRASERA

crearEspejoArco(0.3, 0.12, -3.785, 0, 2.2, 4.6);
crearEspejoArco(3.3, 0.12, -3.785, 0, 1.8, 3.0);

// ESPEJO DE LA PARED IZQUIERDA

crearEspejoArco(-5.785, 0.12, -0.6, Math.PI / 2, 1.8, 3.4);


// LUCES CÁLIDAS 

function crearTexturaBrillo() {

    const lienzo = document.createElement("canvas");
    lienzo.width = 128;
    lienzo.height = 8;

    const pincel = lienzo.getContext("2d");

    const degradado = pincel.createLinearGradient(0, 0, 128, 0);
    degradado.addColorStop(0, "rgba(255, 160, 70, 0)");
    degradado.addColorStop(0.5, "rgba(255, 160, 70, 0.5)");
    degradado.addColorStop(1, "rgba(255, 160, 70, 0)");

    pincel.fillStyle = degradado;
    pincel.fillRect(0, 0, 128, 8);

    const textura = new THREE.CanvasTexture(lienzo);
    textura.colorSpace = THREE.SRGBColorSpace;

    return textura;
}

const materialLuzCalida = new THREE.MeshBasicMaterial({
    color: "#ffd08a"
});

const materialBrillo = new THREE.MeshBasicMaterial({
    map: crearTexturaBrillo(),
    transparent: true,
    depthWrite: false
});


// BARRA DE LUZ VERTICAL

function crearBarraLuz(x, z, ancho, alto, rotacionY) {

    const grupo = new THREE.Group();

    const barra = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, alto, 0.1),
        materialLuzCalida
    );

    grupo.add(barra);

    // plano de brillo suave delante de la barra
    const brillo = new THREE.Mesh(
        new THREE.PlaneGeometry(ancho * 2.5, alto),
        materialBrillo
    );

    brillo.position.z = 0.06;
    grupo.add(brillo);

    grupo.position.set(x, 0.12 + alto / 2, z);
    grupo.rotation.y = rotacionY;

    escaparate.add(grupo);
}


//ARO DE LUZ

function crearAureola(x, y, z, rotacionY, radio) {

    const aureola = new THREE.Mesh(
        new THREE.TorusGeometry(radio, 0.04, 12, 48),
        materialLuzCalida
    );

    aureola.position.set(x, y, z);
    aureola.rotation.y = rotacionY;

    escaparate.add(aureola);
}


// BARRAS DE LA PARED TRASERA

crearBarraLuz(5.6, -3.735, 0.3, 6.5, 0);      
crearBarraLuz(1.9, -3.735, 0.3, 2.2, 0);       


// BARRA DE LA PARED IZQUIERDA

crearBarraLuz(-5.735, 1.3, 0.3, 4.2, Math.PI / 2);


// PIEZAS IMPORTADAS (chess_figures.glb)

const piezas = [];


// COLOCAR UNA PIEZA EN EL PISO

function colocarPieza(numero, material, x, z, altura, giro) {

    const pieza = new THREE.Mesh(
        piezas[numero].geometria,
        material
    );

    const escala = altura / piezas[numero].altura;

    pieza.scale.set(escala, escala, escala);
    pieza.position.set(x, 0.12, z);
    pieza.rotation.y = giro;

    escaparate.add(pieza);

    return pieza;
}


// COLOCAR UNA PIEZA EN LA PARED TRASERA 

function colocarEnParedTrasera(numero, material, x, y, altura, giro) {

    const pieza = new THREE.Mesh(
        piezas[numero].geometria,
        material
    );

    const escala = altura / piezas[numero].altura;

    pieza.scale.set(escala, escala, escala);
    pieza.rotation.y = giro;

    const grupo = new THREE.Group();
    grupo.add(pieza);

    grupo.position.set(x, y, -3.78);
    grupo.rotation.x = Math.PI / 2;

    escaparate.add(grupo);

    // aro de luz alrededor de la base
    crearAureola(x, y, -3.745, 0, altura * 0.27);
}


// COLOCAR UNA PIEZA EN LA PARED IZQUIERDA

function colocarEnParedIzquierda(numero, material, z, y, altura, giro) {

    const pieza = new THREE.Mesh(
        piezas[numero].geometria,
        material
    );

    const escala = altura / piezas[numero].altura;

    pieza.scale.set(escala, escala, escala);
    pieza.rotation.y = giro;

    const grupo = new THREE.Group();
    grupo.add(pieza);

    grupo.position.set(-5.78, y, z);
    grupo.rotation.z = -Math.PI / 2;

    escaparate.add(grupo);

    // aro de luz alrededor de la base
    crearAureola(-5.745, y, z, Math.PI / 2, altura * 0.27);
}


// TORRES QUE SE ANIMAN

let torreRoja;
let torreBlanca;


// CARGAR EL ARCHIVO

const cargador = new GLTFLoader();

cargador.load("./modelos/chess_figures.glb", function(gltf) {

    gltf.scene.updateMatrixWorld(true);

    // Sacar cada pieza, centrarla y apoyar su base en y = 0
    gltf.scene.traverse(function(objeto) {

        if (objeto.isMesh) {

            const geometria = objeto.geometry.clone();
            geometria.applyMatrix4(objeto.matrixWorld);
            geometria.computeBoundingBox();

            const caja = geometria.boundingBox;

            const altura = caja.max.y - caja.min.y;

            geometria.translate(
                -(caja.min.x + caja.max.x) / 2,
                -caja.min.y,
                -(caja.min.z + caja.max.z) / 2
            );

            piezas.push({
                geometria: geometria,
                altura: altura
            });
        }
    });


    // PIEZAS DEL PISO

    torreRoja = colocarPieza(4, materialPiezaRoja, -4.0, 2.0, 3.6, 0.3); 
    torreBlanca = colocarPieza(10, materialPiezaBlanca, 3.8, 2.0, 4.6, 0); 
    colocarPieza(11, materialPiezaBlanca, -1.0, 1.0, 1.7, 0);
    colocarPieza(5, materialPiezaRoja, 1.2, -0.8, 1.3, 0); 
    colocarPieza(5, materialPiezaNegra, 4.9, -1.4, 1.5, 0); 
    colocarPieza(3, materialPiezaNegra, -2.6, -1.6, 1.4, 3 * Math.PI / 4); 
    colocarPieza(7, materialPiezaBlanca, 0.6, 3.1, 1.3, 0); 


    // PIEZAS DE LA PARED TRASERA

    colocarEnParedTrasera(5, materialPiezaNegra, -2.2, 4.3, 2.4, 0);
    colocarEnParedTrasera(11, materialPiezaBlanca, 3.0, 6.9, 2.0, 0); 
    colocarEnParedTrasera(5, materialPiezaNegra, 5.0, 2.8, 1.8, 0);
    colocarEnParedTrasera(11, materialPiezaRoja, -4.2, 6.2, 1.8, 0); 


    // PIEZAS DE LA PARED IZQUIERDA

    colocarEnParedIzquierda(11, materialPiezaBlanca, 2.4, 6.0, 2.2, 0); 
    colocarEnParedIzquierda(5, materialPiezaRoja, -0.2, 6.8, 1.9, 0); 
    colocarEnParedIzquierda(5, materialPiezaNegra, -2.6, 2.6, 1.8, 0);   

    console.log("Piezas cargadas:", piezas.length);  

}, undefined, function(error) {
    console.log("Error al cargar el modelo:", error);
});


// MANO GIGANTE

const tamañoMano = 16;              
const manoX = 0;                  
const manoZ = 0;                   
const manoAltura = 0;               
const manoVuelta = Math.PI / 2;    
const manoGiro = Math.PI;           
const manoInclinacion = 0;          
const colorMano = "#c41424";      

const cargadorMano = new GLTFLoader();

cargadorMano.load("./modelos/hand_gesture1.glb", function(gltf) {

    const mano = gltf.scene;

    //darle color: un material nuevo de la mano
    let materialMano;

    mano.traverse(function(objeto) {

        if (objeto.isMesh) {

            if (!materialMano) {
                materialMano = new THREE.MeshStandardMaterial({
                    color: colorMano,
                    roughness: 0.35,
                    metalness: 0.15,
                    normalMap: objeto.material.normalMap,
                    side: THREE.DoubleSide
                });
            }

            objeto.material = materialMano;
        }
    });

    //centrar la mano en su propio origen
    const caja = new THREE.Box3().setFromObject(mano);
    const centro = new THREE.Vector3();
    const tamaño = new THREE.Vector3();

    caja.getCenter(centro);
    caja.getSize(tamaño);

    mano.position.set(-centro.x, -centro.y, -centro.z);

    //rotar
    const girada = new THREE.Group();
    girada.add(mano);
    girada.rotation.z = manoVuelta;

    //dedos
    const inclinada = new THREE.Group();
    inclinada.add(girada);
    inclinada.rotation.x = manoInclinacion;

    const soporteMano = new THREE.Group();
    soporteMano.add(inclinada);
    soporteMano.rotation.y = manoGiro;

    const mayor = Math.max(tamaño.x, tamaño.y, tamaño.z);
    const escala = tamañoMano / mayor;
    soporteMano.scale.set(escala, escala, escala);

    //ponerla debajo del escaparate
    soporteMano.position.set(manoX, 0, manoZ);
    soporteMano.updateMatrixWorld(true);

    const cajaFinal = new THREE.Box3().setFromObject(soporteMano, true);
    soporteMano.position.y = manoAltura - cajaFinal.max.y;

    scene.add(soporteMano);

}, undefined, function(error) {
    console.log("Error al cargar la mano:", error);
});


// CÁMARA

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    150
);

camera.position.set(15, 10, 18);
camera.lookAt(0, 3.5, 0);


// RENDERER

const canvas = document.querySelector("#miLienzo");

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 0.85;


// ENTORNO PARA LOS ESPEJOS

const entorno = new RoomEnvironment();

const generadorReflejos =
    new THREE.PMREMGenerator(renderer);

scene.environment =
    generadorReflejos.fromScene(entorno).texture;

// Iluminacion del entorno
scene.environmentIntensity = 0.12;

entorno.dispose();
generadorReflejos.dispose();


// CONTROLES DEL MOUSE

const controles = new OrbitControls(
    camera,
    renderer.domElement
);

controles.target.set(0, 3.5, 0);
controles.enableDamping = true;
controles.enablePan = true;
controles.minDistance = 10;
controles.maxDistance = 35;
controles.update();


// LUZ AMBIENTAL

const luzAmbiente = new THREE.AmbientLight(
    "#ffeedd",
    0.12
);

scene.add(luzAmbiente);


// LUZ PRINCIPAL

const luzPrincipal = new THREE.DirectionalLight(
    "#ffd9a8",
    1.2
);

luzPrincipal.position.set(7, 13, 10);
scene.add(luzPrincipal);


// LUZ ROJA DECORATIVA

const luzRoja = new THREE.PointLight(
    "#ff2035",
    12,
    15
);

luzRoja.position.set(-3, 5, 3);
scene.add(luzRoja);


// LUZ CÁLIDA 

const luzCalida = new THREE.PointLight(
    "#ffb866",
    20,
    14
);

luzCalida.position.set(4.5, 3.5, -2);
scene.add(luzCalida);


// ANIMACIÓN

const cronometro = new THREE.Clock();

function animar() {
    requestAnimationFrame(animar);

    const t = cronometro.getElapsedTime();

    // relojes: las manecillas giran
    for (let i = 0; i < manecillasLargas.length; i++) {
        manecillasLargas[i].rotation.z = -t * 1.5;
        manecillasCortas[i].rotation.z = -t * 1.5 / 12;
    }

    // torres: giran lento sobre su propio eje
    if (torreRoja) {
        torreRoja.rotation.y = 0.3 + t * 0.3;
    }

    if (torreBlanca) {
        torreBlanca.rotation.y = -t * 0.2;
    }

    // luces
    materialBrillo.opacity = 0.85 + Math.sin(t * 1.5) * 0.15;

    controles.update();

    renderer.render(scene, camera);
}

animar();


// AJUSTAR EL TAMAÑO DE LA VENTANA

window.addEventListener("resize", function() {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});