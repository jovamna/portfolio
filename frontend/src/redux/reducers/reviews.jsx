import {
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    FILTER_REVIEWS_SUCCESS,
    FILTER_REVIEWS_FAIL,
    
} from '../actions/types';

const initialState = {
    review: null,
    reviews: [],  // ✅ Cambiado de null a []
    totalReviews: 0,  // ✅ Agregado
};

export default function Reviews(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_REVIEWS_SUCCESS:
            console.log("📦 REDUCER - GET_REVIEWS_SUCCESS:", payload);
            return {
                ...state,
                reviews: payload?.reviews || [],  // ✅ Siempre será array
                totalReviews: payload?.totalReviews || 0,
            };
        case GET_REVIEWS_FAIL:
            return {
                ...state,
                reviews: [],  // ✅ Array vacío
                totalReviews: 0,
            };
        case GET_REVIEW_SUCCESS:
            console.log("📦 REDUCER - GET_REVIEW_SUCCESS:", payload);
            return {
                ...state,
                review: payload?.review || null
            };
        case GET_REVIEW_FAIL:
            return {
                ...state,
                review: null
            };
        case CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                review: payload?.review || null,
                reviews: payload?.reviews || []
            };
        case CREATE_REVIEW_FAIL:
            return {
                ...state,
                review: null
            };
        case UPDATE_REVIEW_SUCCESS:
            console.log("📦 REDUCER - UPDATE_REVIEW_SUCCESS:", payload);
            return {
                ...state,
                review: payload?.review || null,
                reviews: payload?.reviews || []
            };
        case UPDATE_REVIEW_FAIL:
            return {
                ...state
            };
        case DELETE_REVIEW_SUCCESS:
            const updatedReviews = state.reviews.filter(review => review.id !== payload);
            console.log("📦 REDUCER - DELETE_REVIEW_SUCCESS:", payload);
            return {
                ...state,
                review: null,
                reviews: updatedReviews || []
            };
        case DELETE_REVIEW_FAIL:
            return {
                ...state
            };
        case FILTER_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: payload?.reviews || []
            };
        case FILTER_REVIEWS_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
}