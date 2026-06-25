import { fmtEur, fmtPct } from '../../../utils/irpfCalc';


// ─── Sub-components ───────────────────────────────────────────────────────────

import { useEffect } from 'react';

// Componente auxiliar BigStat Mejorado
function BigStat({ label, value, sub, textColorClass }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
        {label}
      </p>
      <p className={`text-3xl font-bold tracking-tighter mt-2 mb-1 ${textColorClass || 'text-gray-900'}`}>
        {value}
      </p>
      {sub && <p className="text-sm text-gray-500 font-medium">{sub}</p>}
    </div>
  );
}


// Componente auxiliar Row Mejorado
function Row({ label, value, indent, highlight }) {
  return (
    <div className={`flex justify-between items-center py-3 text-sm border-b border-gray-100 last:border-none px-1 ${
      indent ? 'pl-6' : ''
    } ${highlight ? 'bg-blue-50/70 rounded-2xl font-semibold' : ''}`}>
      <span className={highlight ? 'text-gray-700' : 'text-gray-600'}>
        {label}
      </span>
      <span className={`font-medium ${highlight ? 'text-blue-600' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}



// ─── Componente Principal Mejorado ─────────────────────────────────────
export default function ResultsPanel({ result }) {
  
  if (!result) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center px-6 bg-white rounded-3xl border border-gray-100">
        <div className="text-5xl mb-4 opacity-75">📊</div>
        <p className="text-lg font-semibold text-gray-600">
          Introduce tu salario bruto
        </p>
        <p className="text-sm text-gray-500 mt-2">
          El desglose aparecerá aquí
        </p>




      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:flex lg:flex-col">
        <BigStat
          label="Neto mensual estimado"
          value={fmtEur(result.netoMensual)}
          sub={`de ${fmtEur(result.brutoMensual)} bruto`}
          textColorClass="text-emerald-600"
        />
        <BigStat
          label="Retención IRPF"
          value={`${result.tipoRetencionPct.toFixed(1)} %`}
          sub={`${fmtEur(result.retencionMensual)} / mes`}
          textColorClass="text-red-600"
        />
        <BigStat
          label="Seguridad Social"
          value={fmtEur(result.ssMensual)}
          sub="Cuota trabajador"
          textColorClass="text-amber-600"
        />
      </div>

      {/* Barra de Distribución */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <p className="text-xs font-semibold text-gray-500 mb-3">
          Distribución mensual
          </p>
        <div className="w-full h-4 rounded-2xl overflow-hidden bg-gray-100 flex shadow-inner">
          <div
            className="bg-emerald-500 transition-all duration-500"
            style={{ width: `${(result.netoMensual / result.brutoMensual) * 100}%` }}
          />
          <div
            className="bg-red-500 transition-all duration-500"
            style={{ width: `${(result.retencionMensual / result.brutoMensual) * 100}%` }}
          />
          <div
            className="bg-amber-500 transition-all duration-500"
            style={{ width: `${(result.ssMensual / result.brutoMensual) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-xs font-medium mt-3 text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500">■</span> Neto
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-red-500">■</span> IRPF
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-amber-500">■</span> Seguridad Social
          </span>
        </div>
      </div>

      {/* Desglose Detallado */}
    {/* Desglose Detallado */}
<details className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
  <summary className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
    <span className="font-semibold text-gray-700">Ver desglose completo del cálculo</span>
    <span className="text-xl transition-transform group-open:rotate-180 text-gray-400">▼</span>
  </summary>

  <div className="px-6 pb-6 flex flex-col gap-4 border-t border-gray-100 pt-5">
    <p className="uppercase text-xs font-bold text-gray-400 tracking-wider">Cálculo Anual Base</p>
    
    <Row label="Salario bruto anual" value={fmtEur(result.salarioBruto)} />
    <Row label="− Cotización Seguridad Social" value={`−${fmtEur(result.cotizacionSS)}`} indent />
    <Row label="− Gastos deducibles" value="−2.000,00 €" indent />
    <Row label="= Rendimiento neto del trabajo" value={fmtEur(result.rendimientoNeto)} highlight />

    <Row 
      label="− Reducción por rendimientos del trabajo" 
      value={`−${fmtEur(result.reduccionRendimientos)}`} 
      indent 
    />
    <Row 
      label="= Base para retención" 
      value={fmtEur(result.baseRetencion)} 
      highlight 
    />

    {result.baseRetencion <= 0 && (
      <p className="text-amber-600 text-sm mt-1 pl-6">
        ⚠️ La base queda en 0 € → se aplica el tipo mínimo del 2%
      </p>
    )}

    <p className="uppercase text-xs font-bold text-gray-400 tracking-wider mt-4">Mínimo Personal y Familiar</p>
    <Row label="Mínimo personal" value={fmtEur(result.minimoPersonal)} indent />
    {result.minimoDescendientes > 0 && (
      <Row label="Mínimo por descendientes" value={fmtEur(result.minimoDescendientes)} indent />
    )}
    {result.minimoAscendientes > 0 && (
      <Row label="Mínimo por ascendientes" value={fmtEur(result.minimoAscendientes)} indent />
    )}
    {result.reduccionDiscap > 0 && (
      <Row label="Reducción por discapacidad" value={fmtEur(result.reduccionDiscap)} indent />
    )}
    <Row label="Total mínimo personal y familiar" value={fmtEur(result.minimoTotal)} highlight />

    <p className="uppercase text-xs font-bold text-gray-400 tracking-wider mt-4">Otros datos</p>
    <Row label="Comunidad Autónoma" value={result.ccaa?.toUpperCase() || 'MEDIA'} />

    <p className="uppercase text-xs font-bold text-gray-800 tracking-wider underline underline-offset-8 mt-4">
      Resultado Final
    </p>
    <Row label="Retención anual estimada" value={fmtEur(result.retencionAnual)} highlight />
    <Row label="Tipo de retención efectivo" value={fmtPct(result.tipoRetencion)} highlight />
  </div>
</details>

      {/* Disclaimer */}
      <p className="text-xs leading-relaxed text-gray-500 bg-gray-50 p-5 rounded-2xl border border-gray-100">
        Esta es una estimación orientativa según la normativa estatal del IRPF. El resultado puede variar según tu comunidad autónoma y situación personal. 
        Para un cálculo oficial, utiliza el{' '}
        <a
          href="https://sede.agenciatributaria.gob.es"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          calculador de la AEAT
        </a>.
      </p>


      <p className="text-xs text-amber-600 font-medium">
  ⚠️ Estimación orientativa 2026. No considera otras rentas ni reducciones autonómicas específicas.
</p>
    </div>
  );
}