import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL

} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: localStorage.getItem('access') ? true : false, 
    user: null,
    loading: false,
}

export default function Auth(state = initialState, action){
    const {type, payload} = action;

    switch(type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        case USER_LOADED_SUCCESS:
            console.log(payload)
            return {
                ...state,
                user: payload
            }
            
        case USER_LOADED_FAIL:
            console.log(payload)
            return {
                ...state,
                user: null,
                error: payload, // Agregar el mensaje de error
            }
     
        case AUTHENTICATED_SUCCESS:
            console.log(payload)
            return {
                ...state,
                isAuthenticated: true
                }
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null
                }

        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access); //payload.token es porque al hacer postamn del login la respuesta da token  y no access y payload viene de login actions
            //localStorage.setItem('refresh', payload.refresh);
            localStorage.setItem('refresh', payload.refresh);
            
            return {
                ...state,
                isAuthenticated: true,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh')
             //   access: payload.access,
             //   refresh: payload.refresh
            
            }

        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_FAIL:
             return {
                ...state
             }

        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: localStorage.getItem('access')
                }

        case SIGNUP_SUCCESS:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case REFRESH_FAIL:
        case LOGOUT_SUCCESS:
            console.log("Ejecutando LOGOUT_SUCCESS reducer...");
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                return {
                    ...state,
                    access :null,
                    refresh:null,
                    isAuthenticated: false,
                    user: null,
                }
        case LOGOUT_FAIL:
                return {
                    ...state,
                      // Manejo de errores si el cierre de sesión falla
                      // Por ejemplo, puedes mostrar una alerta de error
                };
              
            

        default:
            return state
    }
}


 

