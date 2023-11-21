
import axios from "axios";
import{
    GET_PROJECT_LIST_SUCCESS,
    GET_PROJECT_LIST_FAIL,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAIL,
  
} from "./types"

export const get_project_list = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/myprojects/list`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PROJECT_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PROJECT_LIST_FAIL
            });
        }
    }catch{
        dispatch({
            type: GET_PROJECT_LIST_FAIL
        });
    }

}


export const get_project_list_page = (p) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/myprojects/list?p=${p}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PROJECT_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PROJECT_LIST_FAIL
            });
        }
    }catch{
        dispatch({
            type: GET_PROJECT_LIST_FAIL
        });
    }

}




export const get_project = (slug) => async dispatch =>{
    const config = {
        headers: {
            'Accept' : 'application/json'
        }
    };
    try{
        const res = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/myprojects/${slug}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_PROJECT_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PROJECT_FAIL
            });
        }
    }catch(err){
        dispatch({
            dispatch: GET_PROJECT_FAIL
        })
    }

}