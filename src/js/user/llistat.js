document.addEventListener("DOMContentLoaded", function() {
    var tablaRegistros = document.getElementById("tabla-registros");
    var registros = JSON.parse(localStorage.getItem("registre"));
    if (registros) {
      for (var usuario in registros) {
        if (registros.hasOwnProperty(usuario)) {
          var partidas = registros[usuario];
          for (var i = 0; i < partidas.length; i++) {
            var partida = partidas[i];
            console.log(partida.temps);
            var fila = tablaRegistros.insertRow();
            fila.insertCell().textContent = usuario;
            fila.insertCell().textContent = partida.paraula;
            fila.insertCell().textContent = partida.traduccio;
            fila.insertCell().textContent = segundosAMinutosSegundos(partida.temps);
            fila.insertCell().textContent = partida.correctes;
            fila.insertCell().textContent = partida.errors;
            fila.insertCell().textContent = partida.punts;
          }
        }
      }
    }
  });
  function segundosAMinutosSegundos(tiempo) {
    tiempo = parseInt(tiempo);
    if (tiempo >= 60) {
      var minutos = Math.floor(tiempo / 60);
      var segundos = tiempo % 60;
      return minutos + " min " + segundos + " seg";
    }else if (tiempo <59) {
      return "0 min " + tiempo + " seg";
    }
  }
  
    