import { generarMatriu, checkPosi } from './matrius.js';

document.addEventListener("DOMContentLoaded", function() {
  var paraulaElement = document.getElementById("paraula");
  var tempsElement = document.getElementById("temps");
  var canvas = document.querySelector("canvas");
  var correcteElement = document.getElementById("correcte");
  var errorElement = document.getElementById("error");
  var fotoElement = document.getElementById("foto");
  var lletraElement = document.getElementById("lletra");
  var encertadesElement = document.getElementById("encertades");
  var puntsElement = document.getElementById("punts");

  var paraules;
  var paraulaSelect;
  var matriu;
  var letras;
  var posi;
  var lletcorrectes = 0;
  var lleterror = 0;
  var intervalId;
  var encertades = 0;
  var punts = 0;
  var configuracionGuardada = JSON.parse(localStorage.getItem("configuracion"));

  if (!configuracionGuardada) {

    var configuracionPorDefecto = {
      lletresRepetides: "no",
      nomesLletresParaula: "no",
      numeroLletres: 3,
      tipusLletra: "si"
    };
    localStorage.setItem("configuracion", JSON.stringify(configuracionPorDefecto));
    configuracionGuardada = configuracionPorDefecto;
  }
  var palabrasGuardadas = JSON.parse(localStorage.getItem("paraules"));
  if (palabrasGuardadas) {
    paraules = palabrasGuardadas;
    iniciarJuego();
  } else {
    fetch("../../data/paraules.json")
      .then(response => response.json())
      .then(data => {
        paraules = data.paraules;

        localStorage.setItem("paraules", JSON.stringify(paraules));

        iniciarJuego();
      })
      .catch(error => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }

  function iniciarJuego() {
    paraulaSelect = paraules[Math.floor(Math.random() * paraules.length)];
    paraulaElement.textContent = paraulaSelect.paraula;
    
    lletcorrectes = 0;
    lleterror = 0;
    correcteElement.textContent = lletcorrectes;
    errorElement.textContent = lleterror;
    lletraElement.textContent = "";

    colocar();

    var startTime = Date.now();
    intervalId = setInterval(function() {
      var currentTime = Date.now();
      var elapsedTime = Math.floor((currentTime - startTime) / 1000);
      tempsElement.textContent = elapsedTime + " segons";
    }, 1000);
  }

  function colocar() {
    matriu = generarMatriu(canvas.width, canvas.height);
    letras = paraulaSelect.traduccio.split("");
    posi = [];
    var configuracion = JSON.parse(localStorage.getItem("configuracion"));
    var numeroLletres = configuracion.numeroLletres;
  
    var letrasRandom = letras.slice();
    if(configuracion.tipusLletra == "minuscules"){
      var alfabeto = "abcdefghijklmnopqrstuvwxyz";
    }else if(configuracion.tipusLletra == "majuscules"){
      var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }else{
      var alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    
    while (letrasRandom.length < numeroLletres) {
      var letraAleatoria = alfabeto[Math.floor(Math.random() * alfabeto.length)];
      letrasRandom.push(letraAleatoria);
    }
  
    for (var i = letrasRandom.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = letrasRandom[i];
      letrasRandom[i] = letrasRandom[j];
      letrasRandom[j] = temp;
    }
  
    dibujarLetras(letrasRandom);
  }

  function dibujarLetras(letrasRandom) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < letrasRandom.length; i++) {
      var letraRandom = letrasRandom[i];
      var posX;
      var posY;
      do {
        posX = Math.floor(Math.random() * (canvas.width - 40)) + 20;
        posY = Math.floor(Math.random() * (canvas.height - 40)) + 20;
      } while (checkPosi(posX, posY, matriu));

      for (var x = posX - 20; x <= posX + 20; x++) {
        for (var y = posY - 20; y <= posY + 20; y++) {
          if (matriu[x]) {
            matriu[x][y] = true;
          }
        }
      }

      posi.push({ x: posX, y: posY });

      context.font = "14px Courier";
      context.fillText(letraRandom, posX, posY);
    }
  }

  function handleCanvasClick(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    for (var i = 0; i < letras.length; i++) {
      var letra = letras[i];
      var posX = posi[i].x;
      var posY = posi[i].y;

      if (clickX >= posX - 20 && clickX <= posX + 20 && clickY >= posY - 20 && clickY <= posY + 20) {
        click(letra);
        break;
      }
    }
  }

  function click(letra) {
    if (letra == letras[lletcorrectes]) {
      lletcorrectes++;
      correcteElement.textContent = lletcorrectes;
      lletraElement.textContent = letra;
      fotoElement.src = "../../../images/ok.webp";
    } else {
      lleterror++;
      errorElement.textContent = lleterror;
      lletraElement.textContent = letra;
      fotoElement.src = "../../../images/nok.webp";
    }

    if (lletcorrectes === letras.length) {
      clearInterval(intervalId);
      fotoElement.src = "";
      encertades++;
      encertadesElement.textContent = encertades;
      punts = (lletcorrectes - lleterror) + 10
      puntsTotal = puntsTotal + punts;
      if(puntsTotal < 0){
        puntsTotal = 0;
      }
      puntsElement.textContent = puntsTotal;
      let datos = {
        paraula: paraulaSelect.paraula,
        traduccio: paraulaSelect.traduccio,
        temps: tempsElement.textContent,
        correctes: lletcorrectes,
        errors: lleterror,
        punts: punts
      };
      
      guardarRegistro(localStorage.getItem("jugador"), datos);
      iniciarJuego( );
    }
  }


  function guardarRegistro(usuario, partida) {
  
    var registroExistente = JSON.parse(localStorage.getItem("registre")) || {};
  
    
    if (!registroExistente.hasOwnProperty(usuario)) {
      registroExistente[usuario] = [];
    }
    
    registroExistente[usuario].push(partida);
    
  
    localStorage.setItem("registre", JSON.stringify(registroExistente));
  
  }
  
  
  
  
  
  canvas.addEventListener("click", handleCanvasClick);
  
  var botonRenovar = document.querySelector("button");
  botonRenovar.addEventListener("click", colocar);
});
