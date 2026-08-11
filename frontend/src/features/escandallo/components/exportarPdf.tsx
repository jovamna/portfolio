import { jsPDF } from 'jspdf';

// ================== INTERFACES ==================
interface IngredienteCalculado {
  id: string;
  name: string;
  priceTotalCompra: number | string;
  grossWeight: number | string;
  mermaKg: number | string;
  usedWeight: number | string;
  rendimiento: string;
  totalBrutoNecesario: string;
  faltanteBruto: string;
  faltanteBrutoGr: string;
  pesoNeto: string;
  cantidadUsada: string;
  costeTotalCompra: string;
  dineroPerdidoPorMerma: string;
  priceBrutokilo: string;
  priceKgSinMerma: string;
  faltanteSinMermaNetoKg: string;
  faltanteSinMermaNetoGr: string;
  costeRealTotal: string;
  nuevoCostePorRacion: string;
}

interface Totales {
  totalCompra: string;
  totalMermaDinero: string;
  totalPesoNeto: string;
  totalCosteRealPorRacion: string;
  beneficio: string | null;
  foodCost: string | null;
  totalGastoConReposicion: string;
  totalRendimiento: string;
  totalPrecioVentaSugeridoSinIva: string;
  totalPrecioVentaSugeridoConIva: string;
  precioFinalSinIva: string | null;
  precioFinalConIva: string | null;
}

interface PDFData {
  namePlato: string;
  raciones: number;
  precioVenta: number;
  calculatedRows: IngredienteCalculado[];
  totales: Totales;
}

// ================== FUNCIÓN ==================
export const exportarPDF = ({
  namePlato,
  raciones,
  precioVenta,
  calculatedRows,
  totales
}: PDFData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 0;

  // Colores suaves
  const azulSuave = [37, 99, 235];      // blue-600
  const azulClaro = [219, 234, 254];    // blue-100
  const grisTexto = [55, 65, 81];       // gray-700
  const grisClaro = [243, 244, 246];    // gray-100

  // ---------- HEADER SUAVE ----------
  doc.setFillColor(azulSuave[0], azulSuave[1], azulSuave[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ESCANDALLO PROFESIONAL', margin, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Informe de costes, mermas y rentabilidad', margin, 19);

  doc.setFontSize(8);
  doc.text(new Date().toLocaleDateString('es-ES'), pageWidth - margin, 12, { align: 'right' });

  // ---------- NOMBRE EMPRESA (fácil de cambiar) ----------
  y = 36;
  doc.setTextColor(azulSuave[0], azulSuave[1], azulSuave[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Tu Empresa / Restaurante', margin, y); // ← Cambia este texto cuando quieras

  // ---------- DATOS DEL PLATO ----------
  y = 46;
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(namePlato || 'Sin nombre', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(grisTexto[0], grisTexto[1], grisTexto[2]);
  doc.text(`Raciones: ${raciones}    •    Precio de venta: ${precioVenta} €`, margin, y + 6);

  // Línea suave
  doc.setDrawColor(209, 213, 219);
  doc.line(margin, y + 10, pageWidth - margin, y + 10);

  // ---------- TABLA ----------
  y = 62;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text('Desglose de Ingredientes', margin, y);

  // Cabecera tabla
  y += 5;
  doc.setFillColor(azulSuave[0], azulSuave[1], azulSuave[2]);
  doc.rect(margin, y, pageWidth - margin * 2, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');

  const col = {
    name: margin + 2,
    precio: margin + 58,
    bruto: margin + 78,
    merma: margin + 98,
    neto: margin + 116,
    usada: margin + 136,
    coste: margin + 158,
  };

  doc.text('Ingrediente', col.name, y + 5.5);
  doc.text('€/kg', col.precio, y + 5.5);
  doc.text('Bruto', col.bruto, y + 5.5);
  doc.text('Merma', col.merma, y + 5.5);
  doc.text('Neto', col.neto, y + 5.5);
  doc.text('Usada', col.usada, y + 5.5);
  doc.text('Coste', col.coste, y + 5.5);

  // Filas
  y += 9;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  calculatedRows.forEach((row, index) => {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    // Fondo alterno muy suave
    if (index % 2 === 0) {
      doc.setFillColor(grisClaro[0], grisClaro[1], grisClaro[2]);
      doc.rect(margin, y - 1.5, pageWidth - margin * 2, 7.5, 'F');
    }

    doc.setTextColor(grisTexto[0], grisTexto[1], grisTexto[2]);
    doc.text((row.name || 'Sin nombre').substring(0, 26), col.name, y + 3.5);
    doc.text(`${row.priceBrutokilo || '0.00'}`, col.precio, y + 3.5);
    doc.text(`${Number(row.grossWeight).toFixed(3)}`, col.bruto, y + 3.5);
    doc.text(`${Number(row.mermaKg).toFixed(3)}`, col.merma, y + 3.5);
    doc.text(`${row.pesoNeto || '0'}`, col.neto, y + 3.5);
    doc.text(`${row.cantidadUsada || '0'}`, col.usada, y + 3.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`${row.costeRealTotal || '0.00'} €`, col.coste, y + 3.5);
    doc.setFont('helvetica', 'normal');

    y += 7.5;
  });

  // ---------- BRUTO A COMPRAR ----------
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text('Cantidad Bruta necesaria por Ingrediente', margin, y);

  y += 6;
  doc.setFontSize(9);

  calculatedRows.forEach((row) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text(`• ${row.name || 'Sin nombre'}`, margin + 2, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`${row.totalBrutoNecesario || '0.000'} kg`, margin + 100, y);
    y += 5.5;
  });

  // ---------- RESUMEN FINANCIERO ----------
  y += 8;

  doc.setFillColor(azulSuave[0], azulSuave[1], azulSuave[2]);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 46, 2.5, 2.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('RESUMEN FINANCIERO', margin + 5, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  // Izquierda
  doc.text(`Compra inicial: ${totales.totalCompra} €`, margin + 5, y + 16);
  doc.text(`Gasto final: ${totales.totalGastoConReposicion} €`, margin + 5, y + 22);
  doc.text(`Coste por ración: ${totales.totalCosteRealPorRacion} €`, margin + 5, y + 28);
  doc.text(`Pérdida por merma: -${totales.totalMermaDinero} €`, margin + 5, y + 34);

  // Derecha
  doc.text(`Beneficio: ${totales.beneficio ?? '—'} €`, margin + 100, y + 16);
  doc.text(`P.V. sugerido (30%): ${totales.totalPrecioVentaSugeridoSinIva} €`, margin + 100, y + 22);
  doc.text(`P.V. + IVA: ${totales.totalPrecioVentaSugeridoConIva} €`, margin + 100, y + 28);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Food Cost: ${totales.foodCost ?? '—'}%`, margin + 100, y + 38);

  // ---------- PRECIO CON GASTOS FIJOS ----------
  if (totales.precioFinalSinIva) {
    y += 54;

    doc.setFillColor(azulClaro[0], azulClaro[1], azulClaro[2]);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 20, 2.5, 2.5, 'F');

    doc.setTextColor(30, 64, 175); // blue-800
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('PRECIO RECOMENDADO (gastos fijos + 20% margen)', margin + 5, y + 7);

    doc.setFontSize(11);
    doc.text(`Sin IVA: ${totales.precioFinalSinIva} €`, margin + 5, y + 15);
    doc.text(`Con IVA: ${totales.precioFinalConIva} €`, margin + 95, y + 15);
  }

  // ---------- FOOTER ----------
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      287,
      { align: 'center' }
    );
  }

  doc.save(`escandallo-${namePlato?.toLowerCase().replace(/\s+/g, '-') || 'plato'}.pdf`);
};