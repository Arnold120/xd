async function onCreateProduct(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const product = Object.fromEntries(formData.entries());

	const body = {
		idMarca: product.brandId,
		idCategoria: product.categoryId,
		nombreProducto: product.name,
		precioUnidad: product.unitPrice,
        activo: true,
        fechaRegistro: new Date()
	};

    const url = "http://localhost:5005/api/producto";
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

    const productsUrl = `${window.location.origin}/Admin/Producto/index.html`;
    window.location.href = productsUrl;
}

async function loadCategories() {
    const categories = await getCategories();
    const select = document.querySelector("#category");
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const option = document.createElement("option");
        option.value = category.idCategoria;
        option.textContent = category.nombreCategoria;

        select.appendChild(option);
    }
}

loadCategories();

async function loadBrands() {
    const brands = await getBrands();
    const select = document.querySelector("#brand");
    for (let i = 0; i < brands.length; i++) {
        const brand = brands[i];
        const option = document.createElement("option");
        option.value = brand.idMarca;
        option.textContent = brand.nombreMarca;

        select.appendChild(option);
    }
}
loadBrands();