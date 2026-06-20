import axios from 'axios';
import {
    GET_BLOG_LIST_SUCCESS,
    GET_BLOG_LIST_FAIL,
    GET_BLOG_SUCCESS,
    GET_BLOG_FAIL,
    GET_BLOG_LIST_CATEGORIES_SUCCESS,
    GET_BLOG_LIST_CATEGORIES_FAIL,
    GET_BLOG_LIST_SUBCATEGORIES_SUCCESS,
    GET_BLOG_LIST_SUBCATEGORIES_FAIL,
    CLEAN_BLOG_LIST_SUBCATEGORY,
    GET_SEARCH_BLOG_SUCCESS,
    GET_SEARCH_BLOG_FAIL ,

   
} from "./types"





const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_API_URL
    : "http://localhost:8000";

console.log(URL);



export const get_blog_list = (p = 1) => async dispatch => {
    console.log(`Cargando lista general del blog - Página: ${p}`);

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        // Usamos la variable dinámica p para la paginación (?p=)
        const res = await axios.get(`${URL}/api/blog/list?p=${p}`, config);
        console.log(res);

        if (res.status === 200) {
            dispatch({
                type: GET_BLOG_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_BLOG_LIST_FAIL
            });
        }

    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_BLOG_LIST_FAIL
        });
    }
}



//PRODUCTOS LSITADOS POR CATEGORIA
export const FUNCIONAget_blog_list_category = (category_slug, page = 1, navigate) => async dispatch => {
    const config = { headers: { 'Accept': 'application/json' } };
    
    try {
        // Si page no se envía, usará 1. La URL siempre será consistente.
        const res = await axios.get(`${URL}/api/blog/category/${category_slug}?p=${page}`, config);

        if (handleCategoryRedirect(res, navigate)) return;  // ← Redirección ULTIMO
        
        if (res.status === 200) {
            dispatch({
                type: GET_BLOG_LIST_CATEGORIES_SUCCESS,
                payload: res.data
            });
            return res.data; // Mantenemos el return para que tus componentes no sufran
        }
    } catch (err) {
        // Axios a veces lanza 301 al catch
        if (handleCategoryRedirect(err.response, navigate)) return; //ULTIMO
        dispatch({ type: GET_BLOG_LIST_CATEGORIES_FAIL });
        throw err;
    }
};



export const get_blog_list_category = (category_slug, p = 1, navigate = null) => 
  async (dispatch) => {
    
    console.log(`=== get_blog_list_category llamado con slug: ${category_slug}`);

    const config = {
        headers: { 'Accept': 'application/json' }
    };

    try {
        const res = await axios.get(
            `${URL}/api/blog/category/${category_slug}?p=${p}`, 
            config
        );

        console.log("✅ Respuesta 200 OK:", res.data);

        // === DISPATCH SUCCESS (esto es lo que estaba faltando) ===
        dispatch({
            type: GET_BLOG_LIST_CATEGORIES_SUCCESS,
            payload: res.data   // ← Aquí va toda la respuesta (count, results, etc.)
        });

        return res.data;

    } catch (err) {
        console.error("=== ERROR EN THUNK ===", err);

        if (err.response?.status === 308) {
            console.log("308 DETECTADO - Data completa:", err.response.data);
            
            const data = err.response.data;
            
            if (data.redirect === true && data.frontend_url) {
                console.log("🔄 Redirigiendo a:", data.frontend_url);
                
                if (navigate) {
                    navigate(data.frontend_url, { replace: true });
                } else {
                    window.location.replace(data.frontend_url);
                }
                return { redirected: true, url: data.frontend_url };
            }
        } 
        
        // Otros errores (404, 500, etc.)
        dispatch({ type: GET_BLOG_LIST_CATEGORIES_FAIL });
        throw err;   // Para que el componente lo pueda cachar
    }
};



export const get_blog_list_subcategory = (category_slug, subcategory_slug, p = 1) => async dispatch => {
    console.log(`Buscando Subcategoría: ${subcategory_slug} en Padre: ${category_slug}, Página: ${p}`);

    dispatch({ type: CLEAN_BLOG_LIST_SUBCATEGORY });

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        // Hacemos la petición combinando ambos slugs y la página dinámica
        const res = await axios.get(`${URL}/api/blog/category/${category_slug}/${subcategory_slug}?p=${p}`, config);
        console.log(res);

        // 1. CONTROL DE REDIRECCIÓN EN EL RESPOND (Si viniera con status 200)
        if (res.data && res.data.redirect === true) {
            dispatch({
                type: GET_BLOG_LIST_SUBCATEGORIES_SUCCESS, // Reutiliza tu success de categorías si manejan el mismo estado
                payload: res.data
            });
            return res.data;
        }

        if (res.status === 200) {
            dispatch({
                type: GET_BLOG_LIST_SUBCATEGORIES_SUCCESS,
                payload: res.data
            });
            return res.data;
        } else {
            dispatch({ type: GET_BLOG_LIST_SUBCATEGORIES_FAIL });
        }

    } catch (error) {
        console.error(error);
        
        // 2. CONTROL DE REDIRECCIÓN EN EL CATCH (Para el estatus 308 del backend)
        if (error.response && error.response.data && error.response.data.redirect === true) {
            dispatch({
                type: GET_BLOG_LIST_SUBCATEGORIES_SUCCESS,
                payload: error.response.data
            });
            return error.response.data; // Crucial para que el componente React haga el navigate
        }

        dispatch({
            type: GET_BLOG_LIST_SUBCATEGORIES_FAIL
        });
    }
}






export const get_blog = (post_slug, navigate) => async dispatch => {
    
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${URL}/api/blog/detail/${post_slug}`, config);
        console.log("📦 Respuesta 200:", res.data);

        // ✅ VERIFICAR SI LA RESPUESTA 200 CONTIENE REDIRECCIÓN
        if (res.data?.redirect === true && res.data?.new_slugs) {
            console.log("🔄 Redirección en respuesta 200!");
            console.log("📋 new_slugs:", res.data.new_slugs);
            console.log("🔗 frontend_url:", res.data.frontend_url);
            
            // Construir la URL correcta
            const newPath = '/blog/post/' + res.data.new_slugs[0];
            
            if (navigate) {
                navigate(newPath, { replace: true });
            } else {
                window.location.replace(newPath);
            }
            return { redirected: true, url: newPath };
        }

        // Si no hay redirección, procesar normal
        if (res.status === 200) {
            dispatch({
                type: GET_BLOG_SUCCESS,
                payload: res.data
            });
            return res.data;
        } else {
            dispatch({
                type: GET_BLOG_FAIL
            });
        }
    } catch (err) {
        console.error("=== ERROR EN THUNK ===", err);

        // ✅ MANEJAR ERROR 308 (redirección)
        if (err.response?.status === 308) {
            console.log("🔄 308 DETECTADO!");
            console.log("📦 Data:", err.response.data);
            
            const data = err.response.data;
            
            if (data.redirect === true && data.frontend_url) {
                console.log("✅ Redirigiendo a:", data.frontend_url);
                
                if (navigate) {
                    navigate(data.frontend_url, { replace: true });
                } else {
                    window.location.replace(data.frontend_url);
                }
                return { redirected: true, url: data.frontend_url };
            }
        } 

        // ✅ MANEJAR ERROR 404
        if (err.response?.status === 404) {
            console.log("❌ Post no encontrado");
            dispatch({
                type: GET_BLOG_FAIL,
                payload: 'Post not found'
            });
            return { error: 'Post not found' };
        }

        dispatch({
            type: GET_BLOG_FAIL,
            payload: err.message
        });
        throw err;
    }
};


export const search_blog = (search_term) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${URL}/api/blog/search?s=${search_term}`, config);
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_BLOG_SUCCESS,
                payload: res.data  
            });
        } else {
            dispatch({
                type: GET_SEARCH_BLOG_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_BLOG_FAIL
        });
    }
};


//const res = await axios.get(`http://127.0.0.1:8000/api/blog/search?s=${search_term}`, config);


export const search_blog_page = (search_term,page) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${URL}/api/blog/search?p=${page}&s=${search_term}`, config);
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_BLOG_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SEARCH_BLOG_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_BLOG_FAIL
        });
    }
};