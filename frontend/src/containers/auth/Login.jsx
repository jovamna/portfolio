import FullWidthLayout from '../../hocs/FullWidthLayout'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import NavbarProject from "./../../components/navigation/NavbarProject";
import * as Loader from "react-loader-spinner";
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';

// Loader from 'react-loader-spinner';   // ← Asegúrate de tener este import
import { login} from '../../redux/actions/auth/auth'; // ← Ajusta la ruta según tu proyecto











//LOADING ULTIMO
const Login = ({
  login,
  loading,
  isAuthenticated,
  error
}) => {

  const [formData, setFormData] = useState({
    email: '',
    password1: '',
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ← nuevo

  const { email, password1 } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirección más limpia
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/blog', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password1);   // ← con await
    } catch (err) {
      console.error('Error inesperado:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordClick = () => {
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://127.0.0.1:8000'
      : 'https://muckas-store.com';
    window.location.href = `${baseUrl}/api/user/reset-password/`;
  };

  return (
    <>
      <NavbarProject />
      <div className="min-h-full flex flex-col justify-center sm:px-6 lg:px-8 pt-28">

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-bold text-zinc-800">
                Iniciar sesión
                </h2>
           </div>

          
           
       
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 sm:px-10 py-8">

            {/* Mensaje de error mejorado */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
               <div className='lg:w-[100%] items-center mx-auto w-[98%] '>
                <p>
                 Introduzca su correo electrónico y contraseña a continuación para acceder a su cuenta.
           
                </p>
           </div>

              <div>
                <input
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="E-mail"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-600 placeholder-neutral-600 font-mono"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  name="password1"
                  value={password1}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-600 placeholder-neutral-600 font-mono"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility1}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword1 ? '🙈' : '👁️'}
                </button>
              </div>

              <div className="flex justify-end text-sm">
                <a
                  href="#"
                  onClick={handleForgotPasswordClick}
                  className="text-indigo-600 hover:text-indigo-500 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div>
                {loading || isSubmitting ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium flex justify-center"
                  >
                    <Loader.ThreeDots color="#fff" height={24} width={50} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white rounded-lg font-medium transition"
                  >
                    Iniciar sesión
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                ¿Aún no tienes cuenta? Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.Auth.loading,
  isAuthenticated: state.Auth.isAuthenticated,
  error: state.Auth.error,
});

export default connect(mapStateToProps, { login })(Login);








