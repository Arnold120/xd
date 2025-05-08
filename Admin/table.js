function createDataTable(containerId, columns, rows) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const tableRow = document.createElement("tr");

    for (const column of columns) {
        tableRow.innerHTML += `<th>${column.title}</th>`;
    }
    thead.appendChild(tableRow);

    const tbody = document.createElement("tbody");
    const getValue = (row, column) => {
        // row => { key: value }
        const rawValue = row[column.field];
        switch (column.type) {
            case "text":
            case "numeric":
                return String(rawValue);
            case "currency":
                return `C$ ${rawValue}`;
            case "date":
                return new Date(rawValue).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })
        
            default: return rawValue;
        }
    };

    for (const row of rows) {
        const trow = document.createElement("tr");
        for (const column of columns) {
            const td = document.createElement("td"); 

            if(column.cellTemplate) {
                const cellTemplate = column.cellTemplate;
                const template = cellTemplate(row, column, getValue(row, column));
                if(typeof template === "string") {
                    td.innerHTML = template;
                } else if(template instanceof HTMLElement) {
                    td.appendChild(template);
                }
            } else {
                const value = getValue(row, column);
                td.innerHTML = value;
            }

            trow.appendChild(td);
        }

        tbody.appendChild(trow);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    container.appendChild(table);
}