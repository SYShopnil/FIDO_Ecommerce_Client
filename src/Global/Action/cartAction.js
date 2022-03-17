const addToCartAction = (product, qty) => {
    const data = {product, qty} //sent the data as a object
    // console.log(data)
    return {
        type: "AddToCart",
        payload: data
    }
}

const deleteProductAction = (product) => {
    return {
        type: "DeleteCartProduct",
        payload: product
    }
}


export {
    addToCartAction,
    deleteProductAction
}