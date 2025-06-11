import react from "react";
import * as XLSX from 'xlsx';

export default function exportToExcel(jsonData, fileName) {
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(jsonData);
    
    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
    // Export the file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  