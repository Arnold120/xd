function redirectToCreateClient(e) {
	const url = new URL(window.location);
	url.pathname = "/Admin/Cliente/create.html";
	window.location.href = url.toString();
}

function editClient(row) {
	console.log("Editando el Cliente", row);
}

async function deleteClient(row) {
	const clientId = row.idCliente;
	const url = `http://localhost:5005/api/cliente/${clientId}`;
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		}
	});
	const isSuccess = response.ok;
	if (!isSuccess) {
		alert("No se pudo eliminar el cliente");
	}

	generateClientTable();
}

async function generateClientTable() {
	const columns = [
		{
			title: "Nombre",
			field: "nombre",
			type: "text",
			cellTemplate: null,
		},
        {
			title: "Apellido",
            field: "apellido",
			type: "text",
			cellTemplate: null,
		},  
		{
			title: "Acciones",
			field: "",
			type: "",
			cellTemplate: (row) => {
				const editButton = document.createElement("button");
				editButton.innerText = "Editar";
				editButton.onclick = () => editClient(row);

				const deleteButton = document.createElement("button");
				deleteButton.innerText = "Eliminar";
				deleteButton.onclick = () => deleteClient(row);

				const div = document.createElement("div");
				div.appendChild(editButton);
				div.appendChild(deleteButton);
				return div;
			},
			prefix: "",
		},
	];

	const url = "http://localhost:5005/api/cliente";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "GET",
		headers: { 
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
	});
	const rows = await response.json();
	
	createDataTable("tbl-container-Clients", columns, rows);
};

generateClientTable();