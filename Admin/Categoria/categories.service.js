async function getCategories() {
	const url = "http://localhost:5005/api/categoria";
    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const isSuccess = response.status === 200;
    if (!isSuccess) {
        alert("Error al cargar las categorias");
        return;
    }

    const categories = await response.json();
	return categories;
}