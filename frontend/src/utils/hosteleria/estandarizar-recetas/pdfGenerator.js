

import {jsPDF} from 'jspdf';
//import autoTable from 'jspdf-autotable';
import { ALERGENOS, calcularCosteTotal, calcularRentabilidad, fmtEur, fmtPct } from './fichaUtils';

const MARGIN = 14;
const PAGE_WIDTH = 210; // A4 mm

/**
 * Genera y descarga el PDF de la ficha técnica.
 * Todo ocurre en el navegador del usuario — no se envía nada a ningún servidor.
 */
export function generarPDF(ficha) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  // ── Cabecera ──────────────────────────────────────────────────────────────
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text(ficha.nombrePlato || 'Ficha técnica', MARGIN, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(120);
  doc.text('Ficha técnica de cocina', MARGIN, y);
  y += 8;
  doc.setTextColor(0);

  // ── Datos generales ───────────────────────────────────────────────────────
  doc.setFontSize(10);

  const formatManoObra = (valor) => {
    if (!valor) return '—';
    const texto = String(valor).trim();
    // Si ya incluye la palabra "colaborador" o "colaboradores", lo dejamos tal cual
    if (texto.toLowerCase().includes('colaborador')) {
      return texto;
    }
    // Si solo puso un número (ej: 1 o 5)
    return `${texto} ${Number(texto) === 1 ? 'colaborador' : 'colaboradores'}`;
  };


  const datos = [
    ['Tiempo de elaboración', ficha.tiempoElaboracion || '—'],
    ['Temperatura de servicio', ficha.temperaturaLabel || '—'],
    ['Mano de Obra', formatManoObra(ficha.ManodeObra)],
    ['Utensilios Usados', ficha.maquinaria || '—'],
  ];
  datos.forEach(([label, value]) => {
    doc.setFont(undefined, 'bold');
    doc.text(`${label}:`, MARGIN, y);
    doc.setFont(undefined, 'normal');
    doc.text(value, MARGIN + 48, y);
    y += 6;
  });
  y += 2;

  // ── Alérgenos ─────────────────────────────────────────────────────────────
  const alergenosActivos = ALERGENOS.filter((a) => ficha.alergenos.includes(a.id));
  doc.setFont(undefined, 'bold');
  doc.text('Alérgenos:', MARGIN, y);
  doc.setFont(undefined, 'normal');
  const alergenosTexto = alergenosActivos.length
    ? alergenosActivos.map((a) => a.label).join(', ')
    : 'Ninguno declarado';
  const alergenosLines = doc.splitTextToSize(alergenosTexto, PAGE_WIDTH - 2 * MARGIN - 48);
  doc.text(alergenosLines, MARGIN + 48, y);
  y += alergenosLines.length * 5 + 6;

  // ── Tabla de ingredientes ────────────────────────────────────────────────
  








  // ── 📊 TABLA DE INGREDIENTES NATIVA (Sin plugins externos) ──────────────────
  // 1. Dibujamos el fondo azul de la cabecera
  doc.setFillColor(24, 95, 165); 
  doc.rect(MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 7, 'F'); 
  
  // 2. Ponemos los textos de la cabecera en blanco
  doc.setTextColor(255); 
  doc.setFont(undefined, 'bold');
  doc.setFontSize(9);
  doc.text('Ingrediente', MARGIN + 2, y + 5);
  doc.text('Cantidad', MARGIN + 80, y + 5);
  doc.text('Coste', MARGIN + 120, y + 5);
  doc.text('Proveedor', MARGIN + 150, y + 5);
  
  y += 7; // Bajamos el cursor debajo de la cabecera
  doc.setTextColor(0); // Volvemos a texto negro para los datos
  doc.setFont(undefined, 'normal');

  // 3. Recorremos las filas pintándolas línea por línea en milímetros
  ficha.ingredientes.forEach((ing) => {
    if (y > 270) { // Si se acaba la hoja, saltamos de página
      doc.addPage();
      y = MARGIN;
    }
    
    // Pintamos los valores en las columnas fijas correspondientes
    doc.text(ing.nombre || '—', MARGIN + 2, y + 5);
    doc.text(`${ing.cantidad || 0} ${ing.unidad}`, MARGIN + 80, y + 5);
    doc.text(fmtEur(ing.coste), MARGIN + 120, y + 5);
    doc.text(ing.proveedor || '—', MARGIN + 150, y + 5);
    
    // Dibujamos una línea fina gris debajo de cada ingrediente
    doc.setDrawColor(220);
    doc.line(MARGIN, y + 7, PAGE_WIDTH - MARGIN, y + 7);
    
    y += 7; // Avanzamos el espacio vertical para el siguiente ingrediente
  });

  y += 6; // Este es el margen de separación antes del bloque de resumen de costes









  // ── Resumen de costes ─────────────────────────────────────────────────────
  const costeTotal = calcularCosteTotal(ficha.ingredientes);
  const rent = calcularRentabilidad(costeTotal, ficha.pvp);

  doc.setFillColor(247, 247, 245);
  doc.rect(MARGIN, y, PAGE_WIDTH - 2 * MARGIN, rent ? 22 : 14, 'F');
  y += 6;
  doc.setFont(undefined, 'bold');
  doc.setFontSize(10);
  doc.text(`Coste total: ${fmtEur(costeTotal)}`, MARGIN + 4, y);
  if (rent) {
    doc.text(`PVP: ${fmtEur(rent.pvp)}`, MARGIN + 70, y);
    doc.text(`Food cost: ${fmtPct(rent.foodCostPct)}`, MARGIN + 120, y);
    y += 7;
    doc.setFont(undefined, 'normal');
    doc.text(`Margen bruto: ${fmtEur(rent.margen)} (${fmtPct(rent.margenPct)})`, MARGIN + 4, y);
  }
  y += 12;
  doc.setFont(undefined, 'normal');

  // ── Salto de página si hace falta ───────────────────────────────────────
  const checkPageBreak = (needed) => {
    if (y + needed > 280) {
      doc.addPage();
      y = MARGIN;
    }
  };

  // ── Preparación ───────────────────────────────────────────────────────────
  checkPageBreak(20);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Preparación', MARGIN, y);
  y += 7;
  doc.setFontSize(9.5);

  ficha.pasos.forEach((paso, i) => {
    if (!paso.texto.trim()) return;
    const lineas = doc.splitTextToSize(`${i + 1}. ${paso.texto}`, PAGE_WIDTH - 2 * MARGIN);
    checkPageBreak(lineas.length * 5 + 3);
    doc.setFont(undefined, 'normal');
    doc.text(lineas, MARGIN, y);
    y += lineas.length * 5 + 3;
  });
  y += 4;

  // ── Emplatado ─────────────────────────────────────────────────────────────
 // ── Emplatado ─────────────────────────────────────────────────────────────
checkPageBreak(20);
doc.setFontSize(12);
doc.setFont(undefined, 'bold');
doc.text('Emplatado', MARGIN, y);
y += 7;

if (ficha.emplatado.descripcion?.trim()) {
  doc.setFontSize(9.5);
  doc.setFont(undefined, 'normal');
  const lineas = doc.splitTextToSize(ficha.emplatado.descripcion, PAGE_WIDTH - 2 * MARGIN);
  checkPageBreak(lineas.length * 5);
  doc.text(lineas, MARGIN, y);
  y += lineas.length * 5 + 6;
}

// Imagen de emplatado (versión mejorada)
if (ficha.emplatado.imagen) {
  try {
    const imgProps = doc.getImageProperties(ficha.emplatado.imagen);
    
    let imgWidth = 88;   // mm (ancho recomendado)
    let imgHeight = (imgProps.height / imgProps.width) * imgWidth;

    // Evitar que la imagen sea demasiado alta (que se salga de la página)
    const maxHeight = 165;
    if (imgHeight > maxHeight) {
      imgHeight = maxHeight;
      imgWidth = (imgProps.width / imgProps.height) * imgHeight;
    }

    checkPageBreak(imgHeight + 12);

    // Detectar si es PNG o JPEG
    const isPng = ficha.emplatado.imagen.startsWith('data:image/png');

    doc.addImage(
      ficha.emplatado.imagen,
      isPng ? 'PNG' : 'JPEG',   // Respeta el formato
      MARGIN,
      y,
      imgWidth,
      imgHeight,
      undefined,
      'MEDIUM'                  // Compresión media
    );

    y += imgHeight + 10;
  } catch (err) {
    console.warn('No se pudo incrustar la imagen de emplatado:', err);
  }
}
  // ── Pie de página ─────────────────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text(
      `Generado con jovamnamedina.com/ficha-tecnica · ${new Date().toLocaleDateString('es-ES')}`,
      MARGIN,
      292
    );
    doc.text(`Página ${i} de ${pageCount}`, PAGE_WIDTH - MARGIN - 20, 292);
  }

  // ── Descarga ──────────────────────────────────────────────────────────────
  const nombreArchivo = (ficha.nombrePlato || 'ficha-tecnica')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  doc.save(`${nombreArchivo || 'ficha-tecnica'}.pdf`);
}
