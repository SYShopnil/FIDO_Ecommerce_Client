import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import SingleProductStyle from './SingleProduct.module.css'

const SingleProduct = (props) => {
    const productReducer = useSelector(state => state.ProductReducer) //get the store product reducer
    const {data:reducerData} = productReducer
    const [singleProduct, setSingleProduct] = useState("") //get the single product
    const [checked, setChecked] = useState(false) //to check that is there have any product or not
    const [qty, setQty] = useState(0) //set the quantity
    const paramsData = useParams() //get the param data
    const {id} = paramsData //get the id of product
    const history = useHistory()
    console.log(reducerData, `I am rendered`);
    useEffect(() => {
        if(checked) {
            const findProduct = reducerData.find(ele => ele._id == id) //get the data 
            setSingleProduct(findProduct)
        }else {
            setChecked(true)
        }
    }, [checked, reducerData]) //to get the product

    // backHandler
    const  backHandler = () => {
        history.push('/')
    }
    if(!!singleProduct  && !!checked) {
        var {_id,
            productDetails,
            companyDetails,} = singleProduct
        // console.log({singleProduct});
        var {
            price,
            stockInfo,
            othersDetails,
            productImage,
            productName,
            description,
            productId
        }  = productDetails
        var {numberOfStock,isStock} = stockInfo
        var {
            contact,
            brand
        } =  companyDetails
    }
    // addToCartHandler
    const addToCartHandler = (e) => {
        e.preventDefault();
        history.push(`/cart/${_id}?qty=${qty}`)
    }
    // console.log({qty, numberOfStock })
    return (
        <div className="row">
            {
                !!checked && !!singleProduct
                ?
                <>
                    {
                        !!singleProduct
                        ?
                        <>
                            {/* back button */}
                            <div className="col-12 ">
                                <Link onClick={(e) => backHandler(e)}>
                                    back to list
                                </Link>
                            </div>

                            {/* image part */}
                            <div className = {`col-12 col-md-6`}>
                                <img src={`${productImage}`} alt="ProductImage" className = {`${SingleProductStyle.productImage}`}/>
                            </div>

                            {/* description part */}
                            <div className = {`col-12 col-md-3 ${SingleProductStyle.productDetailsWrap} `} >
                                <div>
                                    <div>
                                        <h4>{productName}</h4>
                                        <p>Price: <strong>${price.currentPrice}</strong></p>
                                        <p><strong>Description:</strong> {description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* cartPart */}
                            <div className = {`col-12 col-md-3`}>
                                <div className = {`${SingleProductStyle.cardWrapper} p-3 pb-4`}>
                                    <p>Price: {price.currentPrice}</p>
                                    {
                                        stockInfo.isStock 
                                        ?
                                        <p>Status: In Stock</p>
                                        :
                                        <p>Status: Out of Stock</p>
                                    }
                                    <p>Qty: <select className = {`${SingleProductStyle.qtyWrap} `} aria-label="Default select example" onChange = {(e) => setQty(e.target.value)}>
                                                <option value="1" selected >1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                    </p>
                                    {
                                        (stockInfo.numberOfStock < qty || !isStock)
                                        &&
                                        <p className="text-danger">Out of stock</p>
                                    }
                                   <div className={`d-flex justify-content-center align-items-center`}>
                                        <button disabled = {stockInfo.numberOfStock < qty || !isStock} className= {` btn d-block ${SingleProductStyle.addToCartButton}`} onClick = {(e) => addToCartHandler(e)}>Add to Cart</button>
                                   </div>

                                </div>
                            </div>
                            
                        </>
                        :
                        <h1>Product Not found</h1>
                    }
                </>
                : 
                <h1>Loading.....</h1> 
            }
        </div>
    )
}

export default SingleProduct
