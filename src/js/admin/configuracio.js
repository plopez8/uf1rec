function guardarConfiguracion() {
    var lletresRepetides = document.querySelector('input[name="opcion1"]:checked');
    var nomesLletresParaula = document.querySelector('input[name="opcion2"]:checked');
    var numeroLletres = document.getElementById('numero-lletres').value;
    var tipusLletra = document.querySelector('input[name="opcion3"]:checked');
  
    if (lletresRepetides && nomesLletresParaula && numeroLletres >= 1 && numeroLletres <= 90 && tipusLletra) {
      var configuracion = {
        lletresRepetides: lletresRepetides.value,
        nomesLletresParaula: nomesLletresParaula.value,
        numeroLletres: numeroLletres,
        tipusLletra: tipusLletra.value
      };
  
      localStorage.setItem('configuracion', JSON.stringify(configuracion));
  
      console.log(configuracion);
    } else {
      console.log('No se han asignado todos los valores o el número de letras está fuera del rango.');
    }
  }
  