import { jsPDF } from 'jspdf';
import { ALERGENOS, calcularCosteTotal, calcularRentabilidad, fmtEur, fmtPct } from './fichaUtils';

const MARGIN = 14;
const PAGE_WIDTH = 210;

export function generarPDF(ficha) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = 0;

  // Colores
  const azul = [37, 99, 235];       // blue-600
  const azulClaro = [219, 234, 254]; // blue-100
  const grisTexto = [55, 65, 81];
  const grisClaro = [243, 244, 246];





  const checkPageBreak = (needed) => {
    if (y + needed > 275) {
      doc.addPage();
      y = MARGIN;
    }
  };

  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text('Preparación', MARGIN, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...grisTexto);

  ficha.pasos?.forEach((paso, i) => {
    if (!paso.texto?.trim()) return;
    const lineas = doc.splitTextToSize(`${i + 1}. ${paso.texto}`, PAGE_WIDTH - 2 * MARGIN);
    checkPageBreak(lineas.length * 5 + 3);
    doc.text(lineas, MARGIN, y);
    y += lineas.length * 5 + 3;
  });

  y += 6;








  // ─── HEADER ───────────────────────────────────────────────
  doc.setFillColor(...azul);
  doc.rect(0, 0, PAGE_WIDTH, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(ficha.nombrePlato || 'Ficha Técnica', MARGIN, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Ficha técnica de cocina · Estandarización de recetas', MARGIN, 19);

  doc.setFontSize(8);
  doc.text(new Date().toLocaleDateString('es-ES'), PAGE_WIDTH - MARGIN, 12, { align: 'right' });

  y = 34;

  // ─── DATOS GENERALES ──────────────────────────────────────
  const formatManoObra = (valor) => {
    if (!valor) return '—';
    const texto = String(valor).trim();
    if (texto.toLowerCase().includes('colaborador')) return texto;
    return `${texto} ${Number(texto) === 1 ? 'colaborador' : 'colaboradores'}`;
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '—';
    try {
      const [year, month, day] = fecha.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return fecha;
    }
  };

  const categoriaLabel = ficha.categoria
    ? ficha.categoria.charAt(0).toUpperCase() + ficha.categoria.slice(1)
    : '—';

  // Caja de datos
  doc.setFillColor(...grisClaro);
  doc.roundedRect(MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 38, 2, 2, 'F');

  doc.setTextColor(...grisTexto);
  doc.setFontSize(9);

  const col1 = MARGIN + 4;
  const col2 = MARGIN + 105;

  // Columna izquierda
  doc.setFont('helvetica', 'bold');
  doc.text('Fecha:', col1, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.text(formatFecha(ficha.fecha), col1 + 28, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.text('Tiempo:', col1, y + 14);
  doc.setFont('helvetica', 'normal');
  doc.text(ficha.tiempoElaboracion || '—', col1 + 28, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.text('Temperatura:', col1, y + 21);
  doc.setFont('helvetica', 'normal');
  doc.text(ficha.temperaturaLabel || '—', col1 + 28, y + 21);

  doc.setFont('helvetica', 'bold');
  doc.text('Categoría:', col1, y + 28);
  doc.setFont('helvetica', 'normal');
  doc.text(categoriaLabel, col1 + 28, y + 28);

  // Columna derecha
  doc.setFont('helvetica', 'bold');
  doc.text('Raciones:', col2, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.text(String(ficha.raciones || '—'), col2 + 28, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.text('Mano de obra:', col2, y + 14);
  doc.setFont('helvetica', 'normal');
  doc.text(formatManoObra(ficha.ManodeObra), col2 + 32, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.text('Utensilios:', col2, y + 21);
  doc.setFont('helvetica', 'normal');
  const utensiliosLines = doc.splitTextToSize(ficha.maquinaria || '—', 70);
  doc.text(utensiliosLines, col2 + 28, y + 21);

  y += 46;

  // ─── ALÉRGENOS ────────────────────────────────────────────
  const alergenosActivos = ALERGENOS.filter((a) => ficha.alergenos?.includes(a.id));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text('Alérgenos', MARGIN, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...grisTexto);
  const alergenosTexto = alergenosActivos.length
    ? alergenosActivos.map((a) => a.label).join(', ')
    : 'Ninguno declarado';
  const alergenosLines = doc.splitTextToSize(alergenosTexto, PAGE_WIDTH - 2 * MARGIN);
  doc.text(alergenosLines, MARGIN, y);
  y += alergenosLines.length * 5 + 6;

  // ─── TABLA DE INGREDIENTES ────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text('Ingredientes', MARGIN, y);
  y += 5;

  // Cabecera
  doc.setFillColor(...azul);
  doc.rect(MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 7, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Ingrediente', MARGIN + 2, y + 5);
  doc.text('Cantidad', MARGIN + 85, y + 5);
  doc.text('Coste', MARGIN + 120, y + 5);
  doc.text('Proveedor', MARGIN + 150, y + 5);

  y += 8;
  doc.setTextColor(...grisTexto);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);

  ficha.ingredientes?.forEach((ing, index) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }

    if (index % 2 === 0) {
      doc.setFillColor(...grisClaro);
      doc.rect(MARGIN, y - 1.5, PAGE_WIDTH - 2 * MARGIN, 7, 'F');
    }

    doc.text((ing.nombre || '—').substring(0, 38), MARGIN + 2, y + 3.5);
    doc.text(`${ing.cantidad || 0} ${ing.unidad || ''}`, MARGIN + 85, y + 3.5);
    doc.text(fmtEur(ing.coste), MARGIN + 120, y + 3.5);
    doc.text((ing.proveedor || '—').substring(0, 18), MARGIN + 150, y + 3.5);

    y += 7;
  });

  y += 6;



















// ─── RECETA ESCALADA (si existe) ─────────────────────────────
if (ficha.ingredientesEscalados && ficha.ingredientesEscalados.length > 0) {
  y += 4;
  checkPageBreak(30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text(
    `Receta escalada a ${ficha.racionesEscaladas || '—'} raciones`,
    MARGIN,
    y
  );
  y += 6;

  // Cabecera
  doc.setFillColor(37, 99, 235);
  doc.rect(MARGIN, y, PAGE_WIDTH - 2 * MARGIN, 7, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Ingrediente', MARGIN + 2, y + 5);
  doc.text('Original', MARGIN + 90, y + 5);
  doc.text('Escalado', MARGIN + 140, y + 5);

  y += 8;
  doc.setTextColor(55, 65, 81);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);

  ficha.ingredientesEscalados.forEach((ing, index) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }

    if (index % 2 === 0) {
      doc.setFillColor(243, 244, 246);
      doc.rect(MARGIN, y - 1.5, PAGE_WIDTH - 2 * MARGIN, 7, 'F');
    }

    doc.text((ing.nombre || '—').substring(0, 40), MARGIN + 2, y + 3.5);
    doc.text(`${ing.cantidad || 0} ${ing.unidad || ''}`, MARGIN + 90, y + 3.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text(
      `${Number(ing.cantidadEscalada || 0).toFixed(2)} ${ing.unidad || ''}`,
      MARGIN + 140,
      y + 3.5
    );
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);

    y += 7;
  });

  y += 6;
}























  // ─── RESUMEN DE COSTES ────────────────────────────────────
  const costeTotal = calcularCosteTotal(ficha.ingredientes || []);
  const rent = calcularRentabilidad(costeTotal, ficha.pvp);

  doc.setFillColor(...azul);
  doc.roundedRect(MARGIN, y, PAGE_WIDTH - 2 * MARGIN, rent ? 28 : 14, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Coste total: ${fmtEur(costeTotal)}`, MARGIN + 5, y + 8);

  if (rent) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`PVP: ${fmtEur(rent.pvp)}`, MARGIN + 5, y + 15);
    doc.text(`Food cost: ${fmtPct(rent.foodCostPct)}`, MARGIN + 70, y + 15);
    doc.text(`Margen: ${fmtEur(rent.margen)} (${fmtPct(rent.margenPct)})`, MARGIN + 5, y + 22);
  }

  y += rent ? 36 : 20;

  // ─── PREPARACIÓN ──────────────────────────────────────────
  //const checkPageBreak = (needed) => {
  //  if (y + needed > 275) {
  //    doc.addPage();
   //   y = MARGIN;
   // }
 // };

  //checkPageBreak(20);
  //doc.setFont('helvetica', 'bold');
 // doc.setFontSize(12);
 // doc.setTextColor(17, 24, 39);
 // doc.text('Preparación', MARGIN, y);
 // y += 7;

//  doc.setFont('helvetica', 'normal');
 // doc.setFontSize(9.5);
 // doc.setTextColor(...grisTexto);

 // ficha.pasos?.forEach((paso, i) => {
 //   if (!paso.texto?.trim()) return;
  //  const lineas = doc.splitTextToSize(`${i + 1}. ${paso.texto}`, PAGE_WIDTH - 2 * MARGIN);
 //   checkPageBreak(lineas.length * 5 + 3);
//    doc.text(lineas, MARGIN, y);
  //  y += lineas.length * 5 + 3;
 // });

  //y += 6;

  // ─── EMPLATADO ────────────────────────────────────────────
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text('Emplatado', MARGIN, y);
  y += 7;

  if (ficha.emplatado?.descripcion?.trim()) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...grisTexto);
    const lineas = doc.splitTextToSize(ficha.emplatado.descripcion, PAGE_WIDTH - 2 * MARGIN);
    checkPageBreak(lineas.length * 5);
    doc.text(lineas, MARGIN, y);
    y += lineas.length * 5 + 6;
  }

  // Imagen de emplatado
  if (ficha.emplatado?.imagen) {
    try {
      const imgProps = doc.getImageProperties(ficha.emplatado.imagen);
      let imgWidth = 90;
      let imgHeight = (imgProps.height / imgProps.width) * imgWidth;

      if (imgHeight > 120) {
        imgHeight = 120;
        imgWidth = (imgProps.width / imgProps.height) * imgHeight;
      }

      checkPageBreak(imgHeight + 10);

      const isPng = ficha.emplatado.imagen.startsWith('data:image/png');
      doc.addImage(
        ficha.emplatado.imagen,
        isPng ? 'PNG' : 'JPEG',
        MARGIN,
        y,
        imgWidth,
        imgHeight,
        undefined,
        'MEDIUM'
      );
      y += imgHeight + 8;
    } catch (err) {
      console.warn('No se pudo incrustar la imagen:', err);
    }
  }

  // ─── FOOTER ───────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(
      `Generado con jovamnamedina.com  ·  ${new Date().toLocaleDateString('es-ES')}`,
      MARGIN,
      292
    );
    doc.text(`Página ${i} de ${pageCount}`, PAGE_WIDTH - MARGIN, 292, { align: 'right' });
  }

  // ─── DESCARGAR ────────────────────────────────────────────
  const nombreArchivo = (ficha.nombrePlato || 'ficha-tecnica')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  doc.save(`${nombreArchivo || 'ficha-tecnica'}.pdf`);
}