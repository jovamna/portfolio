// components/CategoryBreadcrumbNav.jsx
import { Link, useParams } from 'react-router-dom';
//import { ChevronRight, Home } from 'lucide-react'; // o cualquier icono que uses

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
        <nav className="category-breadcrumb-nav rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
                {/* === LINK "ALL" === */}
                <Link
                    to="/blog"
                    className={`category-nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                
                {/* === SEPARADOR === */}
                <span className="text-gray-300">|</span>
                
                {/* === JERARQUÍA DE CATEGORÍAS === */}
                <div className="flex flex-wrap items-center gap-1">
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
                            <div key={item.slug} className="flex items-center">
                                {/* Separador entre niveles */}
                                {index > 0 && (
                                    <div className="w-4 h-4 text-gray-400 mx-1" />
                                )}
                                
                                <Link
                                    to={toUrl}
                                    className={`category-nav-link px-4 py-2 
                                        rounded-full text-sm font-medium 
                                        transition-all duration-200 ${
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