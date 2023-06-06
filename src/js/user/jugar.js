document.getElementById("nomForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var jugador = document.getElementById("jugador").value;
    if( jugador.length > 1){
        localStorage.setItem("jugador", jugador);
        window.location.href = "joc.html";
    }else{
        location.reload();
    }
});