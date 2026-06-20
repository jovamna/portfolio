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
    GET_SEARCH_BLOG_FAIL
  
} from '../actions/types';

const initialState = {
    blog_list: null,
    blog_list_category: null,
    blog_list_subcategory: null,
    postCategory: null, // Añadido para almacenar la categoría y subcategorías es el category dde productos
    subcategory: null,
    filtered_posts: null,  //ESTE NO ESTA
    post: null,
    count: null,
    next: null,
    previous: null
};

export default function blog(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        
        case GET_BLOG_LIST_CATEGORIES_SUCCESS:
            return {
                ...state,
                blog_list_category: payload.results && payload.results.posts 
                     ? payload.results.posts 
                     : [],
                count: payload.count || 0,
                next: payload.next,
                previous: payload.previous,
                postCategory: payload.results.category || null,
            };
        case GET_BLOG_LIST_CATEGORIES_FAIL:
            return {
                ...state,
                blog_list_category: null,
                postCategory: null, // Guarda la categoría y subcategorías
                count: null,
                next: null,
                previous: null,
            }
        case GET_BLOG_LIST_SUBCATEGORIES_SUCCESS:
            console.log('payload', payload);
            return {
                ...state,
                blog_list_subcategory: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
                postCategory: payload.results.category || null,
                subcategory: payload.results.subcategory || null,
            }
        case GET_BLOG_LIST_SUBCATEGORIES_FAIL:
            return {
                ...state,
                postCategory: null, // Guarda la categoría y subcategorías
                subcategory: null,  // Limpia la subcategoría en caso de 
                blog_list_subcategory:[],
                count: null,
                next: null,
                previous: null,
            }
        case CLEAN_BLOG_LIST_SUBCATEGORY:
            return {
                ...state,
                blog_list_subcategory: null, // O [] según lo que uses
                count:0
             }
        case GET_BLOG_LIST_SUCCESS:
            return {
                ...state,
                blog_list: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_BLOG_LIST_FAIL:
            return {
                ...state,
                blog_list: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_BLOG_SUCCESS:
            console.log(payload)
            return {
                ...state,
                post: payload
            }
        case GET_BLOG_FAIL:
            return {
                ...state,
                post: null
            }
        case GET_SEARCH_BLOG_SUCCESS:
            console.log(payload)
            return {
                ...state,
                filtered_posts: payload.results.filtered_posts, //payload=res.data y results filtered_posts=encabezados del res data  
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
               
            }
        case GET_SEARCH_BLOG_FAIL:
            return {
                ...state,
                filtered_posts: null,
                count: null,
                next: null,
                previous: null,
            }
        

        default:
            return state
    }
}