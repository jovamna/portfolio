import {connect} from 'react-redux'
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

import { check_authenticated, load_user, refresh } from '../redux/actions/auth/auth';

import { useEffect } from 'react';
import NavbarProject from '../components/navigation/NavbarProject';
import "../styles/index.css";



const FullWidthLayout = (props) => {
    
  useEffect(() => {
      props.refresh();
      props.check_authenticated();
      props.load_user();
  }, []);
      
      
      

return (
   
    <div className="min-h-screen flex flex-col justify-between">
        <NavbarProject />
        
        {/* Este main se tragará todo el espacio vacío para empujar al footer */}
        <main className="w-full flex-1">
            {props.children}
        </main>
        
        <Footer />
    </div>

);



};
export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
   
}) (FullWidthLayout)





//return (
 //   <div className="min-h-screen flex flex-col justify-between">
  //      <NavbarProject />
        
   //     {/* Este main se tragará todo el espacio vacío para empujar al footer */}
   //     <main className="w-full flex-1">
   //         {props.children}
   //     </main>
        
   //     <Footer />
   // </div>
//);