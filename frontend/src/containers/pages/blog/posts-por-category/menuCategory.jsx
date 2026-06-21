// components/CategoryMenuWithSubcategories.jsx

// components/CategoryMenuWithSubcategories.jsx
import { Link, useParams } from 'react-router-dom';
import { BiChevronRight } from "react-icons/bi";

const CategoryMenuWithSubcategories = ({ category, categories }) => {
    const { categorySlug, subcategorySlug } = useParams();
    
    // Si no hay categoría, mostrar solo "All"
    if (!category) {
        return (
            <div className="category-menu-simple flex items-center gap-2 mb-6 p-2 bg-white rounded-xl border border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none">
                <Link
                    to="/blog"
                    className="py-2 px-3 rounded-lg text-xs font-medium bg-indigo-600 text-white shadow-sm shrink-0"
                >
                    📚 All
                </Link>
            </div>
        );
    }
    
    // Obtener todas las subcategorías de la categoría actual
    const subcategories = category.sub_categories || [];
    
    return (
        // 🌟 Cambiado a flex-col para organizar las filas en vertical
        <div className="category-menu-with-subs flex flex-col rounded-xl border border-gray-200 shadow-sm p-4 mb-6 bg-white w-full max-w-full overflow-hidden">
            
            {/* ============================================ */}
            {/* FILA 1: ALL + Categoría Actual */}
            {/* ============================================ */}
            {/* 🌟 overflow-x-auto y whitespace-nowrap activan el scroll horizontal */}
            <div className="flex flex-row items-center gap-2 pb-3 border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-none">
                {/* === LINK "ALL" === */}
                <Link
                    to="/blog"
                    className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-light transition-all duration-200 shrink-0 ${
                        !categorySlug 
                            ? 'bg-mauve-600 text-white shadow-sm' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <span className="flex items-center gap-1">
                        <div className="w-4 h-4 text-gray-900" />
                        All
                    </span>
                </Link>
                
                <span className="text-gray-300 shrink-0">|</span>
                
                {/* === CATEGORÍA ACTUAL (si existe) === */}
                {categorySlug && (
                    <Link
                        to={`/blog/${category.slug}`}
                        className={`px-4 py-2 rounded-full text-center text-xs lg:text-sm font-light transition-all duration-200 shrink-0 ${
                            !subcategorySlug 
                                ? 'bg-mauve-600 text-white shadow-sm' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <span className="flex items-center gap-1">
                            <div className="w-4 h-4" />
                            {category.name}
                        </span>
                    </Link>
                )}
            </div>
            
            {/* ============================================ */}
            {/* FILA 2: Subcategorías (si existen) */}
            {/* ============================================ */}
            {subcategories.length > 0 && (
                // 🌟 En móvil van en columna con su propio scroll, en PC vuelven a fila normal
                <div className="flex flex-col lg:flex-row lg:items-center w-full min-w-0">
                    
                    {/* Título de Subcategoría fijado a la izquierda */}
                    <div className='py-3 pl-2 lg:pl-8 flex flex-row items-center shrink-0'> 
                        <p className="kaushan lg:text-sm text-xs text-gray-800 font-medium tracking-wider">
                            Subcategoría 
                        </p>
                        <BiChevronRight className="text-gray-400" />
                    </div>
                 
                    {/* Contenedor escroleable de los botones de subcategorías */}
                    <div className="flex flex-row items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 lg:pb-0 scrollbar-none min-w-0 w-full">
                        {subcategories.map((sub) => {
                            const isActive = subcategorySlug === sub.slug;
                            
                            return (
                                <Link
                                    key={sub.id}
                                    to={`/blog/${category.slug}/${sub.slug}`}
                                    className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 shrink-0 ${
                                        isActive
                                            ? 'bg-mauve-600 text-white shadow-sm'
                                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
                                    }`}
                                >
                                    <span className="flex items-center gap-1">
                                        <div className="w-4 h-4" />
                                        {sub.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryMenuWithSubcategories;