import { combineReducers } from 'redux';
import project from './project'; //ESTE ES DE REDUCERS
import blog from './blog'; //ESTE ES DE REDUCERS
import categories from './categories'; //ESTE ES DE REDUCERS
import Reviews from './reviews';
import Auth from './auth';
import Alert from './alert';


export default combineReducers({
    Auth,
    Alert,
    project,
    blog,
    categories,
    Reviews,
})