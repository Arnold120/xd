async function iniciarSesion(event) {
	event.preventDefault();

	const form = event.target;
	const formData = new FormData(form);
	const username = formData.get("username");
	const password = formData.get("password");

	console.log("Email:", username);
	console.log("Password:", password);

	const body = {
		nombreUsuario: username,
		contraseña: password,
	};

	try {
		const url = "http://localhost:5005/api/usuario/autenticar";
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		const json = await response.json();
        if(response.status === 400) {
            throw new Error();
        }

		console.log(json);
		localStorage.setItem("authToken", json.token);
        window.location.href = "../index.html";
	} catch (error) {
        alert("Ingrese una contraseña o un usuario valido para iniciar sesión")
    }
}
