import { Link} from 'react-router-dom';
import LoadingCard from "../../../components/loaders/LoadingCard";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { get_blog } from "../../../redux/actions/blog";
import axios from "axios"
import { setAlert } from "../../../redux/actions/alert";
import { login} from "../../../redux/actions/auth/auth";
import Alert from "../../../components/Alert"
import "../../../styles/index.css";
import user_lila from "../../../assets/img/users/user_lila.png";


import {
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
  filter_reviews,
 
} from '../../../redux/actions/reviews/reviews';
import Hearts from '../../../components/blog/Hearts';
import moment from "moment";
import DOMPurify from 'dompurify';









function FormReview({
   
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    review,
    reviews,
    reviewId,
    review_id,
    filter_reviews,
    setAlert,
    isAuthenticated,
    login,
   }){
    const params = useParams()
    const slug = params.slug
    const [expandedComments, setExpandedComments] = useState({});

    useEffect(() => {
      if (review_id) {
          get_review(review_id);
          update_review(slug, review_id); // Agrega esta línea para actualizar el review editado
          delete_review(review_id);
      }
    }, [slug, review_id]);


    const [hearts, setHearts] = useState(0);
    const [comment, setComment] = useState('');
    const [title, setTitle] = useState('');
  
  
    //PARA CREAR EL REVIEW 
    const onChange = (e) => {
      const {name, value} = e.target;
        if (name === 'hearts') {
          setHearts(parseInt(value, 10));
        } else if (name === 'comment') {
          if (value.length <= 1000) { // Verificar si no se ha superado el límite de caracteres
            setComment(value);
          }
        } else if (name === 'title'){
          if (value.length <= 80) { // Verificar si no se ha superado el límite de caracteres
            setTitle(value);
          }
        }
       
        
        if (!isAuthenticated) {
        // Mostrar mensaje o realizar otra acción aquí
      }
  
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await create_review(slug, hearts, title, comment);
          //get_reviews para actualizar la lista de reviews
          //IMPORTANTE PARA QUE LOS REVIEWS ANTERIORES NO DESAPAREZCAN
          get_reviews(slug);
  
          // Lógica para mostrar una alerta de éxito
          //setAlert('Review creado exitosamente', 'success');
         
          // Limpiar los campos de entrada
          setHearts(0);
          setTitle('');
          setComment('');
      
      } catch (error) {
          console.error('Error al enviar:', error);
             
      }
    };
  
    
  
     //EDITAR REVIEW
      const [editingReviewId, setEditingReviewId] = useState(null);
      //ONCHANGEDIT
      const [editFormData, setEditFormData] = useState({
    
      hearts:'',
      comment:'',
      })
  
     
       //ACTUALIZAR REVIEW
       const handleSubmitEdit = async (e) => {
        e.preventDefault()
        const editedReview = reviews.find(review => review.id === editingReviewId)
          if(editedReview){
            await update_review(slug, editedReview.id, editFormData.hearts, editFormData.comment);
          }
          console.log(editedReview)
          setEditingReviewId(null);
          console.log(setEditingReviewId)
      };
  
      const onChangeEdit = (e) => {
        const { name, value } = e.target;
        console.log(`onChangeEdit - ${name}: ${value}`);
        setEditFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
  
  
        //PARA EL BOTON CLIKAR Y EDITAR EL FORM
        const handleEdit = (review_id) => {
          console.log(`Clicked Edit - Review ID: ${review_id}`);
          const reviewToEdit = reviews.find(review => review.id === review_id);
          
          console.log("Review to edit:", reviewToEdit);
        
          if (reviewToEdit) {
            console.log(`handleEdit - Review ID: ${review_id}`);
            setEditingReviewId(review_id);
            setEditFormData({
              hearts: reviewToEdit.hearts,
              comment: reviewToEdit.comment,
            });
          }
        };
  
  
     
     
     
  
  
      //ELIMINAR REVIEW
      const deleteReview = (review_id) => {
        const fetchData = async () => {
            await delete_review(review_id);
            
            setHearts(0);
            setComment('');
        };
        fetchData();
      };
  
  
     
      
     //FILTRAR REVIEW
    const filterReviews = numHearts => {
        filter_reviews(slug, numHearts);
      };
  
  
      //GET REVIEWS
      const getReviews = () => {
      get_reviews(slug);
      };
      
    


      const toggleCommentExpansion = (index) => {
        setExpandedComments((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
        }));
      };



      const [totalReviews, setTotalReviews] = useState(0);
      
      useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/reviews/get-reviews/${slug}`)
      .then((response) => {
        setTotalReviews(response.data.total_reviews);
      })
      .catch((error) => {
        console.error(error);
      });
      }, [slug]);

   
  
  
  
  
    const fechaFormateada = moment().locale('es').format("LL");
  
  
    return(

        <>


   {/*REVIEWS shadow sm:rounded-lg */}
   <section className='overflow-hidden  max-w-[100%] mx-auto max-w-7xl  mt-8 my-5 max-w-7xl'>    

    <div className='flex flex-col w-[100%] items-center'>

          {/*AVISO PARA LOS QUE O ESTAN AUTHENTICADOS */}
          {!isAuthenticated && (
             <div className='blogpost-aviso-a-no-authenticados w-[95%] '>
              <h1 
              className='text-center text-xl italic font-serif text-bold '>
                Para comentar hay que<Link className="text-slate-500 hover:text-blue-600" to="/signup"> registrarse </Link> 
                y hacer <Link className="text-slate-500 hover:text-blue-600" to="/login" >login</Link>
                </h1>
            </div>
            )}
               {/*FIN AVISO PARA LOS QUE O ESTAN AUTHENTICADOS */}




        {/*FORMULARIO PARA CREAR REVIEW underline underline-offset-4 */}
        <div className="review-form-movil flex flex-col items-center w-[100%] justify-center">

            {isAuthenticated && (
             <form onSubmit={handleSubmit} className='w-[100%] flex flex-col justify-center items-center '>

           <h1 className='w-[100%]  mx-auto text-center font-semibold font-mono text-3xl px-4 py-2'> 
            Deja tu comentario
            </h1>


           <div className='w-[98%] flex flex-col items-center'>
    
            {/*TITLE DEL REVIEW */}
            <div className="py-2 w-full  border-b-2 border-black hover:border-zinc-400 items-center mb-2 ">
     
            <input
            name="title" 
            value={title} 
            onChange={onChange} 
            className="border-none text-sm w-[100%] h-[35px] placeholder-neutral-700 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            placeholder="Titulo (max 80 caracteres)"  
            maxLength="80" // Define aquí el límite de caracteres máximo
            />
           {/* {title.length > 100 && (
            <p className="error-message">El título no puede tener más de 100 caracteres.</p>
           )}*/}
            </div>

       
                  {/*CONTENT DEL REVIEW */}
           <div className="py-2   w-full  border-b-2 border-black hover:border-zinc-400"  >
           <textarea
            name="comment" 
            value={comment} 
            onChange={onChange} 
            placeholder="Comentario (max 1024 caracteres)" 
            className="w-[100%]  border-none text-sm placeholder-neutral-700 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
             maxLength="1000" // Define aquí el límite de caracteres máximo
             />
             {/* {comment.length > 1050 && (
              <p className="error-message">El comentario no puede tener más de 1050 caracteres.</p>
              )}*/}
            </div>


       


                   {/*CONTAINER DE LIKE Y SUBMIT REVIEW bg-green-400*/}
           <div className="review-like-submit-movil flex flex-row w-[35%] px-4 py-2 mx-auto">

           <label className=" review-like flex flex-row  w-[50%] ">
           <p className="w-[30%] py-2">💛</p>
          
           <input 
           type="number" 
           min="1" 
           max="5" 
           name="hearts"
           value={hearts} 
           onChange={onChange} 
           className="w-[60%] border-neutral-300 review-scroll"
           />
            </label>


  

           <button 
           type="submit"
           className="review-button-form-movil w-[50%] py-1.5  px-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4">
           Comentar
           </button>
           </div>
     
         </div>
       </form>
      )}
     </div>
      {/*FIN FORMULARIO PARA CREAR REVIEW/*/}




















           {/*CONTAINER DE HEARST underline underline-offset-4*/}
           <div className="review-hearts-form flex w-[100%] mt-4">

              {/*CONTAINER DE LOS HEARTS BOTON PARA MOSTRAR ESTRELLAS */}
             <div className='review-hearts-movil w-[60%] py-2 '>                   
                <button
                className='review-heart-button btn btn-primary btn-sm  font-semibold font-mono lg:text-xl text-sm py-2 '
                onClick={getReviews}>
                Mostrar todas las Reseñas 
                </button>

                <div
                className='review-heart-cinco mb-1 w-[50%] '
                style={{ cursor: 'pointer' }}
                onClick={() => filterReviews(5)}
                >
                <Hearts hearts={5.0} />
                </div>

                <div
                className='review-heart-cuatro mb-1 w-[50%]'
                style={{ cursor: 'pointer' }}
                onClick={() => filterReviews(4.0)}
                >
                <Hearts hearts={4.0} />
                </div>

                 <div
                 className='review-heart-tres mb-1 w-[50%]'
                 style={{ cursor: 'pointer' }}
                 onClick={() => filterReviews(3.0)}
                 >
                <Hearts hearts={3.0} />
                </div>

                <div
                className='review-heart-dos mb-1 w-[50%]'
                style={{ cursor: 'pointer' }}
                onClick={() => filterReviews(2.0)}
                 >
                <Hearts hearts={2.0} />
                </div>

                <div
                className='review-heart-uno mb-1 w-[50%]'
                style={{ cursor: 'pointer' }}
                onClick={() => filterReviews(1.0)}
                 >
                 <Hearts hearts={1.0} />
                </div>
             </div>
             {/*FIN BOTON PARA MOSTRAR ESTRELLAS */}
           </div>
          {/*FIN CONTAINER DE HEARST Y FORM DE CREAR REVIEW */}







     





      {/*CONTAINER PRINCIPAL DE COMENTARIOS DE USUARIOS */}
      {/*MAPEO DE LAS RESEÑAS Y STARS */}
      <div className="reviews-movil w-[100%] flex flex-col mt-4">
          <h1 className="font-semibold font-mono text-3xl  pb-4 font-semibold"> 
          {totalReviews} Comentarios
          </h1>

          {reviews && reviews.map((review, index)=>(
          <div
          key={index} 
          className="flex flex-col "
          >

            <div className="reviews-review-movil w-[99.8%]  py-1 mb-1 bg-neutral-100">

              <div className='flex flex-row mb-2 px-[2px] w-[99.8%] mt-2 ml-[8px]'>
                  <img 
                   className=' rounded-full border border-gray-400 px-[2px] py-[2px] mr-[9px] outline outline-offset-2 outline-gray-400'
                  src={user_lila}
                  alt="autor"
                  width={40}
                  height={45}
                
                  /> 
                  <h4 className="flex flex-row text-sm font-sans uppercase ml-[9px] text-neutral-900 ">
                  {review.user}
                  </h4>
              </div>
              {/*HEARTS Y TITLE */}
              <div className='review-heart-title flex flex-row'>
                <div className='mr-2'>
                <Hearts hearts={review.hearts}/>
                </div>
                <p className=" text-zinc-800 font-bold text-sm ">
                {review.title}
                </p>
              </div>
              {/*FIN HEARTS Y TITLE */}
                       
              <p className="italic text-sm text-zinc-600 font-mono">
                Revisado en España el {fechaFormateada}
              </p>
           

             {/*CONTENT */}
            <p className=" text-zinc-800 text-sm mb-2 mt-4 pr-4 " >
            {expandedComments[index] ? review.comment : review.comment.slice(0, 200)}
             {review.comment.length > 200 && (
             <span
              className="text-blue-500 cursor-pointer underline"
              onClick={() => toggleCommentExpansion(index)}
              >
              {expandedComments[index] ? ' Leer menos' : ' Leer más'}
             </span>
             )}
            </p>
            </div>






    




  
      {/* CONTAINER DE BOTON DE EDITAR Y ELIMINAR Botón para editar el review */}
      {isAuthenticated && (
        <div className="reviews-review-button-movil flex flex-row w-[30%] h-12 mb-2">
               
            <div className="reviews-review-button-movil-edit flex justify-center ml-2 py-2 h-10 rounded-lg">
            <button className="bg-orange-500 text-sm rounded-lg px-2" 
            onClick={() => handleEdit(review.id)}>
            Editar
            </button>
            </div>

            {/* Botón para eliminar el review */}
            <div className="reviews-review-button-movil-delete flex justify-center ml-2 py-2 h-10 rounded-lg">
            <button className="bg-orange-500 text-sm rounded-lg px-2" 
            onClick={() => deleteReview(review.id)}>
            Eliminar
            </button>
            </div>

        </div>
        )}



        
        {/* FORMULARIO PARA EDITAR REVIEW */}
      <div>  
      {editingReviewId === review.id && (
        <form onSubmit={e=>handleSubmitEdit(e)}>
            <div>
              <label 
              htmlFor="comment"
              className='flex flex-col mt-8'>
              Comment:
              </label>
              <textarea
              rows={4}
              name="comment"
              id="comment"
              value={editFormData.comment}
              onChange={e=>onChangeEdit(e)}
              />
            </div>

            <label>
            Like:
            </label>
            <select
              type="number"
              min="1"
              max="5"
              className="mt-4"
              name="hearts"
              required
              value={editFormData.hearts}
              onChange={onChangeEdit}
              placeholder="0 - 5"
              >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
                         
              <button 
              type="submit"
              className="mt-4  inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
              Guardar cambios
              </button>
        </form>
        )}
      </div>
          {/* FIN FORMULARIO PARA EDITAR REVIEW */}


          </div>

           ))}
           {/*FIN DE LA RESEÑA */}


      </div>
      {/*FIN COMENTARIOS DE USUARIOS */}
      
    </div>
    {/*FIN CONTAINER GENERAL 2 */}
    </section>
    {/*FIN CONTAINER GENERAL 1 OVERFLOW */}
    </>


    )


   }




const mapStateToProps = state =>({
    reviews: state.Reviews.reviews,
    alert:state.Alert.alert,
    isAuthenticated: state.Auth.isAuthenticated,
    
})

export default connect(mapStateToProps,{
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    filter_reviews,
    setAlert,
    login,

    
})(FormReview)





 {/* FORMULARIO PARA EDITAR REVIEW 

<div>
                     
{editingReviewId && (

<form onSubmit={e=>handleSubmitEdit(e)}>
 <div>
 <label 
 htmlFor= "comment"
 className='flex flex-col mt-8'>
 Comment:
 </label>
 <textarea
 rows={4}
 name="comment"
 id="comment"
 value={editFormData.comment}
 onChange={e=>onChangeEdit(e)}
 />
 </div>


  <label>
  Rating:
  </label>
  <select
    type="number"
    min="1"
    max="5"
    className="mt-4"
    name="hearts"
    required
    value={editFormData.hearts}
    onChange={onChangeEdit}
    placeholder="0 - 5"
     >
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>


     </select>

    
  <button 
  type="submit"
  className="mt-4  inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
   Guardar cambios
   </button>
</form>
)}
</div>


*/}

                  
        




