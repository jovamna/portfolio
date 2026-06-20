import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

function CategoriesSmallSetPagination({
  count,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Leemos la página de la URL inicialmente, si no hay, es 1
  const active = parseInt(searchParams.get('p')) || 1; 

  const listingsPerPage = 16;
 
  const totalPages = Math.ceil(count / listingsPerPage);

  // 1. Sincronizar la URL cuando cambiamos de página
  const updatePage = (page) => {
    setSearchParams({ p: page }); // Solo cambiamos la URL
    window.scrollTo(0, 0);
  };

  
const previous_number = () => { if (active > 1) updatePage(active - 1); };
  const next_number = () => { if (active < totalPages) updatePage(active + 1); };
  const visitPage = (page) => {
    console.log('👣 Navegando a página:', page);
    updatePage(page);
  };

 
  const getNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <div 
          key={i} 
          onClick={() => active !== i && visitPage(i)}
          className={`cursor-pointer border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${
            active === i 
            ? "border-indigo-500 text-indigo-600" 
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {i}
        </div>
      );
    }
    return pages;
  };

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-8">
      <div className="-mt-px w-0 flex-1 flex">
        {active > 1 && (
          <button
            onClick={previous_number}
            className="pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <FaArrowLeft className="mr-3 h-5 w-5 text-gray-400" />
            Anterior
          </button>
        )}
      </div>

      <div className="hidden md:-mt-px md:flex">
        {getNumbers()}
      </div>

      <div className="-mt-px w-0 flex-1 flex justify-end">
        {active < totalPages && (
          <button
            onClick={next_number}
            className="pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Siguiente
            <FaArrowRight className="ml-3 h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
    </nav>
  );
}

export default CategoriesSmallSetPagination;