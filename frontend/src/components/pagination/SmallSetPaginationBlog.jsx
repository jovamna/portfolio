
import {BellIcon} from '@heroicons/react/24/outline'

import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';


function  SmallSetPaginationBlog({count}) {
  const [searchParams, setSearchParams] = useSearchParams();
 
  const currentPage = parseInt(searchParams.get('p') || '1', 10);
  const [active, setActive] = useState(currentPage);
  const listingsPerPage = 20;

 
  const totalPages = Math.ceil(count / listingsPerPage);

  // ★★★ Sincronización clave: actualiza active cuando cambia la URL ★★★
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('p') || '1', 10);
    setActive(pageFromUrl);
    console.log('Sincronizando active → página desde URL:', pageFromUrl);
  }, [searchParams]);


  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    //setActive(newPage);
    setSearchParams({ p: newPage.toString() });
    //window.scrollTo(0, 0);
    // NO fetch aquí – ya lo hace el componente padre
  };

 

  const previous_number = () => changePage(currentPage - 1);
  const next_number = () => changePage(currentPage + 1);
  const visitPage = (page) => changePage(page);

  


  const getNumbers = () => {
    const pages = [];
    let pageNumber = 1;

    for (let i = 0; i < count; i += listingsPerPage) {
      const page = pageNumber;

      const content =
        active === page ? (
          <div key={i} className="hidden md:-mt-px md:flex">
            <div className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              {pageNumber}
            </div>
          </div>
        ) : (
          <div key={i} onClick={() => visitPage(page)} className="hidden md:-mt-px md:flex">
            <div className="cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
              {pageNumber}
            </div>
          </div>
        );

      pages.push(content);
      pageNumber++;
    }

    console.log('📑 Total páginas generadas:', pages.length);
    return pages;
  };

  const pageButtons = getNumbers();

  return (
    <nav className="border-t border-gray-200 px-4 mt-[18px] flex items-center justify-between sm:px-0">
      {/* Botón anterior */}
      {currentPage !== 1 ? (
        <div className="-mt-px w-0 flex-1 flex">
          <button
            onClick={previous_number}
            className="cursor-pointer pr-1 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 hover:border-gray-300"
          >
            <FaArrowLeft className="mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
            Previous
          </button>
        </div>
      ) : (
        <div className="-mt-px w-0 flex-1 flex" />
      )}

      {/* Números de página */}
      {pageButtons}

      {/* Botón siguiente */}
      {pageButtons.length === 0 || currentPage === totalPages ? (
        <div className="-mt-px w-0 flex-1 flex justify-end" />
      ) : (
        <div className="-mt-px w-0 flex-1 flex justify-end">
          <button
            onClick={next_number}
            className="pl-1 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 hover:border-gray-300"
          >
            Next
            <FaArrowRight className="ml-3 h-5 w-5 text-gray-500" aria-hidden="true" />
          </button>
        </div>
      )}
    </nav>
  );
}
export default SmallSetPaginationBlog;