

// Variables
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0;
let puntosPc = 0;
audioWin = new Audio('assets/sounds/un-banco_1.mp3');
audioLose = new Audio('assets/sounds/burla-wa-waaa-wa.mp3');


// Referencias del HTML
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugdor-cartas');
const divCartasPc = document.querySelector('#Pc-cartas');

// Botones
const btnDetener = document.querySelector('#btnDetener');
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');

// Esta funcion crea una nueva baraja
const crearDeck = () =>{

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo)
        }
    }
    
    // Aqui revolvemos la baraja
    deck = _.shuffle(deck)

    return deck;
}

crearDeck()


// Esta funcion me permite tomar una carta
const pedirCarta = () => {
     
   if( deck.length === 0 ){
    throw 'No hay cartas en el deck';
   }

   let carta = deck.pop();
   return carta;  
}


// pedir carta();
const valorCarta = ( carta ) => {

     const valor = carta.substring(0, carta.length - 1);
     
     return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;

}

// Turno de la Pc
const turnoPc = (puntosMinimos) => {
    
    do{
        const carta = pedirCarta();
        puntosPc += valorCarta(carta);
        puntosHTML[1].innerText = puntosPc;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cards/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasPc.append( imgCarta );

        if( puntosMinimos > 21 ){
            break;
        }


    } while((puntosPc <= puntosMinimos ) && puntosMinimos <= 21);

   setTimeout (() =>{
       
       if(puntosPc > 21){
        console.warn('Gano el Jugador');
        audioWin.play();
       } else if(puntosMinimos > 21){
        console.warn('Gano la pc');
        audioLose.play();
       } else if(puntosMinimos === puntosPc){
         console.warn('Es un Empate');
       } else {
         console.warn('Gana la pc');
         audioLose.play();
       }



   }, 2000)

}


//Eventos
btnPedir.addEventListener('click', () => {  
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cards/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if(puntosJugador > 21){
        console.warn("Lo siento perdiste");
        btnPedir.disabled = true;
        btnDetener.disabled = true
        turnoPc(puntosJugador);

    } else if(puntosJugador === 21){
        console.warn('Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true
        turnoPc(puntosJugador);
    }
    
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPc(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    
    console.clear();

    deck = crearDeck();

    puntosJugador = 0;
    puntosPc = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0; 

    divCartasPc.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    audioWin.pause();
    audioWin.currentTime = 0;

    audioLose.pause();
    audioLose.currentTime = 0;

});