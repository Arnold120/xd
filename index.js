const nombreElemento = document.getElementById("usuarioNombre");
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || '{}');

if (nombreElemento && usuarioActual?.nombreUsuario) {
    nombreElemento.textContent = `Usuario: ${usuarioActual.nombreUsuario}`;
}

const botonCerrarSesion = document.getElementById("cerrarSesion");
if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("usuarioActual");
        localStorage.removeItem("authToken"); 
        alert("Sesión cerrada.");
        window.location.href = "../../Auth/login.html";
    });
}