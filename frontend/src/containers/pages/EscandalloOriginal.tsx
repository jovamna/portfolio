
import React from 'react'; // Agrega esta línea arriba del todo

import { useState, useMemo, useEffect } from 'react';
import { jsPDF } from 'jspdf';



export default function Escandallo() {

  // =========================
  // ESTADOS
  // =========================
  const [namePlato, setNamePlato] = useState("Salsa Boloñesa Casera 🍝");
  const [raciones, setRaciones] = useState(10);
  const [precioVenta, setPrecioVenta] = useState(15);

  

  const [ingredients, setIngredients] = useState([
  {
    id: "ejemplo-1",
    name: "Carne picada de ternera",
    pricePerKg: "8.50",
    grossWeight: "1.200",
    mermaKg: "0.000",
    usedWeight: "1.200"
  },
  {
    id: "ejemplo-2",
    name: "Tomate triturado",
    pricePerKg: "2.10",
    grossWeight: "2.000",
    mermaKg: "0.100",
    usedWeight: "1.900"
  },
  {
    id: "ejemplo-3",
    name: "Cebolla limpia",
    pricePerKg: "1.50",
    grossWeight: "0.400",
    mermaKg: "0.080",
    usedWeight: "0.320"
  }
]);



  // =========================
  // LOCAL STORAGE
  // =========================
useEffect(() => {
  const saved = localStorage.getItem('escandallo-data');
  if (saved) {
    const parsed = JSON.parse(saved);
    setIngredients(parsed.ingredients || []);
    setNamePlato(parsed.namePlato || ''); // Evitamos que guarde un undefined
    setRaciones(parsed.raciones || 1);
    setPrecioVenta(parsed.precioVenta || 0);
  }
}, []);



// 2. GUARDAR EN EL LOCALSTORAGE (Con candado de seguridad)
useEffect(() => {
  // 🌟 EL CANDADO: Si todo está vacío (es el primer render y no hay ingredientes),
  // no guardamos para no pisar los datos viejos que el primer useEffect está intentando leer.
  //if (!ingredients || ingredients.length === 0) {
  //  return; 
 // }

  localStorage.setItem(
    'escandallo-data',
    JSON.stringify({
      ingredients,
      namePlato,
      raciones,
      precioVenta
    })
  );
}, [ingredients, namePlato, raciones, precioVenta]);






  // =========================
  // FILAS
  // =========================
  const handleAddRow = () => {
    setIngredients([
      ...ingredients,
      {
        id: Date.now().toString(),
        name: '',
        pricePerKg: '',
        grossWeight: '',
        mermaKg: '',
        usedWeight: ''
      }
    ]);
  };

  const handleRemoveRow = (id) => {
    setIngredients(
    ingredients.filter((row) => row.id !== id)
  );

    //if (ingredients.length > 1) {
     // setIngredients(
     //   ingredients.filter((row) => row.id !== id)
     // );
    //}
  };

  const handleInputChange = (id, field, value) => {
    setIngredients(
      ingredients.map((row) =>
        row.id === id
          ? { ...row, [field]: value }
          : row
      )
    );
  };


   //=============================================================
   //CALCULO HOSTELERO FALTANTE
   //Faltante bruto=(Cantidad neta requerida​)−Peso bruto comprado
                 //  -----------------------
                 //    Rendimiento

   //=================================================================

  // =========================
  // CÁLCULOS
  // =========================
// =========================
// CÁLCULOS OPTIMIZADOS
// =========================
const { calculatedRows, totales } = useMemo(() => {
  let totalCompra = 0;
  let totalMermaDinero = 0;
  let totalPesoNeto = 0;
  let totalGastoConReposicion = 0; 
  let totalRendimiento = 0;
  let totalCosteRealPorRacion = 0;

  const rows = ingredients.map((row) => {
    const precioKg = Math.max(0, parseFloat(row.pricePerKg) || 0);
    const pesoBruto = Math.max(0, parseFloat(row.grossWeight) || 0);
    const mermaKg = Math.min(Math.max(0, parseFloat(row.mermaKg) || 0), pesoBruto);

    // 1. Coste de la compra inicial original
    const costeTotalCompra = pesoBruto * precioKg;   

    // 2. Peso neto obtenido de la compra original
    const pesoNeto = pesoBruto - mermaKg;

    // 3. Cantidad que el chef va a usar (si está vacía, se asume el peso neto disponible)
    const cantidadUsada = row.usedWeight !== undefined && row.usedWeight !== '' 
      ? Math.max(0, parseFloat(row.usedWeight) || 0) 
      : pesoNeto;

    // ========================================================
    // 🔥 ANALISIS DE RENDIMIENTO (¡Tu brillante aportación!)
    // ========================================================
    const rendimiento = pesoBruto > 0 ? pesoNeto / pesoBruto : 0;
    
    // Cuánto bruto REAL hay que comprar en total para cubrir la 'cantidadUsada'
    const brutoNecesario = rendimiento > 0 ? cantidadUsada / rendimiento : 0;

    // FALTANTE PARA LA RECETA Kilos netos que faltan (con respecto a lo que tenemos en el almacén)
    const cantidadFaltanteKg = Math.max(0, cantidadUsada - pesoNeto); 
    const cantidadFaltanteGr = cantidadFaltanteKg * 1000;

    // Cuánto extra de bruto hay que pedirle al proveedor
    const faltanteBruto = Math.max(0, brutoNecesario - pesoBruto);
    const faltanteBrutoGr = faltanteBruto * 1000;  //EN GRAMOS
    // ========================================================

    // 4. Precio por kilo limpio (después de descontar la merma)
    const priceKgSinMerma = pesoNeto > 0 ? costeTotalCompra / pesoNeto : 0;

    // 5. Dinero perdido por la merma en la compra original
    const dineroPerdidoPorMerma = mermaKg * precioKg;  
   
    // 6. ⭐ NUEVA FÓRMULA CORREGIDA PARA COSTE REAL TOTAL
    // Multiplicamos el bruto real necesario por el precio de compra.
    // Esto funciona matemáticamente perfecto para CUALQUIER escenario (A, B o C).
    const costeRealTotal = brutoNecesario * precioKg;

    // 8. Coste por ración final para ESTE ingrediente
    const nuevoCostePorRacion = raciones > 0 ? (costeRealTotal / raciones) : 0;

    // Acumuladores Globales
    totalCompra += costeTotalCompra;
    totalMermaDinero += dineroPerdidoPorMerma;
    totalPesoNeto += pesoNeto;
    totalCosteRealPorRacion += nuevoCostePorRacion;   
    totalGastoConReposicion += costeRealTotal;
    totalRendimiento += rendimiento;


    return {
      ...row,
      rendimiento: (rendimiento * 100).toFixed(1), // 🌟 Extra: % de rendimiento para el PDF (ej: 75.0%)
      brutoNecesario: brutoNecesario.toFixed(3),   // 🌟 Extra: Bruto total a comprar
      faltanteBruto: faltanteBruto.toFixed(3),     // 🌟 Extra: Cuánto más pedir al proveedor COMPRA REQUERIDA
      faltanteBrutoGr:faltanteBrutoGr.toFixed(2),
      pesoNeto: pesoNeto.toFixed(3),
      cantidadUsada: cantidadUsada.toFixed(3),
      costeTotalCompra: costeTotalCompra.toFixed(2),
      dineroPerdidoPorMerma: dineroPerdidoPorMerma.toFixed(2),
      priceKgSinMerma: priceKgSinMerma.toFixed(2),
      cantidadFaltante: cantidadFaltanteKg.toFixed(3),
      cantidadFaltanteG: cantidadFaltanteGr.toFixed(0),
      costeRealTotal: costeRealTotal.toFixed(2),        
      nuevoCostePorRacion: nuevoCostePorRacion.toFixed(2),
    };
  });

  const beneficio = precioVenta - totalCosteRealPorRacion;
  const foodCost = precioVenta > 0 ? (totalCosteRealPorRacion / precioVenta) * 100 : 0;

  return {
    calculatedRows: rows,
    totales: {
      totalCompra: totalCompra.toFixed(2),
      totalMermaDinero: totalMermaDinero.toFixed(2),
      totalPesoNeto: totalPesoNeto.toFixed(3),
      totalCosteRealPorRacion: totalCosteRealPorRacion.toFixed(2),
      beneficio: beneficio.toFixed(2),
      foodCost: foodCost.toFixed(2),
      totalGastoConReposicion: totalGastoConReposicion.toFixed(2),
      totalRendimiento: totalRendimiento.toFixed(2),
    }
  };
}, [ingredients, raciones, precioVenta]);




  // =========================
  // EXPORTAR A PDF (CLIENT-SIDE)
  // =========================
  // =========================
  // EXPORTAR A PDF (CLIENT-SIDE)
  // =========================
  const exportarPDF = () => {
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
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39);
    doc.text("Configuración General", 14, 45);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Número de raciones: ${raciones}`, 14, 52);
    doc.text(`Precio de Venta del Plato: ${precioVenta} EUR`, 14, 58);

    // Tabla de Ingredientes
    doc.setFont("helvetica", "bold");
    doc.text("Desglose de Ingredientes", 14, 70);
    
    // Encabezados de la tabla (He ensanchado un poco las posiciones para meter los nuevos datos sin solaparse)
    doc.setFillColor(17, 24, 39); // Fondo gray-900
    doc.rect(14, 74, 182, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5); // Bajamos un pelín la fuente para que quepan holgadas las columnas
    doc.text("Ingrediente", 16, 79.5);
    doc.text("Precio/Kg", 48, 79.5);
    doc.text("P. Bruto", 70, 79.5);
    doc.text("Merma", 90, 79.5);
    doc.text("P. Neto", 110, 79.5);
    doc.text("Cant. Usada", 132, 79.5);
    doc.text("Faltante", 155, 79.5);
    doc.text("Coste Final.", 176, 79.5);

    // Filas de la tabla
    let currentY = 82;
    doc.setTextColor(55, 65, 81); // gray-700
    
    calculatedRows.forEach((row, index) => {
      // Alternar color de fondo ligero para legibilidad
      if (index % 2 === 0) {
        doc.setFillColor(249, 250, 251); // gray-50
        doc.rect(14, currentY, 182, 8, "F");
      }
      
      doc.setFont("helvetica", "normal");
      doc.text(row.name || "Sin nombre", 16, currentY + 5.5);
      doc.text(`${row.pricePerKg || '0.00'} EUR`, 48, currentY + 5.5);
      doc.text(`${row.grossWeight || '0'} kg`, 70, currentY + 5.5);
      doc.text(`${row.mermaKg || '0'} kg`, 90, currentY + 5.5);
      doc.text(`${row.pesoNeto} kg`, 110, currentY + 5.5);
      doc.text(`${row.cantidadUsada} kg`, 132, currentY + 5.5);
      
      // Estilo condicional para el faltante (si es negativo es que sobra)
      const faltanteTexto = `${row.cantidadFaltante} kg`;
      doc.text(faltanteTexto, 155, currentY + 5.5);
      
      // ⭐ SOLUCIÓN AQUÍ: Cambiado row.costeIngrediente por row.costeRealTotal
      doc.setFont("helvetica", "bold");
      doc.text(`${row.costeRealTotal} EUR`, 176, currentY + 5.5);
      
      currentY += 8;
    });

    // Cuadro de Resumen Final Financiero
    currentY += 10;
    doc.setFillColor(31, 41, 55); // gray-800
    doc.rect(14, currentY, 182, 38, "F");

    doc.setTextColor(251, 191, 36); // Amber-400
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("RESUMEN DEL PLATO", 20, currentY + 8);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Compra Total: ${totales.totalCompra} EUR`, 20, currentY + 16);
    doc.text(`Dinero Perdido (Mermas): -${totales.totalMermaDinero} EUR`, 20, currentY + 22);
    doc.text(`Coste por Ración: ${totales.totalCosteRealPorRacion} EUR`, 20, currentY + 28);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Beneficio por Plato: ${totales.beneficio} EUR`, 110, currentY + 16);
    
    doc.setTextColor(251, 191, 36); // Amber
    doc.setFontSize(14);
    doc.text(`Food Cost: ${totales.foodCost}%`, 110, currentY + 26);

    // Descarga automática en el navegador del usuario
    doc.save(`escandallo-${Date.now()}.pdf`);
  };






  // =========================
  // UI
  // =========================
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-3">
          🧾 Escandallo Profesional
        </h1>
        <p className="text-gray-600 text-lg">
          Calcula mermas, coste real y rentabilidad del plato
        </p>
      </div>

      {/* CONFIGURACIÓN */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-10">

         {/* NOMBRE DEL PLATO */}
        <div className="bg-white col-span-3 p-6 rounded-3xl shadow">
          <label className="block text-lg font-bold mb-4">
          Nombre del Plato
         </label>
         <input
          name="namePlato"
          value={namePlato || ''}  // El || '' evita que React se queje si empieza vacío
          onChange={(e) => setNamePlato(e.target.value)} // Pasamos el texto real que escribe el chef
          type="text"
          placeholder="Ej. Tarta de Queso, Paella de Marisco..."
          className="w-full p-4 border rounded-2xl lg:text-2xl text-base "
           />
         </div>

        {/* RACIONES */}
        <div className="bg-white col-span-1 p-6 rounded-3xl shadow">
          <label className="block text-lg font-bold mb-4">
            N.º de Raciones
          </label>
          <input
            type="number"
            min="1"
            value={raciones}
            onChange={(e) =>
              setRaciones(
                Math.max(
                  1,
                  parseInt(e.target.value) || 1
                )
              )
            }
            className="w-full p-4 border rounded-2xl text-3xl font-black"
          />
        </div>

        {/* PRECIO VENTA */}
        <div className="bg-white col-span-1 p-6 rounded-3xl shadow">
          <label className="block text-lg font-bold mb-4">
            P.V. del Plato (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precioVenta}
            onChange={(e) =>
              setPrecioVenta(
                Math.max(
                  0,
                  parseFloat(e.target.value) || 0
                )
              )
            }
            className="w-full p-4 border rounded-2xl text-3xl font-black text-green-700"
          />
        </div>
      </div>




     
      {/* TABLA */}    {/* TABLA */}
   <div className="bg-white rounded-3xl shadow">

  <table className="w-full">
    <tbody className="divide-y">
      {calculatedRows.map((row) => (

        <React.Fragment key={row.id}>
            {/**PRIMER BLOQUE */}
          <tr className="hover:bg-gray-50">


          {/* NOMBRE DEL INGREDIENTE*/}
          <td className="p-2 ">
            <div className=''>
                <p className= 'text-center lg:text-base font-bold text-blue-500'>
                  Ingrediente
                  </p>
            </div>
            <div className='py-2'>
              <input
              type="text"
              value={row.name}
              onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
              className="w-full text-center p-2 border rounded-xl text-neutral-900"
              placeholder="Ej. zanahoria"
            />
            </div>
          </td>





          {/* PRECIO POR KILO DEL INGREDIENTE INPUT*/}
          <td className="p-2">
            <div>
               <p className='text-center lg:text-sm font-bold text-neutral-900'>
              Compra <span className="text-red-600">€</span> por Kg/Gr 
            </p>

            </div>
           <div className='py-2'>
            <input
              type="number"
              step="0.01"
              value={row.pricePerKg}
              onChange={(e) => handleInputChange(row.id, 'pricePerKg', e.target.value)}
              className="w-full text-center p-2 border rounded-xl text-neutral-900"
              placeholder="Ej. 4.00 ó 0.40"
            />
          
          
           </div>
          </td>



          {/* PESO BRUTO INPUT */}
          <td className="p-2">
            <div>
                   <p className='text-center lg:text-sm font-bold'>
                    Peso Bruto Total en Kg/Gr
                    </p>

            </div>
              <div className='py-2'>
              <input
              type="number"
              step="0.01"
              value={row.grossWeight}
              onChange={(e) => handleInputChange(row.id, 'grossWeight', e.target.value)}
              className="w-full text-center p-2 border rounded-xl text-neutral-900"
              placeholder="Ej. 4 ó 0.350 (gr.)"
              />
              </div>
          
          </td>





              {/* MERMA INPUT */}
          <td className="p-2">
            <div>
                <p className='text-center lg:text-sm font-bold'>
                  Merma Total en Kg/Gr
                  </p>
            </div>
            <div className='py-2'>
              <input
              type="number"
              step="0.01"
              value={row.mermaKg}
              onChange={(e) => handleInputChange(row.id, 'mermaKg', e.target.value)}
              className="w-full text-center p-2 border rounded-xl text-neutral-900"
              placeholder="Ej. 0 ó 0.140 (140gr)"
            />
            </div>
            
          </td>



        

          {/* 2. PESO NETO PESO SIN MERMA*/}
          <td className="p-2 ">
            <div className='  '>
                <p className='text-center lg:text-sm  font-bold'>
                  Peso Neto en Kg/Gr
                  </p>

            </div>
            <div className='py-5 text-center'>
                 {row.pesoNeto} kg
            </div>
        
          </td>

            {/* 4 PRECIO POR KILO DESPUES DE DESCONTAR LA MERMA*/}
              <td className="p-2 ">
                <div className=' '>
                  <p className='text-center lg:text-sm font-bold'>
                   Precio kg sin merma
                   </p>
                 </div>
          
                   <div className='py-5 text-center'>
                   {row.priceKgSinMerma} €  
                   </div>  
              </td>
          </tr>
          {/**FINAL PRIMER BLOQUE */}



           {/**SEGUNDO BLOQUE */}
          <tr className='bg-taupe-400'>


            {/* 5. Dinero Perdido (Merma) */}
          <td className="p-2 ">
            <div className='py-2 text-black'>
                          <p className='text-center lg:text-sm font-bold'>
                        Perdida €
                        </p>
            </div>
             <div className='text-center py-2'>
              -{row.dineroPerdidoPorMerma} €

             </div>
            

          </td>







            
          {/* 3 === CANTIDAD A USAR, KILOS O GRAMOS QUE SE USARÁN EN LA RECETA === */}
            <td className="p-2">

            <div className=''>
               <p className='text-center lg:text-sm font-bold'>
                Cantidad a Usar
                </p>
            </div>

           <div className='py-2'>
          <input
           type="number"
           step="0.001" // 🌟 Consejo: pon 0.001 para que en el móvil puedan meter tres decimales de gramos (ej: 0.455)
           value={row.usedWeight || ''}
           onChange={(e) => handleInputChange(row.id, 'usedWeight', e.target.value)}
          className="w-full text-center p-2 border rounded-xl text-neutral-900"
          // placeholder={row.pesoNeto}   // ← Muestra el valor sugerido
           // 🌟 LA MAGIA: Convertimos el peso neto a texto y le sumamos " kg" como sugerencia grisácea
           placeholder={row.pesoNeto ? `Sugerido: ${row.pesoNeto} kg` : "Ej. 0.500 (500g)"}
           />
           </div>


            </td>




          



           {/*  6 PRECIO TOTAL FINAL NCLUYENDO LA PERDIDA DE LA MERMA DEL INGREDIENTE*/}
          <td className="p-2 font-black ">
            <div className='py-2'>
                 <p className='lg:text-sm text-center lg:text-sm font-bold'>
                  Coste Total Final
                  </p>
            </div>
        
            <div className='text-center py-2'>
              {row.costeRealTotal} €
            </div>
           
          </td>

           {/**7.-  CANTIDAD QUE FALTA PARA LA RECETA*/}
          <td className=" py-2">
            <div className='py-2'>
                 <p className=' text-center lg:text-sm font-bold'>
                  Faltante sin merma
                  </p>
            </div>

            <div className=' text-center'>
           {parseFloat(row.cantidadFaltante) > 0 ? (
           <span className='flex flex-col'>⚠️ {row.cantidadFaltante} kg /({row.cantidadFaltanteG} g)</span>
           ) : (
           <span className=" text-center text-neutral-800">✅ Todo cubierto</span>
            )}

            </div>
         
           </td>

          
           {/**7.-  CANTIDAD QUE FALTA PARA LA RECETA*/}
          <td className=" py-2">
            <div className='py-2'>
                 <p className=' text-center lg:text-sm font-bold'>
                  Compra en Bruto Requerida
                  </p>
            </div>

            <div className='text-center '>
           {parseFloat(row.faltanteBruto) > 0 ? (
           <span className='flex flex-col'>⚠️ {row.faltanteBruto} kg /({row.faltanteBrutoGr} g)</span>
           ) : (
           <span className=" text-center text-neutral-800">✅ Todo cubierto</span>
            )}

            </div>
         
           </td>

           
           {/**8 COSTE DE LA RACIN INCLUYENDO LA PERDIDA DE LA MERMA */}
           <td className="p-2 font-black ">
            <div className=''>
                <p className='text-center lg:text-sm font-bold lg:text-sm'>
                  Coste por racion
                  </p>

            </div>
          

            <div className='text-center py-2'>
                      {row.nuevoCostePorRacion } €

            </div>
    
          </td>


          {/* 10. Eliminar */}
          <td className="p-2 ">

            <div className='py-2'>
               <p className='text-center lg:text-sm font-bold'>
                Eliminar</p>

            </div>
            <div className='text-center'>
               <button
              onClick={() => handleRemoveRow(row.id)}
              className="text-red-600  hover:text-red-800 text-2xl "
            >
              ✕
            </button>


            </div>
           
           
          </td>
        </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>

   </div>
   {/**FINAL TABLA */}
    



      {/* BOTONES DE ACCIÓN */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={handleAddRow}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-colors"
        >
          ➕ Añadir Ingrediente
        </button>
        
        {/* BOTÓN DE DESCARGA PDF */}
        <button
          onClick={exportarPDF}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-colors"
        >
          📥 Descargar Reporte PDF
        </button>
      </div>






      {/* ========================================== */}
{/* 💻 VISTA PARA ORDENADORES (TU TABLA ACTUAL) */}
{/* ========================================== */}
<div className="hidden md:block bg-white rounded-3xl shadow overflow-x-auto">
  <table className="w-full">
    <tbody className="divide-y">
      {calculatedRows.map((row) => (
        <React.Fragment key={row.id}>
          <tr className="hover:bg-gray-50">
            {/* NOMBRE DEL INGREDIENTE */}
            <td className="p-2">
              <p className='text-center lg:text-base font-bold text-blue-500'>Ingrediente</p>
              <div className='py-2'>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                  className="w-full text-center p-2 border rounded-xl text-neutral-900"
                  placeholder="Ej. zanahoria"
                />
              </div>
            </td>

            {/* PRECIO POR KILO */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold text-neutral-900'>
                Compra <span className="text-red-600">€</span> por Kg/Gr 
              </p>
              <div className='py-2'>
                <input
                  type="number"
                  step="0.01"
                  value={row.pricePerKg}
                  onChange={(e) => handleInputChange(row.id, 'pricePerKg', e.target.value)}
                  className="w-full text-center p-2 border rounded-xl text-neutral-900"
                  placeholder="Ej. 4.00 ó 0.40"
                />
              </div>
            </td>

            {/* PESO BRUTO */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold'>Peso Bruto Total en Kg/Gr</p>
              <div className='py-2'>
                <input
                  type="number"
                  step="0.01"
                  value={row.grossWeight}
                  onChange={(e) => handleInputChange(row.id, 'grossWeight', e.target.value)}
                  className="w-full text-center p-2 border rounded-xl text-neutral-900"
                  placeholder="Ej. 4 ó 0.350 (gr.)"
                />
              </div>
            </td>

            {/* MERMA INPUT */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold'>Merma Total en Kg/Gr</p>
              <div className='py-2'>
                <input
                  type="number"
                  step="0.01"
                  value={row.mermaKg}
                  onChange={(e) => handleInputChange(row.id, 'mermaKg', e.target.value)}
                  className="w-full text-center p-2 border rounded-xl text-neutral-900"
                  placeholder="Ej. 0 ó 0.140 (140gr)"
                />
              </div>
            </td>

            {/* PESO NETO RESULTADO */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold'>Peso Neto en Kg/Gr</p>
              <div className='py-5 text-center text-neutral-900 font-medium'>{row.pesoNeto} kg</div>
            </td>

            {/* PRECIO KILO SIN MERMA */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold'>Precio kg sin merma</p>
              <div className='py-5 text-center text-neutral-900 font-medium'>{row.priceKgSinMerma} €</div>
            </td>
          </tr>

          {/* SEGUNDO BLOQUE (FILA GRIS EN PC) */}
          <tr className='bg-neutral-50'>
            {/* DINERO PERDIDO */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold text-neutral-700'>Perdida €</p>
              <div className='text-center py-2 text-red-600 font-medium'>-{row.dineroPerdidoPorMerma} €</div>
            </td>

            {/* CANTIDAD A USAR */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold'>Cantidad a Usar</p>
              <div className='py-2'>
                <input
                  type="number"
                  step="0.001"
                  value={row.usedWeight || ''}
                  onChange={(e) => handleInputChange(row.id, 'usedWeight', e.target.value)}
                  className="w-full text-center p-2 border rounded-xl text-neutral-900"
                  placeholder={row.pesoNeto ? `Sugerido: ${row.pesoNeto} kg` : "Ej. 0.500 (500g)"}
                />
              </div>
            </td>

            {/* COSTE TOTAL FINAL */}
            <td className="p-2 font-black">
              <p className='text-center lg:text-sm font-bold'>Coste Total Final</p>
              <div className='text-center py-2 text-neutral-900'>{row.costeRealTotal} €</div>
            </td>

            {/* FALTANTE SIN MERMA */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold'>Faltante sin merma</p>
              <div className='text-center py-2'>
                {parseFloat(row.cantidadFaltante) > 0 ? (
                  <span className='text-amber-600 font-semibold text-xs'>⚠️ {row.cantidadFaltante} kg / ({row.cantidadFaltanteG} g)</span>
                ) : (
                  <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                )}
              </div>
            </td>

            {/* COMPRA EN BRUTO REQUERIDA */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold'>Compra en Bruto Requerida</p>
              <div className='text-center py-2'>
                {parseFloat(row.faltanteBruto) > 0 ? (
                  <span className='text-red-600 font-semibold text-xs'>⚠️ {row.faltanteBruto} kg</span>
                ) : (
                  <span className="text-emerald-600 font-medium text-sm">✅ Todo cubierto</span>
                )}
              </div>
            </td>

            {/* COSTE POR RACIÓN */}
            <td className="p-2 font-black">
              <p className='text-center lg:text-sm font-bold'>Coste por racion</p>
              <div className='text-center py-2 text-indigo-600'>{row.nuevoCostePorRacion} €</div>
            </td>

            {/* BOTÓN ELIMINAR */}
            <td className="p-2">
              <p className='text-center lg:text-sm font-bold text-gray-400'>Eliminar</p>
              <div className='text-center py-2'>
                <button onClick={() => handleRemoveRow(row.id)} className="text-red-500 hover:text-red-700 text-xl">✕</button>
              </div>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>


{/* ========================================== */}
{/* 📱 VISTA EN TARJETAS (CARDS) PARA MÓVILES */}
{/* ========================================== */}
<div className="block md:hidden space-y-6">
  {calculatedRows.map((row, index) => (
    <div key={row.id} className="bg-white rounded-3xl p-5 shadow-md border border-neutral-100 relative">
      
      {/* Cabecera de la Tarjeta con el número de ingrediente y botón de borrar */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-100">
        <span className="text-xs bg-neutral-100 text-neutral-600 font-bold px-2.5 py-1 rounded-full">
          Ingrediente #{index + 1}
        </span>
        <button 
          onClick={() => handleRemoveRow(row.id)} 
          className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center font-bold"
        >
          ✕
        </button>
      </div>

      {/* BLOQUE 1: DATOS REQUERIDOS (INPUTS) */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-blue-500 mb-1">Nombre del Ingrediente</label>
          <input
            type="text"
            value={row.name}
            onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
            className="w-full text-left px-3 py-2 border rounded-xl text-neutral-900 bg-neutral-50/50"
            placeholder="Ej. zanahoria"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1">Precio Compra (<span className="text-red-600">€</span>/Kg)</label>
            <input
              type="number"
              step="0.01"
              value={row.pricePerKg}
              onChange={(e) => handleInputChange(row.id, 'pricePerKg', e.target.value)}
              className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
              placeholder="Ej. 4.00"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1">Cantidad a Usar</label>
            <input
              type="number"
              step="0.001"
              value={row.usedWeight || ''}
              onChange={(e) => handleInputChange(row.id, 'usedWeight', e.target.value)}
              className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900 placeholder:text-[10px]"
              placeholder={row.pesoNeto ? `${row.pesoNeto} kg` : "Ej. 0.500"}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Peso Bruto (Kg)</label>
            <input
              type="number"
              step="0.01"
              value={row.grossWeight}
              onChange={(e) => handleInputChange(row.id, 'grossWeight', e.target.value)}
              className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
              placeholder="Ej. 4.00"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Merma (Kg)</label>
            <input
              type="number"
              step="0.01"
              value={row.mermaKg}
              onChange={(e) => handleInputChange(row.id, 'mermaKg', e.target.value)}
              className="w-full text-center px-2 py-2 border rounded-xl text-neutral-900"
              placeholder="Ej. 0.140"
            />
          </div>
        </div>
      </div>

      {/* BLOQUE 2: ANÁLISIS ECONÓMICO Y FINANCIERO INTERNO (MÓVIL) */}
      <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
        <div className="bg-neutral-50 p-2 rounded-xl">
          <p className="text-gray-500 font-medium">Peso Neto:</p>
          <p className="font-bold text-neutral-900 mt-0.5">{row.pesoNeto} kg</p>
        </div>
        <div className="bg-neutral-50 p-2 rounded-xl">
          <p className="text-gray-500 font-medium">Precio limpio/Kg:</p>
          <p className="font-bold text-neutral-900 mt-0.5">{row.priceKgSinMerma} €</p>
        </div>
        <div className="bg-neutral-50 p-2 rounded-xl">
          <p className="text-red-500 font-medium">Pérdida Merma:</p>
          <p className="font-bold text-red-600 mt-0.5">-{row.dineroPerdidoPorMerma} €</p>
        </div>
        <div className="bg-indigo-50 p-2 rounded-xl">
          <p className="text-indigo-600 font-bold">Coste Ración:</p>
          <p className="font-black text-indigo-700 mt-0.5 text-sm">{row.nuevoCostePorRacion} €</p>
        </div>

        {/* Faltantes de stock y reposiciones */}
        <div className="col-span-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100 flex flex-col justify-center space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-neutral-600 font-medium">Faltante Neto:</span>
            {parseFloat(row.cantidadFaltante) > 0 ? (
              <span className="text-amber-700 font-bold">⚠️ {row.cantidadFaltante} kg</span>
            ) : (
              <span className="text-emerald-600 font-bold">✅ Cubierto</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-600 font-medium">Compra Bruta Requerida:</span>
            {parseFloat(row.faltanteBruto) > 0 ? (
              <span className="text-red-600 font-bold">⚠️ {row.faltanteBruto} kg</span>
            ) : (
              <span className="text-emerald-600 font-bold">✅ Cubierto</span>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER DE LA CARD: EL COSTE FINAL DEFINITIVO */}
      <div className="mt-3 bg-neutral-900 text-white rounded-xl p-3 flex justify-between items-center">
        <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">Coste Total Final:</span>
        <span className="text-base font-black text-amber-400">{row.costeRealTotal} €</span>
      </div>

    </div>
  ))}
</div>


{/* ========================================== */}
{/* 🚀 BOTONES DE ACCIÓN (MÓVIL Y PC) */}
{/* ========================================== */}
<div className="flex flex-col sm:flex-row gap-4 mt-6">
  <button
    onClick={handleAddRow}
    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-colors text-center"
  >
    ➕ Añadir Ingrediente
  </button>
  
  <button
    onClick={exportarPDF}
    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-colors text-center"
  >
    📥 Descargar Reporte PDF
  </button>
</div>









      {/* RESUMEN */}
   <div className="mt-10 bg-gradient-to-r from-gray-900 to-black text-white p-6 md:p-10 rounded-3xl shadow-2xl">
  <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-amber-400">
    📊 RESUMEN DEL PLATO
  </h2>
  
  {/* 💻 GRID EN 2 FILAS PARA PC (3 columnas) Y 1 COLUMNA EN MÓVIL */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    
    {/* === FILA 1 EN PC === */}
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-gray-400 text-lg">Gasto Total Inicial</p>
      <p className="text-4xl md:text-5xl font-black mt-3 text-white">{totales.totalCompra} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-red-400 text-lg">Dinero Perdido</p>
      <p className="text-4xl md:text-5xl font-black mt-3 text-red-500">-{totales.totalMermaDinero} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-amber-400 text-lg">Gasto Final con Reposición</p>
      <p className="text-4xl md:text-5xl font-black mt-3 text-amber-500">{totales.totalGastoConReposicion} €</p>
    </div>

    {/* === FILA 2 EN PC === */}
    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-indigo-400 text-lg">Coste Real por Ración</p>
      <p className="text-4xl md:text-5xl font-black mt-3 text-indigo-400">{totales.totalCosteRealPorRacion} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-green-400 text-lg">Beneficio por Plato</p>
      <p className="text-4xl md:text-5xl font-black mt-3 text-green-400">{totales.beneficio} €</p>
    </div>

    <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
      <p className="text-cyan-400 text-lg">Rendimiento Global</p>
      <p className="text-4xl md:text-5xl font-black mt-3 text-cyan-400">{totales.totalRendimiento}%</p>
    </div>

  </div>

  {/* 👑 EL REY DE LAS MÉTRICAS: DESTACADO ABAJO EN GRANDE */}
  <div className="mt-12 pt-8 border-t border-gray-800 text-center">
    <p className="text-gray-400 text-xl mb-2">Food Cost de la Receta</p>
    <p className="text-6xl md:text-7xl font-black text-amber-400 tracking-tight">{totales.foodCost}%</p>
    <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
      * Porcentaje ideal recomendado para el control de costes del restaurante.
    </p>
  </div>

</div>
    </div>
  );
}