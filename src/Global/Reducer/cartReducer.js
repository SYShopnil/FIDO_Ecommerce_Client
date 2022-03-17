import Cookies from "js-cookie";
// const cartItem = () => {
//     if( !Cookies.get('cart-items')){
//         return []
//     } else {
//         return  Cookies.get('cart-items').product 
//     } 
// }

const cartItem = !Cookies.getJSON('cart-items') ? [] : Cookies.getJSON('cart-items').product 
// console.log({cartItem: Cookies.getJSON('cart-items')});
const isEmpty = !Cookies.getJSON('cart-items') ? true : Cookies.getJSON('cart-items').isEmpty 
const totalPrice = !Cookies.getJSON('cart-items') ? 0 :  Cookies.getJSON('cart-items').total


const initialState = {
    isEmpty: isEmpty,
    product : cartItem ,
    total: totalPrice
}

const addToCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AddToCart" : {
            const {product} = action.payload //get the data from payload
          
            if(state.product.length !== 0) { //check that is the global state is empty or not
                const isAvailableProduct = state.product.find(item => item.product._id == product._id) //check that the cart product is already exist in the  global cart store or not 
                var totalPrice = total(action.payload, state)
                if(isAvailableProduct) {
                    const {qty:stateQty, product} = isAvailableProduct //get the store global state product quantity
                    const {qty:inputQty} = action.payload //get the input product quantity
                    let {currentPrice} = product.productDetails.price //get the current price of input product
                    let totalP
                    // (stateQty >= inputQty) ?  : deleteQty = inputQty - stateQty
                    if(stateQty > inputQty) { //check if the global state qty of this product is greater than input product qty
                        const deleteQty = stateQty - inputQty //since global is greater than we need to decrease the qty
                        const deleteAmount =  currentPrice * deleteQty //get the delete amount  //how many amount we need to delete from global state
                        totalP = state.total - deleteAmount //get the new total
                    }else { //if the input qty is greater than the global state qty of this product
                        const addQty = inputQty - stateQty //since input qty is greater so we need to add some qty to the global state
                        const addAmount = currentPrice * addQty
                        totalP = state.total + addAmount //get the new total
                    }
                    // console.log({totalP});
                    const findIndexOfThatProduct = state.product.findIndex(item => item.product._id == product._id) //find the index of that product
                    state.product.splice(findIndexOfThatProduct, 1) //delete the exist product from cart
                    var totalPrice = total(action.payload, state)
                    return {
                        ...state,
                        isEmpty: false,
                        product: [action.payload, ...state.product],
                        total : totalP
                        // total: totalPrice
                    } //return a new state with the new add product
                }else {
                     var totalPrice = total(action.payload, state)
                    return {
                        ...state,
                        isEmpty: false,
                        product: [action.payload, ...state.product],
                        total : totalPrice
                        // total: totalPrice
                    } //if the product is not exist in to global cart then just add it and return a new state
                }
            }else {
                // const totalPrice = total(state.product)
                //  console.log({totalPrice});
                 var totalPrice = total(action.payload, state)
                return {
                    ...state,
                    isEmpty: false,
                    product: [...state.product, action.payload],
                    total : totalPrice
                    // total: totalPrice
                } //if the global cart store is empty then add a new product into the cart 
            }
        }
        case "DeleteCartProduct": {
            const {product, qty} = action.payload //get the delete product data
            const {_id, productDetails} = product //get the id and product details of these product
            const {currentPrice} = productDetails.price //get the current price of these product
            const deleteAmount = currentPrice * qty
            const isAvailableProduct = state.product.find(ele => ele.product._id == _id) //check that is it available in the cart or nothing
            if(isAvailableProduct) {
                // total(action.payload)
                const newTotal = state.total - deleteAmount //set the new total after delete a product from cart list
                const findProduct = isAvailableProduct //store the product data
                const findTheIndex = state.product.findIndex(ele => ele.product._id == findProduct.product._id) //find the index of those product
                state.product.splice(findTheIndex, 1) //remove that product
                if(state.product.length != 0) { //if the cart is not empty
                    return {
                        ...state,
                        isEmpty: false,
                        product: [...state.product],
                        total: newTotal
                    } //sent the existing cart product
                }else{  //if the cart is  empty
                    return {
                        ...state,
                        isEmpty: true,
                        product: [...state.product],
                        total: 0
                    }
                }
            }else {
                if(state.product.length == 0) {
                    return {
                        ...state,
                        isEmpty: true,
                        product: []
                    }
                }else {
                    return {
                        ...state,
                        isEmpty: true,
                        product: [...state.product]
                    }
                }
            } //if failed to find the product
        }
        case "GetTotal" : {
            console.log(action.payload);
            const totalPrice = total(action.payload)
            {
                return {
                    ...state,
                    total: totalPrice
                }
            }
        }
        default: {
            return state
        }
    }
}

const total = (stateData, state) => {
    let fullState = stateData //store the full state here
    const price = stateData.product.productDetails.price.currentPrice
    const qty = stateData.qty
    const total = state.total
    const totalPrice = total + (price * qty)
    // console.log({totalPrice});
    return totalPrice
}

export default addToCartReducer

