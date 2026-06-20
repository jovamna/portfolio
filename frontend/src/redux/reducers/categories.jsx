import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    CATEGORY_REDIRECT,
} from '../actions/types';

const initialState = {
    category:null,
    categories: null,
    redirect:null,
    loading:false,
    error:null
};

export default function categories(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_CATEGORIES_SUCCESS:
            console.log('payload', payload);
            return {
                ...state,
                categories: payload.categories
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }
        case GET_CATEGORY_SUCCESS:
            console.log(payload)
            
            return {
                ...state,
                category: payload,
                redirect: null,
                loading: false,
                error: null
                // Verifica la estructura del payload recibido
            }
        case CATEGORY_REDIRECT:
            return{
                ...state,
                redirect:payload,
                loading:false,
                error: null
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                //category: null,
                loading: false,
                error: payload,           // ← No payload.category
                redirect: null
            };

            
        default:
            return state
    }
};