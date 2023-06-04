document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var usuario = document.getElementById("usuario").value;
    var contrasenya = document.getElementById("contrasenya").value;
    localStorage.setItem("usuario", usuario);
    if (usuario === "admin" && contrasenya === "admin") {
        window.location.href = "pages/admin/menu.html";
    } else {
        window.location.href = "pages/user/jugar.html";
    }
});