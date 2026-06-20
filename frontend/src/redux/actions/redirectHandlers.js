

// ==================== PARA PRODUCTOS DIGITALES ====================
// src/redux/actions/redirectHandlers.js

// NO importamos nada de react-router-dom aquí

export const handleProductRedirect = (response, navigate) => {
    if (!response?.data?.redirect) return false;

    const newSlug = response.data.new_slug || response.data.new_slugs?.productSlug;
    
    if (newSlug && navigate) {
        navigate(`/producto-digital/${newSlug}`, { replace: true });
        return true;
    }
    return false;
};



// ==================== PARA CATEGORÍAS (jerarquía) ====================
// src/redux/actions/redirectHandlers.js


export const handleCategoryRedirect = (response, navigate) => {
    if (!response?.data?.redirect) return false;

    const newSlugs = response.data.new_slugs || {};

    if (Object.keys(newSlugs).length === 0) return false;

    const parts = [];
    if (newSlugs.categorySlug) parts.push(newSlugs.categorySlug);
    if (newSlugs.subcategorySlug) parts.push(newSlugs.subcategorySlug);
    

    if (parts.length > 0 && navigate) {
        navigate(`/${parts.join('/')}`, { replace: true });
        return true;
    }
    return false;
};
