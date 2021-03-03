import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { authRedecur } from './reducers/authReducer';



const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// verileri depoladığımız ulaştırdığımız yer 
const store = createStore(combineReducers({
    auth: authRedecur
}),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
