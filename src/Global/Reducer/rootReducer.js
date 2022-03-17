import {combineReducers} from 'redux'
import ProductReducer from './getProductReducer'
import addToCartReducer from './cartReducer'
import loginUserReducer from './userReducer'

const rootReducer = combineReducers({
    ProductReducer,
    addToCartReducer,
    loginUserReducer
})

export default rootReducer