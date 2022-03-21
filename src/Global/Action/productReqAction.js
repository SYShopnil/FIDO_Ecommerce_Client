import axios from 'axios';
import serverUrl from "../../utils/serverUrl"

const successfulGetProduct = (data) => {
    return {
        type: "SuccessFullGetProduct",
        payload: data
    }
}

const failedGetProduct = (error) => {
    return {
        type: "FailedGetProduct",
        payload: error
    }
}

const updateProductInfoAction = () => ( async (dispatch) => {
        try {
            const getData = await axios.get(`${serverUrl}product/get/all`)
            console.log({getData})
            const {data, status} = getData
            if(status == 202) { //if get the data successfully
                const updatedData = data //get the successful response data
                const {product} = updatedData
                console.log(product);
                dispatch( {
                    type: "SuccessFullGetProduct",
                    payload: product
                })
                
            }else { //if get the data successfully
                dispatch( {
                    type: "FailedGetProduct",
                    payload:data.message
                })
            }
        }catch (err) {
           dispatch( {
                type: "FailedGetProduct",
                payload: "Product not Updated"
            })
            
        }
    })

export {
    successfulGetProduct,
    failedGetProduct,
    updateProductInfoAction
}