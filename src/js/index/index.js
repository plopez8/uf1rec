// Importar la función verifyUser del módulo users.js
import { verifyUser, saveUser } from '../modal/users.js';
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var usuario = document.getElementById("usuario").value;
    var contrasenya = document.getElementById("contrasenya").value;
    console.log("login");
    if (usuario === "admin" && contrasenya === "admin") {
        window.location.href = "pages/admin/menu.html";
        localStorage.setItem("usuario", usuario);
    } else if (usuario === "admin" && contrasenya !== "admin") {
        location.reload();
    } else {
        // Verificar el acceso del usuario utilizando el módulo users.js
        if (verifyUser(usuario, contrasenya)) {
            window.location.href = "pages/user/menu.html";
            saveUser(usuario);
        } else {
           location.reload();
        }
    }
});
