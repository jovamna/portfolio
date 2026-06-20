// components/CategoryMenuWithSubcategories.jsx
import { Link, useParams } from 'react-router-dom';
import { BiChevronRight } from "react-icons/bi";
//import { ChevronRight, Home, Folder, FolderOpen } from 'lucide-react'; // o tus iconos

const CategoryMenuWithSubcategories = ({ category, categories }) => {
    const { categorySlug, subcategorySlug } = useParams();
    
    // Si no hay categoría, mostrar solo "All"
    if (!category) {
        return (
            <div className="category-menu-simple flex flex-wrap items-center gap-2 mb-6 p-4 bg-white rounded-xl border border-gray-200">
                <Link
                    to="/blog"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white shadow-sm"
                >
                    📚 All
                </Link>
            </div>
        );
    }
    
    // Obtener todas las subcategorías de la categoría actual
    const subcategories = category.sub_categories || [];
    
    return (
        <div className="category-menu-with-subs flex flex-row rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
            {/* ============================================ */}
            {/* FILA 1: ALL + Categoría Actual */}
            {/* ============================================ */}
            <div className="flex flex-wrap items-center gap-2  border-b border-gray-100">
                {/* === LINK "ALL" === */}
                <Link
                    to="/blog"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        !categorySlug 
                            ? 'bg-mauve-600 text-white shadow-sm' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <span className="flex items-center gap-1">
                        <div className="w-4 h-4 text-gray-900 " />
                        All
                    </span>
                </Link>
                
                <span className="text-gray-300">|</span>
                
                {/* === CATEGORÍA ACTUAL (si existe) === */}
                {categorySlug && (
                    <Link
                        to={`/blog/${category.slug}`}
                        className={`pr-4 py-2 rounded-full
                             text-center text-sm font-medium 
                             transition-all duration-200 ${
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
                <div className=" flex flex-row">
                    <div className='py-3 pl-8 flex flex-row items-center'> 
                           <p className="kaushan lg:text-sm text-xs text-gray-800 font-medium tracking-wider ">
                        Subcategoría 
                      </p>

                      <BiChevronRight />
                    </div>
                 
                    <div className="flex flex-wrap items-center gap-2">
                        {subcategories.map((sub) => {
                            const isActive = subcategorySlug === sub.slug;
                            
                            return (
                                <Link
                                    key={sub.id}
                                    to={`/blog/${category.slug}/${sub.slug}`}
                                    className={`px-2 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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