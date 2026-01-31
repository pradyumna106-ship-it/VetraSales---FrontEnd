export const exportToCSV = (data, filename) => {
    if (!data || !data.length) {
        alert("No data to export");
        return;
    }

    // Get headers from the first object keys
    const headers = Object.keys(data[0]);

    // Create CSV rows
    const csvRows = [
        headers.join(","), // Header row
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Handle strings with commas or quotes
                const escapedValue = ('' + (value ?? '')).replace(/"/g, '""');
                return `"${escapedValue}"`;
            }).join(",")
        )
    ];

    const csvContent = csvRows.join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
