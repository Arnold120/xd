function verificarSesion() {
    const token = localStorage.getItem('authToken') ?? '';
    if (!token) {
        alert("Debes iniciar sesión para acceder a esta página.");
        const url = `${window.location.origin}/auth/login.html`;
        window.location.href = url;
    }
}

verificarSesion();