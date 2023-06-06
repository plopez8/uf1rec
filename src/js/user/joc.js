document.addEventListener("DOMContentLoaded", function() {
  fetch("../../data/paraules.json")
    .then(response => response.json())
    .then(data => {
      var paraules = data.paraules;
      var paraulaSelect = paraules[Math.floor(Math.random() * paraules.length)];
      var paraulaElement = document.getElementById("paraula");
      paraulaElement.textContent = paraulaSelect.paraula;
      var tempsElement = document.getElementById("temps");
      var startTime = Date.now();
      var intervalId = setInterval(function() {
        var currentTime = Date.now();
        var elapsedTime = Math.floor((currentTime - startTime) / 1000);
        tempsElement.textContent = elapsedTime + " segons";
      }, 1000);
      
      var canvas = document.querySelector("canvas");
      var context = canvas.getContext("2d");
      
      var matriu = [];
      for (var amp = 0; i < canvas.width; amp++) {
        matriu[amp] = [];
        for (var alt = 0; j < canvas.height; alt++) {
          matriu[amp][alt] = false;
        }
      }
      console.log(matriu);
      
      
      
      var lletcorrectes = 0;
      var lleterror = 0;
      
      
      canvas.addEventListener("click", handleCanvasClick);
      
      var letras = paraulaSelect.traduccio.split("");
      var posi = [];
      for (var i = 0; i < letras.length; i++) {
        var letra = letras[i];
        var posX;
        var posY;
        console.log("do");
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
    })
    .catch(error => {
      console.error("Error al cargar el archivo JSON:", error);
    });
  });
  
  
  function click(letra){
    console.log("funcio click");
    console.log(letra);
  }
  function handleCanvasClick(event) {
    console.log("funcio handle");
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;
    
    for (var i = 0; i < letras.length; i++) {
      var letra = letras[i];
      var posX = posi[i].x;
      var posY = posi[i].y;
      
      if (clickX >= posX - 20 && clickX <= posX + 20 && clickY >= posY - 20 && clickY <= posY + 20) {
        console.log("Clic en la letra:", letra);
        click(letra);
        break;
      }
    }
  }
        function checkPosi(posX, posY) {
          console.log("chekc");
          for (var x = posX - 20; x <= posX + 20; x++) {
            for (var y = posY - 20; y <= posY + 20; y++) {
              if (matriu[x] && matriu[x][y]) {
                return true;
              }
            }
          }
          return false;
        }