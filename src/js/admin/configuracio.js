window.onload = function() {

  var idiomaSelect = document.getElementById("idiomaSelect");

  // Obtener los idiomas del LocalStorage
  var idiomas = JSON.parse(localStorage.getItem("idiomas")) || [];
  console.log(idiomas);
  // Llenar el select con las opciones de idioma
  for (var i = 0; i < idiomas.length; i++) {
      var option = document.createElement("option");
      option.text = idiomas[i];
      idiomaSelect.add(option);
  }




  var configuracionGuardada = localStorage.getItem('configuracion');

  if (configuracionGuardada) {
    var configuracion = JSON.parse(configuracionGuardada);

    // Obtener los elementos del formulario
    var lletresRepetides = document.querySelector('input[name="opcion1"][value="' + configuracion.lletresRepetides + '"]');
    var nomesLletresParaula = document.querySelector('input[name="opcion2"][value="' + configuracion.nomesLletresParaula + '"]');
    var numeroLletres = document.getElementById('numero-lletres');
    var tipusLletra = document.querySelector('input[name="opcion3"][value="' + configuracion.tipusLletra + '"]');

    // Aplicar los valores de configuración al formulario
    if (lletresRepetides && nomesLletresParaula && numeroLletres && tipusLletra) {
      lletresRepetides.checked = true;
      nomesLletresParaula.checked = true;
      numeroLletres.value = configuracion.numeroLletres;
      tipusLletra.checked = true;

      console.log('Configuración cargada desde el Local Storage:', configuracion);
    } else {
      console.log('No se encontraron los elementos del formulario.');
    }
  } else {
    console.log('No se encontró configuración guardada en el Local Storage.');
  }
};

function guardarConfiguracion() {
  console.log("a");
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
      console.log('No se han asignado todos los valores o el numero de letras esta fuera del rango.');
    }
  }
  