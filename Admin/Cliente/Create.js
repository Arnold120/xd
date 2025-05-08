async function onCreateClient(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const client = Object.fromEntries(formData.entries());

	const body = {
		Nombre: client.name,
        Apellido: client.apellidoId
	};

    const url = "http://localhost:5005/api/cliente";
    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (response.status !== 200) {
        alert("Error al crear el producto");
        return;
    }

    const productsUrl = `${window.location.origin}/Admin/Cliente/Create.html`;
    window.location.href = productsUrl;
}