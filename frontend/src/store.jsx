import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers'



const initialState = {};
const middleware = [thunk];
const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers = composeWithDevTools({
  // Opciones adicionales si es necesario
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(...enhancers)
);

export default store;