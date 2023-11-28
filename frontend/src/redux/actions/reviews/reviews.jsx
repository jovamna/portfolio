import axios from 'axios';
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
    
} from '../types';
import { setAlert } from '../alert';


const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_API_URL
    : "http://localhost:8000";

console.log(URL);






export const get_reviews = slug => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${URL}/api/reviews/get-reviews/${slug}`, config
        );

        if (res.status === 200) {
            dispatch({
                type: GET_REVIEWS_SUCCESS,
                payload: {
                    reviews: res.data.reviews, // Asegúrate de que 'res.data.reviews' contiene las reseñas
                    totalReviews: res.data.total_reviews, // Asegúrate de que 'res.data.total_reviews' contiene el total de reseñas
                  }
            });
        } else {
            dispatch({
                type: GET_REVIEWS_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: GET_REVIEWS_FAIL
        });
    }
}


export const get_review = (review_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    try {
        const res = await axios.get(`${URL}/api/reviews/get-review/${review_id}`, config);
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: GET_REVIEW_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_REVIEW_FAIL});
            }
        } catch(err) {
            dispatch({
                type: GET_REVIEW_FAIL
            });
        }
    }







export const create_review = (slug, hearts, title, comment) => async dispatch=> {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
               
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        };

        const body = JSON.stringify({
            hearts,
            comment,
            title,
          
        });

        try {
            const res = await axios.post(`${URL}/api/reviews/create-review/${slug}`, body, config);
            console.log(res)

            if (res.status === 201) {
                dispatch({
                    type: CREATE_REVIEW_SUCCESS,
                    payload: res.data
                });
                dispatch(setAlert('Reviews success', 'green'));
            } else {
                dispatch({
                    type: CREATE_REVIEW_FAIL
                });
                dispatch(setAlert('error', 'green'));
            }
        } catch(err) {
            dispatch({
                type: CREATE_REVIEW_FAIL
            });
            dispatch(setAlert('error en el servidor', 'green'));
        }
    }


}








export const update_review = (slug, review_id, hearts, comment) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
               
            },
            
        };

        const body = JSON.stringify({
            hearts,
            comment,
       
            
        });
        console.log(body)
        const updateUrl = `${URL}/api/reviews/update-review/${slug}/${review_id}`;
        console.log("Update URL:", updateUrl);

        try {
            const res = await axios.put(updateUrl, body, config);
            console.log(res)

            if (res.status === 200) {
                dispatch({
                    type: UPDATE_REVIEW_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: UPDATE_REVIEW_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: UPDATE_REVIEW_FAIL
            });
        }
    }
}






export const delete_review =(review_id) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
            data: {}
        };
        const updateUrl = `${URL}/api/reviews/delete-review/${review_id}`;
        console.log("Update URL:", updateUrl);

        try {
            const res = await axios.delete(updateUrl, config);
            console.log(res)

            if (res.status === 204) {
                // Dispatch an action to remove the deleted review from the Redux state
                dispatch({
                    type: DELETE_REVIEW_SUCCESS,
                    payload: review_id // Send the ID of the deleted review to update Redux state
                });
            } else {
                dispatch({
                    type: DELETE_REVIEW_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: DELETE_REVIEW_FAIL
            });
        }
    }
};



export const filter_reviews = (slug, hearts) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    let myHeart;

    if (hearts === 0.5)
        myHeart = '0.5';
    else if (hearts === 1 || hearts  === 1.0)
        myHeart = '1.0';
    else if (hearts === 1.5)
        myHeart = '1.5';
    else if (hearts === 2 || hearts  === 2.0)
        myHeart = '2.0';
    else if (hearts === 2.5)
        myHeart = '2.5';
    else if (hearts === 3 || hearts  === 3.0)
        myHeart = '3.0';
    else if (hearts === 3.5)
       myHeart = '3.5';
    else if (hearts === 4 || hearts  === 4.0)
       myHeart = '4.0';
    else if (hearts === 4.5)
       myHeart = '4.5';
    else
       myHeart = '5.0';

        try {
            const res = await axios.get(`${URL}/api/reviews/filter-reviews/${slug}?hearts=${myHeart}`, config
            );
    
            if (res.status === 200) {
                dispatch({
                    type: FILTER_REVIEWS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: FILTER_REVIEWS_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: FILTER_REVIEWS_FAIL
            });
        }
}
