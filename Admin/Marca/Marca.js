document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("brandForm").onsubmit = createBrand;
	generateBrandTable();
  });
  
  async function createBrand(event) {
	event.preventDefault();
	const name = document.getElementById("name").value;
  
	const body = {
	  nombreMarca: name,
	  activo: true,
	  fechaRegistro: new Date(),
	};
  
	const url = "http://localhost:5005/api/marca";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	  },
	  body: JSON.stringify(body),
	});
  
	if (response.ok) {
	  alert("Marca creada correctamente");
	  generateBrandTable();
	  resetForm();
	} else {
	  alert("Error al crear la marca");
	}
  }
  
  function editBrand(row) {
	console.log("Editando la marca", row);
  
	document.getElementById("name").value = row.nombreMarca;
	document.getElementById("brandId").value = row.idMarca;
  
	document.getElementById("submitButton").innerText = "Guardar Cambios";
  
	const form = document.getElementById("brandForm");
	form.onsubmit = (e) => updateBrand(e, row.idMarca);
  }

async function updateBrand(event, brandId) {
    event.preventDefault();
    const name = document.getElementById("name").value;

    const body = {
        idMarca: Number(brandId),
        nombreMarca: name,
        activo: true,
        fechaRegistro: new Date().toISOString()
    };

    const url = `http://localhost:5005/api/marca/${brandId}`;
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Datos inválidos");
        }

        alert("¡Marca actualizada con éxito!");
        generateBrandTable();
        resetForm();
    } catch (error) {
        console.error("Error completo:", error);
        alert(`Error: ${error.message}`);
    }
}
  
  async function deleteBrand(row) {
	const brandId = row.idMarca;
	const url = `http://localhost:5005/api/marca/${brandId}`;
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
	  method: "DELETE",
	  headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	  },
	});
  
	if (response.ok) {
	  alert("Marca eliminada correctamente");
	  generateBrandTable();
	} else {
	  alert("No se pudo eliminar la marca");
	}
  }
  
  async function generateBrandTable() {
	const columns = [
	  {
		title: "Nombre",
		field: "nombreMarca",
		type: "text",
	  },
	  {
		title: "Fecha de Registro",
		field: "fechaRegistro",
		type: "date",
	  },
	  {
		title: "Acciones",
		field: "",
		type: "",
		cellTemplate: (row) => {
		  const editButton = document.createElement("button");
		  editButton.innerText = "Editar";
		  editButton.onclick = () => editBrand(row);
  
		  const deleteButton = document.createElement("button");
		  deleteButton.innerText = "Eliminar";
		  deleteButton.onclick = () => deleteBrand(row);
  
		  const div = document.createElement("div");
		  div.appendChild(editButton);
		  div.appendChild(deleteButton);
		  return div;
		},
	  },
	];
  
	const url = "http://localhost:5005/api/marca";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
	  method: "GET",
	  headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	  },
	});
	const rows = await response.json();
  
	createDataTable("tbl-container-brands", columns, rows);
  }
  
  function resetForm() {
	document.getElementById("name").value = "";
	document.getElementById("brandId").value = "";
	document.getElementById("submitButton").innerText = "Crear Marca";
  
	const form = document.getElementById("brandForm");
	form.onsubmit = createBrand;
  }