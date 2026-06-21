// components/CategoryBreadcrumbNav.jsx
import { Link, useParams } from 'react-router-dom';
import { BiChevronRight } from "react-icons/bi"; // Usamos tu icono para los separadores

const CategoryBreadcrumbNav = ({ category, categories }) => {
    const { categorySlug, subcategorySlug } = useParams();
    
    // Si no hay categoría, no mostrar nada
    if (!category) return null;
    
    // ============================================
    // 1. CONSTRUIR LA JERARQUÍA
    // ============================================
    const buildHierarchy = (cat) => {
        const hierarchy = [];
        let current = cat;
        
        // Recorrer hacia arriba hasta la raíz
        while (current) {
            hierarchy.unshift({
                name: current.name,
                slug: current.slug,
                isParent: !!current.parent, // Si tiene padre, es subcategoría
            });
            current = current.parent;
        }
        
        return hierarchy;
    };
    
    const hierarchy = buildHierarchy(category);
    
    // ============================================
    // 2. RENDERIZAR
    // ============================================
    return (
        // 🌟 Añadido max-w-full y overflow-hidden para asegurar contención absoluta
        <nav className="category-breadcrumb-nav rounded-lg shadow-sm border border-gray-100 p-4 mb-6 bg-white w-full max-w-full overflow-hidden">
            {/* 🌟 flex-row, overflow-x-auto y whitespace-nowrap para forzar una sola línea deslizable */}
            <div className="flex flex-row items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
                
                {/* === LINK "ALL" === */}
                <Link
                    to="/blog"
                    className={`category-nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shrink-0 ${
                        !categorySlug 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <span className="flex items-center gap-1">
                        <div className="w-4 h-4" />
                        All
                    </span>
                </Link>
                
                {/* === SEPARADOR INICIAL === */}
                <span className="text-gray-300 shrink-0">|</span>
                
                {/* === JERARQUÍA DE CATEGORÍAS === */}
                {/* 🌟 flex-row puro sin wrap para mantener la línea de navegación intacta */}
                <div className="flex flex-row items-center gap-1">
                    {hierarchy.map((item, index) => {
                        const isLast = index === hierarchy.length - 1;
                        const isParent = item.isParent;
                        
                        // Construir la URL para este nivel
                        let toUrl = `/blog/${item.slug}`;
                        
                        // Si tiene padre, es subcategoría, la URL es /blog/padre/subcategoria
                        if (isParent && index > 0) {
                            const parentSlug = hierarchy[index - 1].slug;
                            toUrl = `/blog/${parentSlug}/${item.slug}`;
                        }
                        
                        return (
                            <div key={item.slug} className="flex flex-row items-center shrink-0">
                                {/* 🌟 Separador dinámico real usando tu icono en vez de una caja vacía */}
                                {index > 0 && (
                                    <BiChevronRight className="w-4 h-4 text-gray-400 mx-1 shrink-0" />
                                )}
                                
                                <Link
                                    to={toUrl}
                                    className={`category-nav-link px-3 py-2 
                                        rounded-full 
                                        text-center text-xs lg:text-sm font-light 
                                        transition-all duration-200 shrink-0 ${
                                        isLast && !subcategorySlug
                                            ? 'bg-indigo-600 text-white shadow-md' 
                                            : isLast && subcategorySlug
                                            ? 'bg-mauve-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default CategoryBreadcrumbNav;