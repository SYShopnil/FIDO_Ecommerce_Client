import { createStore, compose , applyMiddleware} from "redux";
import rootReducer from "../Reducer/rootReducer";
import thunk from 'redux-thunk'
import Cookies from "js-cookie";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const initialState = ""
// const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store