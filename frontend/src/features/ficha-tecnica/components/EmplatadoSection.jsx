import { useRef, useState } from 'react';

const MAX_SIZE_MB = 4;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;
const COMPRESSION_QUALITY = 0.88;

export default function EmplatadoSection({ values, onChange }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  const setDescripcion = (e) =>
    onChange({ ...values, descripcion: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen.');
      return;
    }

    const sizeMB = (file.size / 1024 / 1024);

    if (sizeMB > MAX_SIZE_MB) {
      setError(`La imagen no puede superar los ${MAX_SIZE_MB} MB. Actual: ${sizeMB.toFixed(1)} MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const isPng = file.type === 'image/png';
        const base64 = isPng 
          ? canvas.toDataURL('image/png', 0.95)
          : canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);

        onChange({ ...values, imagen: base64, imagenNombre: file.name });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setError(null);
    onChange({ ...values, imagen: null, imagenNombre: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className=" ">
         <h2 className="text-base lg:text-lg font-bold text-black mb-4 underline underline-offset-4">
        Emplatado
      </h2>

      <div className="flex flex-col mb-[20px]">
        <label className="" htmlFor="descEmplatado">
          Indicaciones de presentación:
        </label>
        <textarea
          id="descEmplatado"
          placeholder="Ej: Servir en plato hondo, el risotto en el centro, virutas de trufa por encima, hilo de aceite alrededor..."
          value={values.descripcion || ''}
          onChange={setDescripcion}
          className=""
          rows={3}
        />
      </div>

      {/* FOTO */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-600 mb-2">
          Foto de referencia (opcional)
        </label>

        {/* Aviso estático claro */}
        <p className="text-amber-700 text-xs bg-amber-50 border border-amber-200 p-3 rounded-lg mb-4">
          ⚠️ <strong>Importante:</strong> Máximo {MAX_SIZE_MB} MB por imagen.<br />
          Si la foto es pesada, puede tardar unos segundos en procesarse.
        </p>

        {!values.imagen ? (
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/20 px-4 py-6 rounded-xl cursor-pointer transition-all group text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="sr-only"
            />
            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
              📷
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors mb-1">
              Haz clic para subir una foto del emplatado
            </span>
            <span className="text-xs text-gray-400">
              JPG o PNG • Máximo {MAX_SIZE_MB} MB
            </span>
          </label>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <img 
              src={values.imagen} 
              alt="Vista previa del emplatado" 
              className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm shrink-0" 
            />
            <div className="flex flex-col items-center sm:items-start gap-1 w-full min-w-0">
              <span className="text-sm font-medium text-gray-700 truncate w-full text-center sm:text-left">
                {values.imagenNombre}
              </span>
              <button 
                type="button" 
                onClick={removeImage} 
                className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors mt-1"
              >
                Quitar imagen
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
        )}
      </div>
    </section>
  );
}