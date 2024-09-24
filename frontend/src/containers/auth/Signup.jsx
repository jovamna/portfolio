import FullWidthLayout from '../../hocs/FullWidthLayout'
import {useState, useEffect} from 'react'

import {connect} from 'react-redux'  
import { signup } from '../../redux/actions/auth/auth' 
import NavbarProject from "./../../components/navigation/NavbarProject";





function Signup({signup}) {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])


    const [accountCreated, setAccountCreated] = useState(false); 

     //PROCESANDO EL FORMDATA
     const [formData, setFormData] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
    })

    const [showPassword, setShowPassword] = useState(false);
    

    //DECLARANDO EL FORMDATA
    const {
        first_name,
        last_name,
        email,
        password
    }=formData;

    const togglePasswordVisibility = ()=> {
      setShowPassword(!showPassword);
    };

  
    const onChange = e => setFormData({ ...formData, [e.target.name]:e.target.value});

    // Lógica para limpiar los campos y mostrar el mensaje después de crear el usuario
    const handleSignupSuccess = () => {
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: ""
        });
        setAccountCreated(true);
    };



    const onSubmit = async (e) => {
      e.preventDefault();
     
      try {
        await signup(first_name, last_name, email, password);

        handleSignupSuccess(); // Llama a la función para limpiar campos y mostrar mensaje
      } catch (error) {
        // Manejar el error si es necesario
      }
    };
    


 

   

    return (
      <>

<NavbarProject/>


       
        {/*IMPORTANTE PARA QUE BAJE EL LOGIN */}
      <div className="pt-28">
        <div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
           <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-bold text-zinc-800 ">Crea una cuenta</h2>
           </div>


  
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* shadow sm:rounded-lg*/}
            <div className="bg-white py-6 px-4  sm:px-10">



               {/* <form className="space-y-6" action="#" method="POST"> */}
               {/* onSubmit={e=>onSubmit(e)} ES DE LA FUNCION DECLARADA ARRIBA DE TODO*/}
                <form onSubmit={e=>onSubmit(e)} className="space-y-6">

                  <div className="mt-1 text-neutral-800">
                    <input
                      name="first_name"
                      value={first_name}  
                      onChange={e=>onChange(e)} 
                      type="text"
                      placeholder="Nombre"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-neutral-600 font-mono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
               
                 
                  <div className="mt-1 text-neutral-800">
                    <input
                      name="last_name"
                      value={last_name}  
                      onChange={e=>onChange(e)} 
                      type="text"
                      placeholder="Apellido (Opcional)"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300  shadow-sm placeholder-neutral-600 font-mono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
               
                  <div className="mt-1 text-neutral-800">
                    <input
                      name="email"
                      value={email} 
                      onChange={e=>onChange(e)} 
                      type="email"
                      placeholder="E-mail"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-neutral-600 font-mono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
              
                     <div className="mt-1 relative text-neutral-800">
                     <input
                      name="password"
                      value={password}  
                      onChange={e=>onChange(e)} 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Contraseña"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-neutral-600 font-mono focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />

                     <button
                     type="button"
                     onClick={togglePasswordVisibility}
                     className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
                     >
                     {showPassword ? '🙈' : '👁️'}
                     </button>

                  </div>
        
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    ¿Ya tienes cuenta? Inicia sesión
                    </a>
                  </div>
                </div>
  


             {/*BOTON ENVIAR REGISTRO */}

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium text-white bg-black hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 focus:border-zinc-400"
                  >
                    Crear cuenta
                  </button>
                </div>

                 </form>
  

                 {accountCreated && <div className='mt-4 text-center'>¡Usuario creado con éxito!</div>}







            </div>
          </div>
        </div>



       
        {/*IMPORTANTE PARA QUE BAJE EL LOGIN  DIV PT-28*/}
      </div>



  
      </>
    )
  }


const mapStateToProps = state => ({

})  
export default connect(mapStateToProps, {
   signup
})(Signup)  