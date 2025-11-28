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
        <div className="min-h-screen flex flex-col">
            <NavbarProject/>
             <main className="flex-1 flex flex-col">
              {props.children}

             </main>
            
            <Footer className="mt-auto"/>
        </div>
    );
};
export default connect(null, {
    check_authenticated,
    load_user,
    refresh,
   
}) (FullWidthLayout)
