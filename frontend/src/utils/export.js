import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// rows: array of plain objects. columns: [{ header: "Name", key: "name" }, ...]

export function exportToExcel(columns, rows, filename) {
  const data = rows.map((row) =>
    Object.fromEntries(columns.map((col) => [col.header, row[col.key] ?? ""]))
  );
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

export function exportToPDF(columns, rows, filename, title) {
  const doc = new jsPDF();
  if (title) {
    doc.setFontSize(14);
    doc.text(title, 14, 15);
  }
  autoTable(doc, {
    startY: title ? 22 : 14,
    head: [columns.map((c) => c.header)],
    body: rows.map((row) => columns.map((c) => String(row[c.key] ?? ""))),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [34, 211, 238] },
  });
  doc.save(`${filename}.pdf`);
}
