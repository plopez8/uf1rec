var input = document.getElementById("idiomaInput");
var guardarButton = document.getElementById("guardarButton");

guardarButton.addEventListener("click", function() {
    var idioma = input.value;

    if (/^[a-zA-Z]+$/.test(idioma)) {
        var idiomas = JSON.parse(localStorage.getItem("idiomas")) || [];

        if (idiomas.includes(idioma)) {
            alert("El idioma ya existe en el array");
        } else {
            idiomas.push(idioma);

            localStorage.setItem("idiomas", JSON.stringify(idiomas));

            alert("Idioma guardado correctamente");
        }
    } else {
        alert("El idioma debe contener solo caracteres alfabéticos");
    }
});
