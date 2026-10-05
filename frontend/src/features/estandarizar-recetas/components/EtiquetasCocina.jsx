import { useState } from "react";
import { createPortal } from "react-dom";

// Los 14 alérgenos de declaración obligatoria en la UE
const ALERGENOS = [
  "Gluten",
  "Crustáceos",
  "Huevos",
  "Pescado",
  "Cacahuetes",
  "Soja",
  "Lácteos",
  "Frutos de cáscara",
  "Apio",
  "Mostaza",
  "Sésamo",
  "Sulfitos",
  "Altramuces",
  "Moluscos",
];

const TAMANOS = [
  { id: "50x30", label: "50 × 30 mm", w: 50, h: 30 },
  { id: "60x40", label: "60 × 40 mm", w: 60, h: 40 },
  { id: "100x50", label: "100 × 50 mm", w: 100, h: 50 },
  { id: "custom", label: "Medida propia" },
];

const CONSERVACION = ["", "Refrigerado", "Congelado", "Ambiente"];

const pad = (n) => String(n).padStart(2, "0");
const aIso = (f) => `${f.getFullYear()}-${pad(f.getMonth() + 1)}-${pad(f.getDate())}`;
const hoy = () => aIso(new Date());

const sumarDias = (iso, dias) => {
  const [y, m, d] = iso.split("-").map(Number);
  return aIso(new Date(y, m - 1, d + Number(dias)));
};

const formatoFecha = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const limitar = (valor, min, max) => Math.min(max, Math.max(min, Number(valor) || min));

function Etiqueta({ datos, w, h }) {
  const base = Math.min(Math.max(h * 0.085, 2.2), 4);
  const fila = { fontSize: `${base}mm`, lineHeight: 1.25 };
  const alergenos = datos.alergenos.length ? datos.alergenos.join(", ") : "";

  return (
    <div
      className="etiqueta"
      style={{
        width: `${w}mm`,
        height: `${h}mm`,
        padding: `${Math.min(w, h) * 0.06}mm`,
        boxSizing: "border-box",
        overflow: "hidden",
        background: "#fff",
        color: "#000",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ fontSize: `${base * 1.7}mm`, fontWeight: 700, lineHeight: 1.1, marginBottom: `${base * 0.3}mm` }}>
        {datos.producto || "Nombre del producto"}
      </div>
      {datos.elaboracion && <div style={fila}>Elaborado: {formatoFecha(datos.elaboracion)}</div>}
      {datos.limite && (
        <div style={{ ...fila, fontWeight: 700 }}>Consumir antes de: {formatoFecha(datos.limite)}</div>
      )}
      {datos.lote && <div style={fila}>Lote: {datos.lote}</div>}
      {datos.conservacion && <div style={fila}>{datos.conservacion}</div>}
      {datos.elaboradoPor && <div style={fila}>Elaborado por: {datos.elaboradoPor}</div>}
      {alergenos && <div style={fila}>Alérgenos: {alergenos}</div>}
      {datos.local && <div style={{ ...fila, fontSize: `${base * 0.85}mm`, marginTop: `${base * 0.3}mm` }}>{datos.local}</div>}
    </div>
  );
}

const campo = "w-full rounded border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800/30";
const etiquetaCampo = "mb-1 block text-sm font-medium text-stone-700";

export default function EtiquetasCocina() {
  const [datos, setDatos] = useState({
    producto: "",
    elaboracion: hoy(),
    limite: "",
    lote: "",
    conservacion: "",
    elaboradoPor: "",
    local: "",
    alergenos: [],
  });
  const [dias, setDias] = useState("");
  const [tamanoId, setTamanoId] = useState("50x30");
  const [medida, setMedida] = useState({ w: 70, h: 40 });
  const [copias, setCopias] = useState(1);

  const actual = TAMANOS.find((t) => t.id === tamanoId);
  const w = tamanoId === "custom" ? limitar(medida.w, 20, 200) : actual.w;
  const h = tamanoId === "custom" ? limitar(medida.h, 20, 200) : actual.h;

  const cambiar = (clave, valor) => setDatos((d) => ({ ...d, [clave]: valor }));

  const cambiarElaboracion = (valor) => {
    setDatos((d) => ({
      ...d,
      elaboracion: valor,
      limite: dias !== "" && valor ? sumarDias(valor, dias) : d.limite,
    }));
  };

  const cambiarDias = (valor) => {
    setDias(valor);
    if (valor !== "" && datos.elaboracion) cambiar("limite", sumarDias(datos.elaboracion, valor));
  };

  const alternarAlergeno = (nombre) =>
    setDatos((d) => ({
      ...d,
      alergenos: d.alergenos.includes(nombre)
        ? d.alergenos.filter((a) => a !== nombre)
        : [...d.alergenos, nombre],
    }));

  const sugerirLote = () => {
    const letras = datos.producto.normalize("NFD").replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "LOT";
    const [y, m, d] = (datos.elaboracion || hoy()).split("-");
    cambiar("lote", `${letras}-${d}${m}${y.slice(2)}`);
  };

  const cantidad = limitar(copias, 1, 100);

  const css = `
    @media screen { #etiquetas-print-root { display: none; } }
    @media print {
      @page { size: ${w}mm ${h}mm; margin: 0; }
      html, body { margin: 0; padding: 0; }
      body > *:not(#etiquetas-print-root) { display: none !important; }
      #etiquetas-print-root { display: block; }
      .etiqueta { break-after: page; page-break-after: always; }
      .etiqueta:last-child { break-after: auto; page-break-after: auto; }
    }
  `;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 text-stone-900 lg:mt-[40px] mt-[20px] border border-neutral-700 rounded-2xl shadow-sm">
      <style>{css}</style>

      <h1 className="text-3xl font-bold">Generador de etiquetas para cocina</h1>
      <p className="mt-2 max-w-prose text-stone-600">
        Escribe los datos de la elaboración, elige el tamaño de tu etiqueta e imprímela. Todo se hace en tu navegador y no se guarda nada.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className={etiquetaCampo} htmlFor="producto">Producto o elaboración</label>
            <input id="producto" className={campo} value={datos.producto} onChange={(e) => cambiar("producto", e.target.value)} placeholder="Salsa de tomate" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={etiquetaCampo} htmlFor="elaboracion">Fecha de elaboración</label>
              <input id="elaboracion" type="date" className={campo} value={datos.elaboracion} onChange={(e) => cambiarElaboracion(e.target.value)} />
            </div>
            <div>
              <label className={etiquetaCampo} htmlFor="limite">Fecha límite</label>
              <input id="limite" type="date" className={campo} value={datos.limite} onChange={(e) => { setDias(""); cambiar("limite", e.target.value); }} />
            </div>
          </div>

          <div>
            <label className={etiquetaCampo} htmlFor="dias">Días hasta la fecha límite (opcional)</label>
            <input id="dias" type="number" min="0" className={campo} value={dias} onChange={(e) => cambiarDias(e.target.value)} placeholder="Según tu procedimiento" />
            <p className="mt-1 text-xs text-stone-500">Solo suma los días que indiques a la fecha de elaboración. El plazo lo decide tu establecimiento.</p>
          </div>

          <div>
            <label className={etiquetaCampo} htmlFor="lote">Lote</label>
            <div className="flex gap-2">
              <input id="lote" className={campo} value={datos.lote} onChange={(e) => cambiar("lote", e.target.value)} placeholder="SAL-031026" />
              <button type="button" onClick={sugerirLote} className="shrink-0 rounded border border-stone-300 bg-white px-3 text-sm hover:bg-stone-100">
                Crear lote
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={etiquetaCampo} htmlFor="conservacion">Conservación</label>
              <select id="conservacion" className={campo} value={datos.conservacion} onChange={(e) => cambiar("conservacion", e.target.value)}>
                {CONSERVACION.map((c) => (
                  <option key={c} value={c}>{c || "Sin indicar"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={etiquetaCampo} htmlFor="elaboradoPor">Elaborado por</label>
              <input id="elaboradoPor" className={campo} value={datos.elaboradoPor} onChange={(e) => cambiar("elaboradoPor", e.target.value)} placeholder="Iniciales" />
            </div>
          </div>

          <div>
            <label className={etiquetaCampo} htmlFor="local">Nombre del local (opcional)</label>
            <input id="local" className={campo} value={datos.local} onChange={(e) => cambiar("local", e.target.value)} />
          </div>

          <fieldset>
            <legend className={etiquetaCampo}>Alérgenos que quieres mostrar</legend>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              {ALERGENOS.map((a) => (
                <label key={a} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={datos.alergenos.includes(a)} onChange={() => alternarAlergeno(a)} className="h-4 w-4 accent-emerald-800" />
                  {a}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-stone-500">
              La aplicación no determina qué alérgenos contiene una elaboración. La información de la etiqueta es responsabilidad de tu establecimiento.
            </p>
          </fieldset>
        </div>

        <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={etiquetaCampo} htmlFor="tamano">Tamaño de etiqueta</label>
              <select id="tamano" className={campo} value={tamanoId} onChange={(e) => setTamanoId(e.target.value)}>
                {TAMANOS.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={etiquetaCampo} htmlFor="copias">Copias</label>
              <input id="copias" type="number" min="1" max="100" className={campo} value={copias} onChange={(e) => setCopias(e.target.value)} />
            </div>
          </div>

          {tamanoId === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={etiquetaCampo} htmlFor="ancho">Ancho (mm)</label>
                <input id="ancho" type="number" min="20" max="200" className={campo} value={medida.w} onChange={(e) => setMedida((m) => ({ ...m, w: e.target.value }))} />
              </div>
              <div>
                <label className={etiquetaCampo} htmlFor="alto">Alto (mm)</label>
                <input id="alto" type="number" min="20" max="200" className={campo} value={medida.h} onChange={(e) => setMedida((m) => ({ ...m, h: e.target.value }))} />
              </div>
            </div>
          )}

          <div>
            <p className={etiquetaCampo}>Vista previa a tamaño real</p>
            <div className="overflow-x-auto rounded-lg bg-stone-200 p-6">
              <div className="inline-block shadow-md ring-1 ring-stone-400">
                <Etiqueta datos={datos} w={w} h={h} />
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => window.print()}
              disabled={!datos.producto.trim()}
              className="w-full rounded bg-emerald-800 px-4 py-3 font-medium text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Imprimir {cantidad > 1 ? `${cantidad} etiquetas` : "etiqueta"}
            </button>
            <p className="mt-2 text-xs text-stone-500">
              Para guardar un PDF, elige &quot;Guardar como PDF&quot; en el diálogo de impresión. Funciona mejor en Chrome o Edge.
            </p>
          </div>
        </div>
      </div>

      {createPortal(
        <div id="etiquetas-print-root">
          {Array.from({ length: cantidad }, (_, i) => (
            <Etiqueta key={i} datos={datos} w={w} h={h} />
          ))}
        </div>,
        document.body
      )}
    </section>
  );
}
