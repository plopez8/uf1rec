document.addEventListener("DOMContentLoaded", function() {
    var guardarButton = document.getElementById("guardarButton");
  
    guardarButton.addEventListener("click", function() {
      var paraulaInput = document.getElementById("paraulaInput");
      var traduccioInput = document.getElementById("traduccioInput");
      var paraula = paraulaInput.value.trim().toLowerCase();
      var traduccio = traduccioInput.value.trim().toLowerCase();
  
      if (paraula === '' || !/^[a-z]+$/.test(paraula)) {
        alert("La paraula no és vàlida. Només s'admeten lletres minúscules i sense espais.");
        return;
      }
  
      if (traduccio === '' || !/^[a-zA-Z]+$/.test(traduccio)) {
        alert("La traducció no és vàlida. Només s'admeten lletres majúscules i minúscules.");
        return;
      }
  
      var paraulesExistente = JSON.parse(localStorage.getItem("paraules")) || [];
  
      if (!Array.isArray(paraulesExistente)) {
        paraulesExistente = [];
      }
  
      var palabraExistente = paraulesExistente.find(function(registro) {
        return registro.paraula === paraula || registro.traduccio === traduccio;
      });
  
      if (palabraExistente) {
        alert("La paraula o la traducció ja existeixen en els registres.");
        return;
      }
  
      var nuevoRegistro = {
        paraula: paraula,
        traduccio: traduccio
      };
  
      paraulesExistente.push(nuevoRegistro);
  
      localStorage.setItem("paraules", JSON.stringify(paraulesExistente));
  
      paraulaInput.value = '';
      traduccioInput.value = '';
  
      console.log("Registro guardado exitosamente:", nuevoRegistro);
    });
  });
  