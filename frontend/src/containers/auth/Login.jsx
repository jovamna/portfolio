import FullWidthLayout from '../../hocs/FullWidthLayout'
import { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth/auth'
import NavbarProject from "./../../components/navigation/NavbarProject";
import * as Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router'



//LOADING ULTIMO
const Login =({
  login,
  loading
}) =>{

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    //password2: '',
  })
  const [showPassword1, setShowPassword1] = useState(false);
  //const [showPassword2, setShowPassword2] = useState(false);
  const [activated, setActivated] = useState(false); //CLICK DEL LOGIN //ultimo
  
   //, password2,
  const {email, password1} = formData;


  //VISIBLE LA ESCRITURA DEL PASSWORD O CODIFICARLA
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  //const togglePasswordVisibility2 = () => {
  //  setShowPassword2(!showPassword2);
  //};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //const onSubmit = e => {
    //e.preventDefault();
  //  login(email, password1); // Aquí se pasan ambos campos de contraseña
    //login(email, password1, password2); // Aquí se pasan ambos campos de contraseña
   // setActivated(true);
    //window.scrollTo(0, 0);
   
 // }

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Iniciando sesión con los siguientes datos:', email, password1);
    login(email, password1);
    //await login(email, password1);
    console.log('Inicio de sesión exitoso o error');
    setActivated(true);
  }
  


  //ultimo
  if(activated)
  return <Navigate to='/blog' />

  
  
  //BUTTON LOGOUT
  const handleForgotPasswordClick = () => {
    // Redirige al usuario a la página de restablecimiento de contraseña en Django.
    window.location.href = 'http://127.0.0.1:8000/api/user/reset-password/';
  };




  return (
    <>
    <NavbarProject/>
    
  
      {/*IMPORTANTE PARA QUE BAJE EL LOGIN */}
      <div className="pt-28">





      <div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          

             <h2 className="text-center text-3xl font-bold text-zinc-800">
             Inicia sesión en tu cuenta
             </h2>
         
        </div>




        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {/*shadow sm:rounded-lg  */}
          <div className="bg-white px-4 sm:px-10">
            <form onSubmit={e => onSubmit(e)} className="space-y-6">
              
              
                <div className="mt-1 text-neutral-800">
                  <input
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="E-mail"
                    required
                    className=" appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm  focus:outline-none focus:ring-zinc-500 focus:border-zinc-600 sm:text-sm placeholder-neutral-600 font-mono"
                  />
                   
                </div>
            


              
                   
                   <div className="mt-1 relative text-neutral-800">
                   <input
                   type={showPassword1 ? 'text' : 'password'}
                   name="password1"
                   value={password1}
                   onChange={handleInputChange}
                   placeholder="Contraseña"
                   required
                   className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-600  sm:text-sm placeholder-neutral-600 font-mono"
                    // ... otros estilos y atributos necesarios
                    />
                   <button
                    type="button"
                    onClick={togglePasswordVisibility1}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
                     >
                    {showPassword1 ? '🙈' : '👁️'}
                    </button>
                </div>
            


            
              <div className="flex items-center justify-between">
                <div className="text-sm">
                 {/*ESTA URL VA SIN TOKEN, SOLO ES PARA EL FORM DE ENVIO DE EMAIL USER */}
                 {/*EN ESTA VIEW HAY CODIGO PARA QUE MEDIANTE ESE FORM SE ENVIE UN CORREO AL USER*/}
                 {/*QUE PIDO NUEVA CONTRASEÑA Y ENVIRAE UN ENLACE PARA EL FORM DE NUECA CONTRASEÑA*/}
                   <span>¿Olvidaste tu contraseña? &#160;
                    <a href="http://127.0.0.1:8000/api/user/reset-password/" 
                    onClick={handleForgotPasswordClick}
                    className='no-underline hover:underline'
                    >
                    Restablecerla aquí
                    </a>
                    </span>
                </div>
              </div>




              <div>
              {/*ULTIMO  BOTON HENVIAR INIO DE SEION*/}
              {loading ?
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Loader
               type ="Oval"
               color="#fff"
               width={20}
               height={20}
               />
                </button>:

                <button
                type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-black hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 focus:border-zinc-400"
                >
                  Login
                </button>
                      }
              </div>
            </form>


            <div  className='mt-4 bg-white'>
            <Link to="/signup" >
              <p className="text-base text-center mx-auto text-indigo-600 hover:text-indigo-500">
              Aún no tienes cuenta?  Registrate

              </p>
           
             </Link>
            <button
                type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-black shadow-sm text-sm font-medium text-black bg-white hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <a href="/signup">
                  Crear cuenta
                  </a>
                 
                </button>
            </div>









          </div>
        </div>
      </div>




  
      </div>

</>
    
    
  )
}


const mapStateToProps = state => ({
   loading:state.Auth.loading
})


export default connect(mapStateToProps, {
  login
})(Login)


