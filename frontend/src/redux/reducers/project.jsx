import {
    GET_PROJECT_LIST_SUCCESS,
    GET_PROJECT_LIST_FAIL,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAIL,
    
  
} from '../actions/types';





const initialState = {
    project_list: null,
    project: null,
    count:null,
    next:null,
    previous:null,
   
};

export default function project(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      
        case GET_PROJECT_LIST_SUCCESS:
            return {
                ...state,
                project_list: payload.results.projects,
                count:payload.count,
                next:payload.next,
                previous:payload.previous,
               
            }
        case GET_PROJECT_LIST_FAIL:
            return {
                ...state,
                project_list: null,
                count:null,
                next:null,
                previous:null,
               
            }
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                project: payload.project,
            }
        case GET_PROJECT_FAIL:
            return{
                ...state,
                project: null,
            }

        default:
            return state
    }
}