import * as THREE from "three";

import {
    OrbitControls
} from "three/addons/controls/OrbitControls.js";

import {
    RoomEnvironment
} from "three/addons/environments/RoomEnvironment.js";


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
const tamañoCuadro = 1;


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
    color: "#f5f0e8",
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


// GEOMETRÍA DE LOS CUADROS

const geometriaCuadro = new THREE.PlaneGeometry(
    tamañoCuadro,
    tamañoCuadro
);


// ELEGIR COLOR DEL CUADRO

function elegirMaterial(fila, columna) {
    if ((fila + columna) % 2 === 0) {
        return materialBlanco;
    } else {
        return materialNegro;
    }
}


// PATRÓN DEL PISO

const columnasPiso = 12;
const filasPiso = 8;

for (let fila = 0; fila < filasPiso; fila++) {
    for (let columna = 0; columna < columnasPiso; columna++) {

        const cuadro = new THREE.Mesh(
            geometriaCuadro,
            elegirMaterial(fila, columna)
        );

        cuadro.rotation.x = -Math.PI / 2;

        cuadro.position.x = -5.5 + columna;
        cuadro.position.y = 0.11;
        cuadro.position.z = -3.5 + fila;

        escaparate.add(cuadro);
    }
}


// PATRÓN DE LA PARED TRASERA

const columnasPared = 12;
const filasPared = 8;

for (let fila = 0; fila < filasPared; fila++) {
    for (let columna = 0; columna < columnasPared; columna++) {

        const cuadro = new THREE.Mesh(
            geometriaCuadro,
            elegirMaterial(fila, columna)
        );

        cuadro.position.x = -5.5 + columna;
        cuadro.position.y = 0.5 + fila;
        cuadro.position.z = -3.79;

        escaparate.add(cuadro);
    }
}


// PATRÓN DE LA PARED IZQUIERDA

const columnasLaterales = 8;
const filasLaterales = 8;

for (let fila = 0; fila < filasLaterales; fila++) {
    for (let columna = 0; columna < columnasLaterales; columna++) {

        const cuadro = new THREE.Mesh(
            geometriaCuadro,
            elegirMaterial(fila, columna)
        );

        cuadro.rotation.y = Math.PI / 2;

        cuadro.position.x = -5.79;
        cuadro.position.y = 0.5 + fila;
        cuadro.position.z = -3.5 + columna;

        escaparate.add(cuadro);
    }
}


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


// CREAR UN PEÓN

function crearPeon(
    material,
    posicionX,
    posicionY,
    posicionZ,
    rotacionX,
    rotacionZ,
    escala
) {
    const peon = new THREE.Group();

    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.42,
            0.5,
            0.25,
            32
        ),
        material
    );

    base.position.y = 0.125;
    peon.add(base);

    const baseSuperior = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.3,
            0.4,
            0.18,
            32
        ),
        material
    );

    baseSuperior.position.y = 0.34;
    peon.add(baseSuperior);

    const cuerpo = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.17,
            0.3,
            0.65,
            32
        ),
        material
    );

    cuerpo.position.y = 0.73;
    peon.add(cuerpo);

    const cuello = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.25,
            0.2,
            0.14,
            32
        ),
        material
    );

    cuello.position.y = 1.1;
    peon.add(cuello);

    const cabeza = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.25,
            32,
            32
        ),
        material
    );

    cabeza.position.y = 1.38;
    peon.add(cabeza);

    peon.position.set(
        posicionX,
        posicionY,
        posicionZ
    );

    peon.rotation.x = rotacionX;
    peon.rotation.z = rotacionZ;

    peon.scale.set(
        escala,
        escala,
        escala
    );

    escaparate.add(peon);
}


// CREAR UNA TORRE

function crearTorre(
    material,
    posicionX,
    posicionY,
    posicionZ,
    rotacionX,
    rotacionZ,
    escala
) {
    const torre = new THREE.Group();

    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.45,
            0.52,
            0.25,
            32
        ),
        material
    );

    base.position.y = 0.125;
    torre.add(base);

    const baseSuperior = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.35,
            0.43,
            0.18,
            32
        ),
        material
    );

    baseSuperior.position.y = 0.34;
    torre.add(baseSuperior);

    const cuerpo = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.27,
            0.35,
            0.8,
            32
        ),
        material
    );

    cuerpo.position.y = 0.82;
    torre.add(cuerpo);

    const parteSuperior = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.44,
            0.32,
            0.25,
            32
        ),
        material
    );

    parteSuperior.position.y = 1.33;
    torre.add(parteSuperior);

    const corona = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.75,
            0.22,
            0.75
        ),
        material
    );

    corona.position.y = 1.56;
    torre.add(corona);

    torre.position.set(
        posicionX,
        posicionY,
        posicionZ
    );

    torre.rotation.x = rotacionX;
    torre.rotation.z = rotacionZ;

    torre.scale.set(
        escala,
        escala,
        escala
    );

    escaparate.add(torre);
}


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

    const manecillaLarga = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.06,
            0.48,
            0.05
        ),
        materialManecillas
    );

    manecillaLarga.position.y = 0.2;
    manecillaLarga.position.z = 0.06;
    reloj.add(manecillaLarga);

    const manecillaCorta = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.32,
            0.06,
            0.05
        ),
        materialManecillas
    );

    manecillaCorta.position.x = 0.13;
    manecillaCorta.position.z = 0.07;
    reloj.add(manecillaCorta);

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


// PIEZAS DEL PISO

// Pieza roja 1
crearTorre(
    materialPiezaRoja,
    -4.4,
    0.12,
    2.7,
    0,
    0,
    1.8
);

crearPeon(
    materialPiezaBlanca,
    -1.8,
    0.12,
    0.6,
    0,
    0,
    1.25
);

// Pieza roja 2
crearPeon(
    materialPiezaRoja,
    0.4,
    0.12,
    -1.8,
    0,
    0,
    1.55
);

crearPeon(
    materialPiezaNegra,
    2.7,
    0.12,
    -2.3,
    0,
    0,
    1.25
);

crearTorre(
    materialPiezaBlanca,
    4.3,
    0.12,
    2.4,
    0,
    0,
    2
);


// PIEZAS DE LA PARED TRASERA

// Pieza roja 3
crearPeon(
    materialPiezaRoja,
    -4.4,
    6.4,
    -3.78,
    Math.PI / 2,
    0,
    1.4
);

crearTorre(
    materialPiezaNegra,
    -1.3,
    3.6,
    -3.78,
    Math.PI / 2,
    0,
    1.7
);

crearPeon(
    materialPiezaBlanca,
    2.7,
    6.3,
    -3.78,
    Math.PI / 2,
    0,
    1.35
);

crearPeon(
    materialPiezaNegra,
    5,
    2.2,
    -3.78,
    Math.PI / 2,
    0,
    1.2
);


// PIEZAS DE LA PARED IZQUIERDA

crearTorre(
    materialPiezaBlanca,
    -5.78,
    5.8,
    2.5,
    0,
    -Math.PI / 2,
    1.55
);

crearPeon(
    materialPiezaNegra,
    -5.78,
    2,
    -2.5,
    0,
    -Math.PI / 2,
    1.35
);


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

// Menor exposición para evitar blancos demasiado brillantes
renderer.toneMappingExposure = 0.85;


// ENTORNO PARA LOS ESPEJOS

const entorno = new RoomEnvironment();

const generadorReflejos =
    new THREE.PMREMGenerator(renderer);

scene.environment =
    generadorReflejos.fromScene(entorno).texture;

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
    "#ffffff",
    1.1
);

scene.add(luzAmbiente);


// LUZ PRINCIPAL

const luzPrincipal = new THREE.DirectionalLight(
    "#fff1d6",
    2.2
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


// LUZ EXTERIOR

const luzExterior = new THREE.DirectionalLight(
    "#dce8ff",
    1.2
);

luzExterior.position.set(-10, 10, -10);
scene.add(luzExterior);


// ANIMACIÓN

function animar() {
    requestAnimationFrame(animar);

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