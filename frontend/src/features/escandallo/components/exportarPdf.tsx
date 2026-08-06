// src/utils/pdfExport.ts

import jsPDF from 'jspdf';



interface IngredienteCalculado {
  id: string;
  name: string;
  pricePerKg: string;
  grossWeight: string;
  mermaKg: string;
  usedWeight: string;
  rendimiento: string;
  brutoNecesario: string;
  faltanteBruto: string;
  faltanteBrutoGr: string;
  pesoNeto: string;
  cantidadUsada: string;
  costeTotalCompra: string;
  dineroPerdidoPorMerma: string;
  priceKgSinMerma: string;
  cantidadFaltante: string;
  cantidadFaltanteG: string;
  costeRealTotal: string;
  nuevoCostePorRacion: string;
}

interface Totales {
  totalCompra: string;
  totalMermaDinero: string;
  totalPesoNeto: string;
  totalCosteRealPorRacion: string;
  beneficio: string;
  foodCost: string;
  totalGastoConReposicion: string;
  totalRendimiento: string;
  totalPrecioVentaSugeridoSinIva: string;
  totalPrecioVentaSugeridoConIva: string;
}

interface PDFData {
  namePlato: string;
  raciones: number;
  precioVenta: number;
  calculatedRows: IngredienteCalculado[];
  totales: Totales;
}

export const exportarPDF = ({
  namePlato,
  raciones,
  precioVenta,
  calculatedRows,
  totales
}: PDFData) => {
  // Instancia de jsPDF (A4 en milímetros)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Configuración de Estilos Básicos
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(17, 24, 39); // gray-900
  doc.text("ESCANDALLO PROFESIONAL", 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // gray-500
  doc.text("Informe de costes, mermas y rentabilidad del plato", 14, 26);
  doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 31);

  // Línea divisoria decorativa
  doc.setDrawColor(229, 231, 235); // gray-200
  doc.line(14, 36, 196, 36);

  // Bloque de Configuración inicial del plato
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39);
  doc.text(`Nombre del Plato: ${namePlato}`, 14, 45);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Número de raciones: ${raciones}`, 14, 52);
  doc.text(`Precio de Venta del Plato: ${precioVenta} EUR`, 14, 58);





  // Tabla de Ingredientes
  doc.setFont("helvetica", "bold");
  doc.text("Desglose de Ingredientes", 14, 70);
  
  // Encabezados de la tabla
  doc.setFillColor(17, 24, 39); // Fondo gray-900
  doc.rect(14, 74, 182, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5); 


  // Primera línea de encabezados
  doc.text("Ingrediente", 16, 79.5);
  doc.text("Precio/Kg", 48, 79.5);
  doc.text("P. Bruto", 70, 79.5);
  doc.text("Merma", 90, 79.5);
  doc.text("P. Neto", 110, 79.5);

  // Segunda línea de encabezados
  doc.text("Cant. Usada", 132, 79.5);
  //doc.text("Bruto Nec.", 60, 87.5);
  doc.text("Faltante", 155, 79.5);
  doc.text("Coste Final.", 176, 79.5);

  // Variables internas para acumular los totales de la nueva sección
  let totalBrutoAcumulado = 0;
  let totalNetoAcumulado = 0;
  let totalUsadoAcumulado = 0;
  let totalFaltanteBrutoAcumulado = 0;




  // Filas de la tabla
  let currentY = 82;
  doc.setTextColor(55, 65, 81); // gray-700
  
  calculatedRows.forEach((row, index) => {
    // Sumamos los valores de cada fila de forma segura para los cálculos de abajo
    totalBrutoAcumulado += Number(row.grossWeight) || 0;
    totalNetoAcumulado += Number(row.pesoNeto) || 0;
    totalUsadoAcumulado += Number(row.cantidadUsada) || 0;
    
    // Si manejas el faltante bruto por fila lo sumamos, si no, se calculará abajo
    if (row.faltanteBruto) {
      totalFaltanteBrutoAcumulado += Number(row.faltanteBruto);
    }

    // Alternar color de fondo ligero para legibilidad
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251); // gray-50
      doc.rect(14, currentY, 182, 8, "F");
    }
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8); // 🆕 coherente con el header
    //PRIMERA LINEA DE DATOS
    doc.text(row.name || "Sin nombre", 16, currentY + 5.5);
    doc.text(`${row.pricePerKg || '0.00'}€`, 48, currentY + 5.5);
    doc.text(`${row.grossWeight || '0'} kg`, 70, currentY + 5.5);
    doc.text(`${row.mermaKg || '0'} kg`, 90, currentY + 5.5);
    doc.text(`${row.pesoNeto || '0'} kg`, 110, currentY + 5.5);
    doc.text(`${row.cantidadUsada || '0'} kg`, 132, currentY + 5.5);
   
    
    const faltanteTexto = `${row.cantidadFaltante || '0'} kg`;
    doc.text(faltanteTexto, 155, currentY + 5.5);
    
    doc.setFont("helvetica", "bold");
    doc.text(`${row.costeRealTotal || '0.00'}€`, 176, currentY + 5.5);
    
    currentY += 8;
  });





  // ==========================================
// 🆕 LISTA: Bruto Necesario por Ingrediente
// ==========================================
currentY += 6; // pequeño respiro después de la tabla

doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(17, 24, 39);
doc.text("Cantidad Total en Bruto a Comprar por Ingrediente", 14, currentY);
currentY += 6;

doc.setFontSize(9);
calculatedRows.forEach((row) => {
  doc.setFont("helvetica", "normal");
  doc.setTextColor(75, 85, 99);
  doc.text(`• ${row.name || "Sin nombre"}:`, 16, currentY);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(17, 24, 39);
  doc.text(`${row.brutoNecesario} kg`, 90, currentY);

  currentY += 6; // una línea por ingrediente
});

currentY += 4; // respiro antes del resumen financiero











  // Cuadro de Resumen Final Financiero
  currentY += 8;
  doc.setFillColor(31, 41, 55); // gray-800
  doc.rect(14, currentY, 182, 38, "F");

  doc.setTextColor(251, 191, 36); // Amber-400
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("RESUMEN FINANCIERO DEL PLATO", 20, currentY + 8);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Compra Inicial: ${totales.totalCompra} EUR`, 20, currentY + 16);
  doc.text(`Gasto Final Total: ${totales.totalGastoConReposicion} EUR`, 20, currentY + 22);
  doc.text(`P.V. Sugerido Sin Iva Final: ${totales.totalPrecioVentaSugeridoSinIva} EUR`, 20, currentY + 28);
  doc.text(`P.V. Sugerido Con Iva Final: ${totales.totalPrecioVentaSugeridoConIva} EUR`, 20, currentY + 34);

  doc.text(`Dinero Perdido (Mermas): -${totales.totalMermaDinero} EUR`, 110, currentY + 16);
  doc.setFont("helvetica", "bold");
  doc.text(`Beneficio por Plato: ${totales.beneficio} EUR`, 110, currentY + 22);
  doc.text(`Coste por Ración: ${totales.totalCosteRealPorRacion} EUR`, 110, currentY + 28);
  
  doc.setTextColor(251, 191, 36); // Amber
  doc.setFontSize(14);
  doc.text(`Food Cost: ${totales.foodCost}%`, 110, currentY + 36);

  // ⭐ SECCIÓN TÉCNICA CORREGIDA (Calculada de forma interna y segura)
  currentY += 46; 

  // Cálculos basados en los acumulados de la tabla para evitar errores de variables externas
  const rendimientoPorcentaje = totalBrutoAcumulado > 0 ? (totalNetoAcumulado / totalBrutoAcumulado) * 100 : 0;
  const cantidadFaltanteKg = Math.max(0, totalUsadoAcumulado - totalNetoAcumulado);
  const cantidadFaltanteGr = cantidadFaltanteKg * 1000;

  // Si calculas el bruto necesario general, usamos tus variables; si no, hacemos el cálculo estimado seguro
  const finalFaltanteBruto = totalFaltanteBrutoAcumulado > 0 
    ? totalFaltanteBrutoAcumulado 
    : (rendimientoPorcentaje > 0 ? (cantidadFaltanteKg / (rendimientoPorcentaje / 100)) : 0);
  const finalFaltanteBrutoGr = finalFaltanteBruto * 1000;




  // Título de la nueva sección técnica
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39); // gray-900
  doc.text("Análisis Técnico de Mermas y Gestión de Pedidos", 14, currentY);

  // Línea sutil de separación
  doc.setDrawColor(243, 244, 246); // gray-100
  doc.line(14, currentY + 2, 196, currentY + 2);

  // Contenido del Análisis
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(75, 85, 99); // gray-600

  // Columna Izquierda: Rendimiento y cantidad neta faltante
  doc.text(`Rendimiento Promedio de la Materia Prima:`, 14, currentY + 9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129); // Verde Éxito
  doc.text(`${rendimientoPorcentaje.toFixed(2)}% del peso bruto inicial`, 14, currentY + 14);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(75, 85, 99);
  doc.text(`Déficit de Cantidad Neta para la Receta:`, 14, currentY + 24);
  doc.setFont("helvetica", "bold");
  doc.text(`${cantidadFaltanteKg.toFixed(3)} kg (${cantidadFaltanteGr.toFixed(0)} gr)`, 14, currentY + 29);

  // Columna Derecha: Previsión logística para el proveedor
  doc.setFont("helvetica", "bold");
  doc.setTextColor(75, 85, 99);
  doc.text(`Total de todos los Productos Bruto que falta:`, 110, currentY + 9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(220, 38, 38); // Rojo Advertencia
  doc.text(`+ ${finalFaltanteBruto.toFixed(3)} kg (${finalFaltanteBrutoGr.toFixed(0)} gr) mínimos`, 110, currentY + 14);




  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128); // gray-500
  doc.setFontSize(8.5);
  doc.text("*Cálculos estimados basados en los factores de merma registrados por ingrediente.", 14, currentY + 38);

  // Descarga automática
  doc.save(`escandallo-${Date.now()}.pdf`);
};