async function onCreateProveedor(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	const body = {
		nombreEmpresa: data.empresa,
		direccion: data.direccion,
		telefono: data.telefono,
		email: data.email,
	};

	const url = "https://localhost:7177/api/Proveedor";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		alert("Error al crear proveedor");
		return;
	}

	window.location.href = `${window.location.origin}/Admin/Proveedores/index.html`;
}