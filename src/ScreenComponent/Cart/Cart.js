import React, { useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector,} from 'react-redux'
import { addToCartAction, deleteProductAction } from '../../Global/Action/cartAction'
import CartStyle from './CartStyle.module.css'
import store  from '../../Global/Store/store'
import Cookies from 'js-cookie'

const Cart = (props) => {
    const paramsData = useParams()
    let storeCartItem
    const allProductData = useSelector(state => state.ProductReducer) //get all product data from store
    const {id:productId} = paramsData //get the product id from params
    const qty = +props.location.search.split('=')[1] //get the quantity of product
    const dispatch = useDispatch()
    const cartData = useSelector(state => state.addToCartReducer) //get the cart data from global store
    const {isEmpty, product, total} = cartData
    // console.log({cartData})
    useEffect(() => {
        const addCart = async () => {
            try {
                const findProduct = allProductData.data.find(ele => ele._id == productId)
                if(findProduct) {
                    const data = findProduct //store the product data into
                    const quantity = qty //store the quantity of product
                    dispatch(addToCartAction(data, quantity))
                    const saveData = store.getState().addToCartReducer
                    Cookies.set('cart-items', saveData)
                }
            }catch(err) {
                console.log({err});
            }
        }
        addCart()
    }, []) //to get the cart

    // cartItemDeleteHandler
    const cartItemDeleteHandler = (e, data) => {
        e.preventDefault();
        const deleteProductData = data //store the data here
        dispatch(deleteProductAction(deleteProductData))
        const saveData = store.getState().addToCartReducer
        console.log({saveData});
        Cookies.set('cart-items', saveData)
    }  
    
    
    return (
        <div>
           {
               //if that is the card has items or not if have then show the items
               isEmpty && product.length == 0 
               ?
               <h1>Empty cart</h1>
               :
               <div className="row">
                   <div className= {`col-12 col-md-9`}>
                       <h2>Shopping Cart</h2>
                       <p className= {`text-end me-4`}>Price</p>
                        <div className  = {`row`}>
                            {
                                product.map(data => {
                                    const {qty, product} = data //get the product and quantity of the product
                                    const {_id, productDetails} = product //get the data from product image
                                    const {productImage, productName, price} = productDetails
                                    return(
                                        //card Wrapper
                                        <>
                                            <hr />
                                                <div className="col-5 p-2">
                                                    <div className = {`${CartStyle.cartRightSideWrapper}`}>
                                                        {/* image */}
                                                        <div>
                                                            <img src={`${productImage}`} className = {`${CartStyle.cartImage}`} alt="productImage" />
                                                        </div>

                                                        {/* porduct Details */}
                                                        <div>
                                                            <p>{productName}</p>
                                                            <p>Qty: 
                                                                <select className = {``}  aria-label="Default select example" selected = {qty} value = {qty} onChange = {(e) =>{
                                                                    dispatch(addToCartAction(product, +e.target.value))
                                                                    const saveData = store.getState().addToCartReducer
                                                                    Cookies.set('cart-items', saveData)
                                                                }} > 
                                                                        <option value="1"  >1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                            </p>
                                                            <button className = {`btn btn-success`} onClick = {(e) => cartItemDeleteHandler(e, data)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className = {`col-7 text-end p-2`}>
                                                    <h1>${price.currentPrice}</h1>
                                                </div>
                                            <hr />
                                        </>
                                    )
                                })
                            }
                        </div>
                   </div>
                   <div className= {`col-12 col-md-3`} >
                        <div className = {`row  ${CartStyle.checkOutWrap}`}>
                            <div className = {`col-12`}>
                                <strong className = {``}>Subtotal( {(product.length > 1 ? `${product.length} items` : `${product.length} item` )}) : </strong>
                                <strong className = {``} >$ {total}</strong>
                            </div>
                            <div className = {`col-12 mt-3`} >
                                <button className = {`btn btn-success w-100 ${CartStyle.checkOutButton}`} >Proceed to Checkout</button>
                            </div>
                        </div>
                        {/* <button onClick={(e) => subtotalHandler(e)}>Click ME</button> */}
                   </div>
               </div>
           }
        </div>
    )
}

export default Cart

