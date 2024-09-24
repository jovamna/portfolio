import {useEffect, useState} from "react"
import { Switch } from '@headlessui/react'
import { Link } from "react-router-dom"
import { EnvelopeIcon, PhoneArrowDownLeftIcon} from '@heroicons/react/24/solid'   //@heroicons/react/24/outline
import contactMail from "../../assets/img/contactMail.webp";
import axios from 'axios';
import { BiChevronsUp } from "react-icons/bi";
import "../../styles/index.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomImage from '../../assets/img/check.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}










function Contact() {

  useEffect(()=>{
    window.scrollTo(0,0)
}, [])


const [agreed, setAgreed] = useState(false)
const [loading, setLoading] = useState(false)


const [formData, setFormData]= useState({
    name:'',
    email:'',
    subject:'',
    message:'',
    phone:'',
    budget:''
});
console.log(setFormData)


const{
    name,
    email,
    subject,
    message,
    phone,
    budget
}=formData
console.log(formData)

const onChange = (e)=> setFormData({...formData, [e.target.name]:e.target.value});



const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_API_URL
    : "http://localhost:8000";

console.log(URL);


const onSubmit = async (e) => {
  e.preventDefault();
  toast.dismiss();
  if (agreed) {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('phone', phone);

    // Convertir el valor del presupuesto a un número decimal si está presente
    const budgetValue = budget !== '' ? parseFloat(budget) : null;
    formData.append('budget', budgetValue === null ? '' : budgetValue);

    try {
      const res = await axios.post(`${URL}/api/contacts/`, formData);
      console.log(res);
      setLoading(false);
     
      //toast.success('✓ Mensaje enviado correctamente, estaremos en contacto muy pronto', { 
        //icon: ({ theme }) => (theme === "dark" ? "a" : "b"),
        //icon: false,
       // }
       //  );

      toast.success(() => (
          <div className=" flex flex-row ">
            <img src={CustomImage} alt="Custom Image" style={{ width: '20px', height: '20px', marginRight:'15px' }} />
            
             Mensaje enviado correctamente
            
          </div>
        ), {icon:false});
      

      // Restableciendo el estado inicial del formulario después de enviar los datos
      setFormData({
        name: '',
        email: '',
        subject: '',
        message:'',
        phone: '',
        budget: ''
      });
    } catch (err) {
      setLoading(false);
      toast.error('Error al enviar el mensaje');
    }
  } else {
    toast.error('Debes aceptar los términos y política de privacidad');
  }
};





{/*BOTON SUBIR */}
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};






  return (
    <div className='contacto  h-[100%] w-[100%] py-8 flex items-center justify-center'>
   
     
      {/*FIN COLORES DEGRADADOS */}

      <main className="isolate">
        {/*CONTAINER DEL TITULO Y DEL FORMULARIO */}
        <div className=" subcontainer-contact  flex flex-col relative px-6 lg:px-8 max-w-[95%]  mx-auto rounded-lg">
        
            <div className="text-center ">
               <h1 className="text-4xl underline underline-offset-4 font-bold tracking-tight text-sans text-gray-900  sm:text-6xl">
                Contacto
               </h1>
               <div className="relative ">

            
            
             {/*CONTAINER 1 DE RIGHT Y LEFT*/}
             <div className="contacto-row relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">

                 {/*CONTAINER 2 IZQUIERDA LEFT */}
                 <div className="contacto-izquierda py-8 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-8 xl:pr-12">
                    {/*SUBCONTAINER 2 */}
                    <div className="max-w-lg mx-auto">

                       <h2 className="text-2xl font-gilroy-black tracking-tight text-gray-900 sm:text-3xl">
                     
                       </h2>
                       <p className="mt-3 text-lg leading-6 text-gray-500">
                        Para consultar cualquier duda o información escribir en este formulario, responderé en la mayor brevedad posible, Muchas gracias.
                        </p>


                    <dl className="mt-8 text-base text-gray-500">
                      <div>
                        <dt className="sr-only">Postal address</dt>
                        <dd>
                          {/*<p>20, 1-1 Calle San Joan</p>*/}
                          <p className="">Mollet del Vallés, C.P. 08100, Spain</p>
                        </dd>
                      </div>
                     
                      <div className="mt-3">
                        <dt className="sr-only">Email</dt>
                        <dd className="flex flex-row justify-center">
                          <EnvelopeIcon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                          <span className="ml-3">jocoderina@gmail.com</span>
                        </dd>
                      </div>
                    </dl>



                

                    <div className=" mx-auto ">
                      <img className="w-[200px] h-[190px] mx-auto mt-[16px]"
                      src={contactMail}
                      alt="logo"
                      />
                    </div>


           
                     <ToastContainer 
                     className= "mt-[310px]  mr-[90px]" 
                     autoClose={2000}
                     position= "top-center"
                     hideProgressBar= "false"
                     pauseOnHover= "true"
                     draggable= "true"
                     closeButton={false}
                     //theme="dark"
                     icon={({ type }) => (type === "error" ? "🚨" : " ??")}
                     />
                 

                  </div>
                        {/*FIN SUBCONTAINER 2 */}
                 </div>
                  {/*FIN CONTIANER 2 IZQUIERDA LEFT*/}








              {/*CONTAINER 2 RIGHT FORM*/}
                <div className="container-contacto-form py-8 px-4 sm:px-6 lg:col-span-3 lg:py-8 lg:px-8 xl:pl-12">
                  <div className="max-w-lg mx-auto lg:max-w-none">

                    <form 
                    onSubmit={e=>onSubmit(e)} 
                    className="grid grid-cols-1 gap-y-6">
                      <div>
                        <label className="sr-only">
                        Nombre Completo
                        </label>
                        <input
                          type="text"
                          value={name}
                          name='name'
                          onChange={e=>onChange(e)}
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Nombre Completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">
                        Correo electronico
                        </label>
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          onChange={e => onChange(e)} 
                          value={email} 
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Correo electronico"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="sr-only">
                          Phone
                        </label>
                        <input
                          type="number"
                          name="phone"
                          id="phone"
                          onChange={e => onChange(e)} 
                          value={phone} 
                          autoComplete="tel"
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Phone"
                        />
                      </div>
                      <div>
                        <label className="sr-only">
                          Titulo del Mensaje
                        </label>
                        <input
                          type="text"
                          value={subject}
                          name='subject'
                          onChange={e=>onChange(e)}
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Titulo del Mensaje"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="sr-only">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={message}
                          onChange={e=>onChange(e)}
                          rows={4}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                          placeholder="Message"
                          required
                          //defaultValue={''}
                        />
                      </div>





                    <div>
                      <label className="block text-sm font-gilroy-medium text-gray-700">
                        Presupuesto (opcional)
                      </label>
                          <select
                                name="budget"
                                onChange={e=>onChange(e)}
                                //defaultValue={budget}
                                value={budget}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              
                            >
                                <option value="" disabled>Presupuesto?</option>
                                <option value="0-5,000">$0 - $5,000</option>
                                <option value="5,000-10,000">$5,000 - $10,000</option>
                                <option value="10,000+">$10,000+</option>
                            </select>
                        </div>






                        <Switch 
                          checked={agreed}
                          onChange={setAgreed}
                          className={classNames(
                            agreed ? 'bg-blue-600' : 'bg-gray-200',
                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 dark:text-dark-txt border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            )}
                        >
                          <span className="sr-only">Acepta las politicas</span>
                          <span
                            aria-hidden="true"
                            className={classNames(
                                agreed ? 'translate-x-5' : 'translate-x-0',
                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                            />

                        </Switch>
                        <div className="ml-3">
                        <p className="text-base text-gray-500">
                            Al seleccionar esto, aceptas las{' '}
                            
                            <Link to="/privacidad" className="font-medium  underline">
                            <span className="text-blue-700 cursor-pointer">Politicas de Privacidad</span>
                            </Link>{' '}
                            y{' '}
                            
                            <Link to="/terminos" className="font-medium text-blue-700 underline">
                            <span className="text-blue-700 cursor-pointer">Terminos de Uso</span>
                            </Link>
                            .
                        </p>
                        </div>

                      <div>
                        {
                          loading ?
                        <button
                          className="float-right inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-gilroy-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          loading
                        </button>
                        :
                        <button
                          type="submit"
                          className="float-right inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-gilroy-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit
                        </button>
                        }
                      </div>
                    </form>

                  </div>


                </div>
                {/*FIN CONTAINER 2 RIGHT FORM */}


          </div>
              {/*FIN CONTAINER 1 LEFT Y RIGHT*/}

            </div>
            </div>









            <div className="top-center-contact flex flex-col justifiy-end mx-auto items-center">
              <button className="semicirculo-contacto bg-gray-200"
              onClick={handleScrollToTop}
              >
              <BiChevronsUp className="icon-centre mx-auto text-3xl  text-neutral-600 text-center"/>
              </button>
           </div>

          </div>


            {/*COLORES GRADIENTES  */}
         
          {/*FIN COLORES GRADIENTES  */}



          
        </main>









  

  
    </div>

  

    
  )
}

export default Contact




