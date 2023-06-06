document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var usuario = document.getElementById("usuario").value;
    var contrasenya = document.getElementById("contrasenya").value;
    if (usuario === "admin" && contrasenya === "admin") {
        window.location.href = "pages/admin/menu.html";
        localStorage.setItem("usuario", usuario);
    } else if(usuario === "admin" && contrasenya != "admin"){
        location.reload();
    }else {
        window.location.href = "pages/user/menu.html";
        localStorage.setItem("usuario", usuario);
    }
});