import axios from 'axios';
const initialState = {
    isLoading: true,
    data: [],
    isError: false
}


const ProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SuccessFullGetProduct" : {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        }
        case "FailedGetProduct" : {
            return {
                ...state,
                isLoading: true,
                isError: action.payload,
                data: []
            }
        }
        
        default : {
            return state
        }
    }
}

export default ProductReducer