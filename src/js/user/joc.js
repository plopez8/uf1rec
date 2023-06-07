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
  fetch("../../data/paraules.json")
    .then(response => response.json())
    .then(data => {
      paraules = data.paraules;
      iniciarJuego();
    })
    .catch(error => {
      console.error("Error al cargar el archivo JSON:", error);
    });

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


  function colocar(){
    console.log("colocar")
    matriu = generarMatrizVacia(canvas.width, canvas.height);
    letras = paraulaSelect.traduccio.split("");
    posi = [];
    dibujarLetras();
  }

  function generarMatrizVacia(width, height) {
    var matriz = [];
    for (var amp = 0; amp < width; amp++) {
      matriz[amp] = [];
      for (var alt = 0; alt < height; alt++) {
        matriz[amp][alt] = false;
      }
    }
    return matriz;
  }

  function dibujarLetras() {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < letras.length; i++) {
      var letra = letras[i];
      var posX;
      var posY;
      do {
        posX = Math.floor(Math.random() * (canvas.width - 40)) + 20;
        posY = Math.floor(Math.random() * (canvas.height - 40)) + 20;
      } while (checkPosi(posX, posY));

      for (var x = posX - 20; x <= posX + 20; x++) {
        for (var y = posY - 20; y <= posY + 20; y++) {
          if (matriu[x]) {
            matriu[x][y] = true;
          }
        }
      }

      posi.push({ x: posX, y: posY });

      context.font = "14px Courier";
      context.fillText(letra, posX, posY);
    }
  }

  function checkPosi(posX, posY) {
    for (var x = posX - 20; x <= posX + 20; x++) {
      for (var y = posY - 20; y <= posY + 20; y++) {
        if (matriu[x] && matriu[x][y]) {
          return true;
        }
      }
    }
    return false;
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
      console.log("is");
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
      punts = punts + (lletcorrectes - lleterror) + 10;
      if(punts < 0){
        punts = 0;
      }
      puntsElement.textContent = punts;
      iniciarJuego();
    }
  }

  canvas.addEventListener("click", handleCanvasClick);

  var botonRenovar = document.querySelector("button");
  botonRenovar.addEventListener("click", colocar);
});
