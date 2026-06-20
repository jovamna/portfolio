import axios from 'axios';
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    CATEGORY_REDIRECT,
} from './types';




const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_API_URL
    : "http://localhost:8000";

console.log(URL);



export const get_categories = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${URL}/api/category/categories`, config);
        console.log(res)

        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORIES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        });
    }
};




export const get_category = (slugs = {}) => async (dispatch) => {
    const {
        categorySlug,
        subcategorySlug = null,
    } = slugs;

    if (!categorySlug || categorySlug === 'undefined') {
        return { redirect: false, error: "No categorySlug" };
    }

    let url = `${URL}/api/category/${categorySlug}/`;
    if (subcategorySlug) url += `${subcategorySlug}/`;
   

    try {
        const res = await axios.get(url);
        console.log("Respuesta del servidor:", res.data);

        if (res.data?.redirect === true) {
            dispatch({ type: CATEGORY_REDIRECT, payload: res.data });
            return { redirect: true, data: res.data };
        }

        dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data });
        return { redirect: false, data: res.data };

    } catch (err) {
        // Manejo de 301 aunque ya no debería llegar
        if (err.response?.status === 301 || err.response?.data?.redirect) {
            const data = err.response?.data || {};
            dispatch({ type: CATEGORY_REDIRECT, payload: data });
            return { redirect: true, data };
        }

        dispatch({ type: GET_CATEGORY_FAIL, payload: err.message });
        return { redirect: false, error: err.message };
    }
};


