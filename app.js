let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if(/^-?\d+$/.test(numeroDeUsuario)){
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
            habilitarComponente('#reiniciar');
        } else {
            //El usuario no acertó.
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p','El número secreto es menor');
            } else {
                asignarTextoElemento('p','El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }
    } else {
        asignarTextoElemento('p', 'Solo ingrese números enteros');
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

/*
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
*/

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * 10 + 1);

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se han sorteado todos los números posibles');
        inhabilitarComponente('#intentar');
        habilitarComponente('#resetear');
    } else {
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    //console.log(numeroSecreto);
    if(listaNumerosSorteados.length != numeroMaximo){
        habilitarComponente('#intentar');
    }
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    inhabilitarComponente('#reiniciar');
}

function resetearJuego(){
    vaciarLista();
    condicionesIniciales();
    inhabilitarComponente('#resetear');
}

function vaciarLista(){
    listaNumerosSorteados.splice(0);
}

function habilitarComponente(componente){
    document.querySelector(componente).removeAttribute('disabled');
}

function inhabilitarComponente(componente){
    document.querySelector(componente).setAttribute('disabled', 'true');
}

condicionesIniciales();