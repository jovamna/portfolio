import FullWidthLayout from '../../hocs/FullWidthLayout'
import { connect } from 'react-redux'
import { load_user} from '../../redux/actions/auth/auth'

import * as Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router'


import portada from  '../../assets/img/profile/portada.jpg';
import autor from  '../../assets/img/users/autor.png';




//npm install @heroicons/react

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}








function Dashboard({
 // load_user,
 // isAuthenticated,
  user,

}) {


//ultimo

return (
  <FullWidthLayout>



    
      {/*IMPORTANTE PARA QUE BAJE EL LOGIN */}
      <div className="pt-12"></div>


    <div className="relative h-80 min-h-32 bg-blue-300">
       <img
       src={portada}
       alt="post"
       className="absolute w-full h-80 min-h-32 inset-0 object-cover z-0"
      />

       <img
       src={autor}
       alt="ico"
       className="absolute h-32 min-h-12 mt-64 ml-20 inset-0 object-cover z-0"
      />

      
   </div>




     <div className="movil-redaccion-blog-post relative prose prose-indigo prose-lg text-gray-500 mx-auto font-gilroy-regular mb-40">

      <h1 className='font-mono underline underline-offset-4 mb-10 mt-10'>Profile</h1>


       <div className='flex flex-row'>
          <div className='font-bold font-mono text-lg text-gray-950 mr-4'>Nombre: </div>
          <div>{user && user.first_name} </div>
       </div>

       <div className='flex flex-row'>
         <div className='font-bold font-mono text-lg text-gray-950 mr-4'>Apellido</div>
         <div>{user && user.last_name} </div>
       </div>



       <div className='flex flex-row'>
         <div className='font-bold font-mono text-lg text-gray-950 mr-4'>Email: </div>
         <div>{user && user.email} </div>
       </div>




      </div>

  </FullWidthLayout>


  )
}






const mapStateToProps = state => ({
   loading:state.Auth.loading,
   user:state.Auth.user,
})


export default connect(mapStateToProps, {
  load_user
})(Dashboard)















//useEffect(() => {
 // load_user(),
  
 // window.scrollTo(0, 0)
 // console.log(load_user)
  
//}, [])



//useEffect(() => {
  // Verificar si el usuario está autenticado antes de cargar los datos
 // if (isAuthenticated) {
    // Incluir el token de autenticación en las solicitudes
  //  const headers = {
 //     Authorization: `Bearer ${access}`, // Reemplaza con tu token
  //  };

  //  load_user(headers);
 // }
//}, [isAuthenticated, load_user]);
















































//{
 // user ?
 // <>
//<div>  </div>
//</>
 // :
 // <Loader/>
//  }

















































































     

