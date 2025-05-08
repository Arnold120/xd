function redirectToCreateProduct(e) {
	const url = new URL(window.location);
	url.pathname = "/admin/producto/create.html";
	window.location.href = url.toString();
}

function editProduct(row) {
	console.log("Editando el producto", row);
}

async function deleteProduct(row) {
	const productId = row.idProducto;
	const url = `http://localhost:5005/api/producto/${productId}`;
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
		alert("No se pudo eliminar el producto");
	}

	generateProductTable();
}

async function generateProductTable() {
	const categories = await getCategories();
	const brands = await getBrands();

	const columns = [
		{
			title: "Nombre",
			field: "nombreProducto",
			type: "text",
			cellTemplate: null,
		},
		{
			title: "Categoria",
			field: "idCategoria",
			type: "numeric",
			cellTemplate: (row, column, value) => {
				const categoryId = Number(value);
				const category = categories.find((cat) => cat.idCategoria === categoryId);
				const categoryName = category === undefined ? "Unknown" : category.nombreCategoria;
				const span = document.createElement("span");
				span.innerText = categoryName;
				return span;
			},
			prefix: "",
		},
		{
			title: "Marca",
			field: "idMarca",
			type: "numeric",
			cellTemplate: (row, column, value) => {
				const brandId = Number(value);
				const brand = brands.find((cat) => cat.idMarca === brandId);
				const brandName = brand === undefined ? "Unknown" : brand.nombreMarca;
				const span = document.createElement("span");
				span.innerText = brandName;
				return span;
			},
			prefix: "",
		},
		{
			title: "Precio",
			field: "precioUnidad",
			type: "currency",
			cellTemplate: null,
			prefix: "",
		},
		{
			title: "Fecha de Creación",
			field: "fechaRegistro",
			type: "date",
			cellTemplate: null,
			prefix: "",
		},
		{
			title: "Acciones",
			field: "",
			type: "",
			cellTemplate: (row) => {
				const editButton = document.createElement("button");
				editButton.innerText = "Editar";
				editButton.onclick = () => editProduct(row);

				const deleteButton = document.createElement("button");
				deleteButton.innerText = "Eliminar";
				deleteButton.onclick = () => deleteProduct(row);

				const div = document.createElement("div");
				div.appendChild(editButton);
				div.appendChild(deleteButton);
				return div;
			},
			prefix: "",
		},
	];

	const url = "http://localhost:5005/api/producto";
	const token = localStorage.getItem("authToken");
	const response = await fetch(url, {
		method: "GET",
		headers: { 
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
	});
	const rows = await response.json();
	
	createDataTable("tbl-container-products", columns, rows);
};

generateProductTable();