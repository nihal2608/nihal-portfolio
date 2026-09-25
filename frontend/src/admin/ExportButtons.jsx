import React from "react";
import { FileSpreadsheet, FileText } from "lucide-react";
import { exportToExcel, exportToPDF } from "../utils/export";

// <ExportButtons columns={[{header:"Title", key:"title"}, ...]} rows={projects} filename="projects" title="Projects" />
export default function ExportButtons({ columns, rows, filename, title }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportToExcel(columns, rows, filename)}
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-cyan-400/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-300"
      >
        <FileSpreadsheet size={14} /> Excel
      </button>
      <button
        onClick={() => exportToPDF(columns, rows, filename, title)}
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-cyan-400/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-300"
      >
        <FileText size={14} /> PDF
      </button>
    </div>
  );
}
