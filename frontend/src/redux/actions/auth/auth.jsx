import{
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
    SET_ALERT,
    REMOVE_ALERT,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

}from '../types'

import {setAlert} from './alert';
import axios from 'axios'




const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_API_URL
    : "http://localhost:8000";

console.log(URL);


//con veryfy para mantener la authentication
export const check_authenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {
            const res = await axios.post(`${URL}/api/user/login/verify/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    }else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}












//CREAR USUARIO
export const signup =  (first_name, last_name, email, password) => async dispatch =>{
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    };

    const body = JSON.stringify({
        first_name,
        //last_name,
        email,
        password

    });
    if (last_name) {
    body.last_name = last_name;
}
    
    try {
        const res = await axios.post(`${URL}/api/user/create/`, body, config);

        if(res.status === 201){
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Usuario creado','green'));
            handleSignupSuccess(); // Llama a la función para limpiar campos y mostrar mensaje
        }else {
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert('Error al crear usuario','read'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });

    }catch(err){
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error conectando con el servidor','red'))     
    }
};


//Profile
export const load_user = () => async dispatch => {
    console.log("Solicitud para cargar el usuario...");
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
             
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${URL}/api/user/me/`, config);
            console.log("Respuesta del servidor:", res.data);
        
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        }
        catch(err){
            console.log("Error al cargar el usuario:", err);
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
}















//HAY QUE CARGAR LA FUNCIONA LOAD_USER PORQUE CON ESA FUNCION
//SE AUTHENTIFICO E USUARIO, ESTA FUNCION DEBE IR INMEDIATAMENTE 
//DEBAJO DEL DISPATCH LOGIN_SUCCESS
//LOGIN  http://127.0.0.1:8000/auth/jwt/create/
export const login = (email, password) => async dispatch => {
    dispatch ({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    };


    const body = JSON.stringify({
        email,
        password    
    });

    try {
        const res = await axios.post(`${URL}/api/user/login/`, body, config);
        console.log(res)

        if(res.status === 200) {
            // Aquí se asume que el token JWT se encuentra en la respuesta como res.data.token
            const { access, refresh } = res.data;

            // Guardar los tokens en el Local Storage
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);


            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(load_user()); //AUTHENTFICADO
            dispatch({
                type:REMOVE_AUTH_LOADING
           });
           dispatch(setAlert('Inicio de sesión exitoso','green'));
           
          
        } else {
            dispatch({
                type:LOGIN_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error al inicar sesión','red'));
        }
    }
    catch(err){
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error al iniciar sesión','red'))
    }
}




export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${URL}/api/user/login/refresh/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        }catch(err){
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}













export const logout = () => dispatch => {
   dispatch({
       type: LOGOUT_SUCCESS
   });
   dispatch(setAlert('Succesfully logged out', 'green'));
}



export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });
   
        const config = {
            headers: {
               // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({email});

        try {
            const res = await axios.post(`${URL}/api/user/reset-password/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    //payload: res.data
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                })
                dispatch(setAlert('Password reset email sent', 'green'));
            } else {
                dispatch({
                    type: RESET_PASSWORD_FAIL
                });
                dispatch({
                    type: REMOVE_AUTH_LOADING
                });
                dispatch(setAlert('Error sending password reset email', 'red'))
            }
        }catch(err){
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error sending password reset email', 'red'))
        }
   
}