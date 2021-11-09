let tempo = 0;
let acertos = 0;
let jogadas = 0;
let cartaVirada = 0;
let carta1 = null;
let carta2 = null;
let intervalo = null;

function começarJogo()
{
    let cartas = [
        "bobrossparrot.gif",
        "explodyparrot.gif",
        "fiestaparrot.gif",
        "metalparrot.gif",
        "revertitparrot.gif",
        "tripletsparrot.gif",
        "unicornparrot.gif"
    ];
    let tabuleiro = [];
    
    let jogo = document.querySelector(".jogo");
    let numeroCartas = -1;
    
    
    while (numeroCartas < 4 || numeroCartas > 14 || numeroCartas % 2 !== 0 ){
        numeroCartas = parseInt(prompt("Com quantas cartas deseja jogar? (só númeors pares de 4 a 14)"));
    }

    cartas.sort(comparador);
    
    for( let i = 0 ; i < numeroCartas / 2 ; i++){
        tabuleiro.push(cartas[i]);
        tabuleiro.push(cartas[i]);
    }

    jogo.innerHTML = "";
    tempo = 0;
    jogadas = 0;
    intervalo = setInterval(timer , 1000);
    acertos = numeroCartas / 2;

    tabuleiro.sort(comparador);
    
    for( let i = 0 ; i < numeroCartas ; i++){
        jogo.innerHTML += 
        `<div class="carta" onclick="viraCarta(this);" data-identifier="card">
        <div class="carta-frente" data-identifier="back-face"><img src="imagens/front.png" alt="Papagaio loko"></div>
        <div class="carta-tras" data-identifier="front-face"><img src="imagens/${tabuleiro[i]}" alt="Papagaio mais loko"></div>
        </div>`;
    }
}

function viraCarta(carta)
{   
    cartaFrente = carta.querySelector(".carta-frente");
    cartaTras = carta.querySelector(".carta-tras");
    
    if(cartaVirada === 0){
        carta1 = carta;
        cartaVirada = 1;
    }
    else if(cartaVirada === 1){    
        carta2 = carta;
        cartaVirada = 2;
        aumentarJogadas();
        setTimeout(compararCartas , 1000);
    }

    else{
        return;
    }

    cartaFrente.classList.toggle("vira-carta-frente");
    cartaTras.classList.toggle("vira-carta-tras");
    
    carta.removeAttribute("onclick");
}

function compararCartas()
{
    if(carta1.innerHTML === carta2.innerHTML)
    {
        carta1.removeAttribute("onclick");
        carta2.removeAttribute("onclick");
        acertos--;
        verificarVitoria();
    }
    else
    {
        carta1.querySelector(".carta-frente").classList.toggle("vira-carta-frente");
        carta1.querySelector(".carta-tras").classList.toggle("vira-carta-tras");
        carta1.setAttribute("onclick", "viraCarta(this);");
        carta2.querySelector(".carta-frente").classList.toggle("vira-carta-frente");
        carta2.querySelector(".carta-tras").classList.toggle("vira-carta-tras");
        carta2.setAttribute("onclick", "viraCarta(this);");
    }

    cartaVirada = 0;
}

function verificarVitoria()
{
    if (acertos === 0){
        clearInterval(intervalo);

        alert(`Você ganhou em ${jogadas} jogadas e em ${tempo} segundos`);

        jogarDenovo = prompt("Deseja jogar de novo?");
        if( jogarDenovo === "sim" ){começarJogo();}
    }
}

function aumentarJogadas()
{   
    jogadas++;

    texto = document.querySelector(".jogadas");
    texto.innerHTML = jogadas;
}

function timer()
{
    tempo++;
    timerHold = document.querySelector(".timer");
    timerHold.innerHTML = tempo;
}



// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

começarJogo();