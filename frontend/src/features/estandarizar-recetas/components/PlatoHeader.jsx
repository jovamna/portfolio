import { TEMPERATURAS } from '../../../utils/hosteleria/estandarizar-recetas/fichaUtils';

const CATEGORIAS = [
  { value: 'entrante', label: 'Entrante' },
  { value: 'primero',  label: 'Primer plato' },
  { value: 'segundo',  label: 'Segundo plato' },
  { value: 'postre',   label: 'Postre' },
  { value: 'otro',     label: 'Otro' },
];





export default function PlatoHeader({ values, onChange }) {
  //const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  const set = (key) => (e) => {
    const val = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange({ ...values, [key]: val });
  };





  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-700">
      <h2 className="text-base lg:text-base font-bold text-black lg:mb-6 mb-4 underline underline-offset-4 uppercase">
        Datos del plato
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

           <div className="flex flex-col mb-4">
           <label className="text-sm font-semibold text-gray-600 mb-1" htmlFor="nombrePlato">
           Nombre del plato
          </label>
            <input
            id="nombrePlato"
            type="text"
            placeholder="Ej: Risotto de setas y trufa"
            value={values.nombrePlato}
            onChange={set('nombrePlato')}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          </div>
  

       <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1" htmlFor="tiempoElaboracion">
            Tiempo de elaboración
          </label>
          <input
            id="tiempoElaboracion"
            type="text"
            placeholder="Ej: 35 min"
            value={values.tiempoElaboracion}
            onChange={set('tiempoElaboracion')}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Temperatura de servicio</label>
          <select
            value={values.temperatura}
            onChange={set('temperatura')}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
          >
            {TEMPERATURAS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>









 {/* Categoría (NUEVO) */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Categoría</label>
          <select
            value={values.categoria || 'entrante'}
            onChange={set('categoria')}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
          >
            {CATEGORIAS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Raciones (NUEVO) */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">Raciones (porciones)</label>
          <input
            type="number"
            min={0}
            step={1}
            placeholder="Ej: 4"
            value={values.raciones || 1}
            onChange={set('raciones')}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>










 <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1" htmlFor="tiempoElaboracion">
            Mano de Obra
          </label>
          <input
            id="ManodeObra"
            type="text"
            placeholder="Ej: 3 colaboradores"
            value={values.ManodeObra}
            onChange={set('ManodeObra')}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>











        </div>

     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:mt-[10px]">
       

       

      </div>






    </section>
  );
}