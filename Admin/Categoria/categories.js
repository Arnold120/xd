(() => {
    const columns = [
		{
			title: "Nombre",
			field: "name",
			type: "text",
			cellTemplate: null,
			prefix: "",
		},
		{
			title: "Descripcion",
			field: "description",
			type: "text",
			cellTemplate: null,
			prefix: "",
		},
	];
    const rows = [
        { name: "Categoria 1", description: "Informacion de la categoria 1" },
        { name: "Categoria 2", description: "Informacion de la categoria 2" },
        { name: "Categoria 3", description: "Informacion de la categoria 3" },
    ];
    createDataTable("tbl-container-categories", columns, rows);
})()