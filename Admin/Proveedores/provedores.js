function redirectToCreateProveedor(e) {
    const url = new URL(window.location);
    url.pathname = "/Admin/Proveedores/create.html";
    window.location.href = url.toString();
}

async function deleteProveedor(row) {
    const proveedorId = row.idProveedor;
    const url = `https://localhost:7177/api/Proveedor/${proveedorId}`;
    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        alert("Error al eliminar proveedor");
    }
    generateProveedorTable();
}

async function editProveedor(row) {
    // Llenamos los campos del formulario con los datos del proveedor
    document.getElementById("empresa").value = row.nombreEmpresa;
    document.getElementById("direccion").value = row.direccion;
    document.getElementById("telefono").value = row.telefono;
    document.getElementById("email").value = row.email;
    document.getElementById("submitButton").innerText = "Actualizar Proveedor";
    document.getElementById("proveedorId").value = row.idProveedor; // Agregamos el ID al campo oculto
}

async function generateProveedorTable() {
    const columns = [
        { title: "Empresa", field: "nombreEmpresa" },
        { title: "Dirección", field: "direccion" },
        { title: "Teléfono", field: "telefono" },
        { title: "Email", field: "email" },
        {
            title: "Acciones", field: "", cellTemplate: (row) => {
                const btnEdit = document.createElement("button");
                btnEdit.innerText = "Editar";
                btnEdit.onclick = () => editProveedor(row); // Llama a la función editProveedor para editar

                const btnDelete = document.createElement("button");
                btnDelete.innerText = "Eliminar";
                btnDelete.onclick = () => deleteProveedor(row);

                const actionsContainer = document.createElement("div");
                actionsContainer.appendChild(btnEdit);
                actionsContainer.appendChild(btnDelete);

                return actionsContainer;
            }
        }
    ];

    const url = "https://localhost:7177/api/Proveedor";
    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    createDataTable("tbl-container-Proveedores", columns, data);
}

generateProveedorTable();

async function onCreateOrUpdateProveedor(event) {
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

    const proveedorId = document.getElementById("proveedorId").value;
    const url = proveedorId 
        ? `https://localhost:7177/api/Proveedor/${proveedorId}`  // Si hay un ID, es actualización
        : "https://localhost:7177/api/Proveedor";  // Si no hay ID, es creación

    const method = proveedorId ? "PUT" : "POST"; // Dependiendo de si es edición o creación
    const token = localStorage.getItem("authToken");

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        alert("Error al crear o actualizar proveedor");
        return;
    }

    window.location.href = `${window.location.origin}/Admin/Proveedores/index.html`;
}